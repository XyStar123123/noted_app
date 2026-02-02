import { Search, Filter, CheckCircle2, Circle, Clock, Trash2, Edit3, Loader2, Eye, Lock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useTasks } from "../hooks/useTask.js";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";

const Todo = () => {
    const { tasks, loading, deleteTask, toggleStatus } = useTasks();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All Tasks");

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const openDeleteModal = (task) => {
        setTaskToDelete(task);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (taskToDelete) {
            await deleteTask(taskToDelete._id);
            setDeleteModalOpen(false);
            setTaskToDelete(null);
        }
    };

    const isTaskLocked = (task) => {
        return task.status !== 'completed' &&
            new Date() > new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000);
    };

    // Filter logic
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = filter === "All Tasks" || task.category === filter;
        return matchesSearch && matchesCategory;
    });

    // Seperate data into three distinct buckets
    const pendingTasks = filteredTasks.filter(task => task.status !== 'completed' && !isTaskLocked(task));
    const completedTasks = filteredTasks.filter(task => task.status === 'completed');
    const lockedTasks = filteredTasks.filter(task => isTaskLocked(task));

    const TaskCard = ({ task, isLocked }) => (
        <div className={`bg-white p-5 rounded-2xl border flex items-center justify-between group transition-all hover:shadow-md ${isLocked ? "border-red-100 opacity-75 bg-gray-50/50" : "border-gray-100 shadow-sm hover:border-black/20"
            }`}>
            <div className="flex items-center gap-5">
                <button
                    onClick={() => !isLocked && toggleStatus(task)}
                    disabled={isLocked}
                    className="focus:outline-none"
                >
                    {isLocked ? (
                        <Lock className="text-red-400 w-6 h-6" />
                    ) : (
                        task.status === "completed"
                            ? <CheckCircle2 className="text-green-500 w-7 h-7" />
                            : <Circle className="text-gray-300 w-7 h-7 hover:text-[#181818] transition-colors" />
                    )}
                </button>
                <div>
                    <h3 className={`text-lg font-bold ${task.status === "completed" ? 'line-through text-gray-400' : 'text-[#181818]'}`}>
                        {task.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">
                            {task.category || 'General'}
                        </span>
                        {task.dueDate && (
                            <span className={`flex items-center gap-1 text-xs font-medium ${isLocked ? 'text-red-400' : 'text-gray-400'}`}>
                                <Clock size={12} />
                                {new Date(task.dueDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!isLocked && (
                    <>
                        <Link to={`/todo/detail/${task._id}`} className="p-2.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all">
                            <Eye size={18} />
                        </Link>
                        <Link to={`/edit-task/${task._id}`} className="p-2.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all">
                            <Edit3 size={18} />
                        </Link>
                    </>
                )}
                <button onClick={() => openDeleteModal(task)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50/50">
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                taskTitle={taskToDelete?.title || ""}
            />
            <div className="md:max-w-3/4 m-auto p-8">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-[#181818]">All Tasks</h1>
                        <p className="text-gray-500">Manage, filter, and track your daily productivity.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-black outline-none bg-white transition-all w-64"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Categories Sidebar */}
                    <div className="lg:col-span-1 space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Categories</p>
                        {["All Tasks", "Work", "Personal", "Design", "Health"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${filter === cat
                                    ? "bg-[#181818] text-white shadow-md"
                                    : "text-gray-500 hover:bg-white hover:text-[#181818]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Task List Sections */}
                    <div className="lg:col-span-3 space-y-12">
                        {loading ? (
                            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
                        ) : (
                            <>
                                {/* PENDING SECTION */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <Circle size={14} /> Pending Tasks ({pendingTasks.length})
                                        </h2>
                                        <Link to="/add-task" className="text-xs font-bold text-blue-600 hover:underline">+ New Task</Link>
                                    </div>
                                    {pendingTasks.length > 0 ? (
                                        pendingTasks.map(task => <TaskCard key={task._id} task={task} isLocked={false} />)
                                    ) : (
                                        <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">No pending tasks.</div>
                                    )}
                                </div>

                                {/* COMPLETED SECTION */}
                                {completedTasks.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="px-2">
                                            <h2 className="text-sm font-black text-green-500/70 uppercase tracking-widest flex items-center gap-2">
                                                <CheckCircle size={14} /> Completed ({completedTasks.length})
                                            </h2>
                                        </div>
                                        <div className="space-y-4">
                                            {completedTasks.map(task => <TaskCard key={task._id} task={task} isLocked={false} />)}
                                        </div>
                                    </div>
                                )}

                                {/* LOCKED SECTION */}
                                {lockedTasks.length > 0 && (
                                    <div className="space-y-4 pt-6 border-t border-gray-200">
                                        <div className="px-2">
                                            <h2 className="text-sm font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
                                                <Lock size={14} /> Expired ({lockedTasks.length})
                                            </h2>
                                            <p className="text-[10px] text-gray-400 uppercase mt-1">Grace period exceeded. These must be deleted.</p>
                                        </div>
                                        <div className="space-y-4">
                                            {lockedTasks.map(task => <TaskCard key={task._id} task={task} isLocked={true} />)}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <Link
                            to="/add-task"
                            className="block w-full py-6 border-2 border-dashed border-gray-200 rounded-2xl text-center text-gray-400 hover:border-[#181818] hover:text-[#181818] transition-all font-semibold"
                        >
                            + Add a new task
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Todo;