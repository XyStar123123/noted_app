import { Plus, CheckCircle2, Circle, Clock, ChevronRight, BarChart3 } from "lucide-react";
import { useTasks } from "../hooks/useTask.js";
import { useProfile } from "../hooks/useAuth.js";
import { Link } from "react-router-dom";

const Home = () => {
    const { tasks, loading } = useTasks();
    const { user } = useProfile();

    // 1. Calculate Real-time Stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Get the 3 most recent tasks
    const recentTasks = [...tasks].reverse().slice(0, 3);

    // SVG Circular Progress math
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (completionRate / 100) * circumference;

    if (loading) {
        return <div className="p-20 text-center text-gray-400">Loading your dashboard...</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50/50">
            <div className="lg:max-w-3/4 m-auto p-8">

                {/* Hero / Progress Summary */}
                <div className="w-full bg-[#181818] rounded-3xl p-8 md:p-10 text-white flex justify-between items-center shadow-xl mb-8">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">
                            {user ? `Hey, ${user.username}! 👋` : "Today's Progress"}
                        </h1>
                        <p className="text-gray-400 text-lg max-w-md">
                            You've completed <span className="text-white font-bold">{completionRate}%</span> of your total tasks. {completionRate === 100 ? "Amazing job!" : "Keep the momentum going!"}
                        </p>
                        <div className="mt-6 flex flex-col md:flex-row gap-3">
                            <Link to="/add-task" className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all justify-center">
                                <Plus className="w-5 h-5" />
                                Add Task
                            </Link>
                            <Link to="/todo" className="bg-[#2A2A2A] text-white border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-[#3A3A3A] transition-all text-center">
                                View Analytics
                            </Link>
                        </div>
                    </div>

                    {/* Dynamic Progress Ring */}
                    <div className="hidden lg:flex items-center justify-center relative w-40 h-40">
                        <svg className="w-full h-full rotate-[-90deg]">
                            <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-800" />
                            <circle
                                cx="80" cy="80" r={radius}
                                stroke="currentColor" strokeWidth="12" fill="transparent"
                                strokeDasharray={circumference}
                                style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                                className="text-white"
                            />
                        </svg>
                        <span className="absolute text-2xl font-black">{completionRate}%</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Task List */}
                    <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#181818]">Recent Tasks</h2>
                            <Link to="/todo" className="text-sm font-semibold text-gray-500 hover:text-black flex items-center gap-1">
                                View all <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentTasks.length > 0 ? (
                                recentTasks.map((task) => (
                                    <div key={task._id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-black/10 transition-all">
                                        <div className="flex items-center gap-4">
                                            {task.status === "completed" ? (
                                                <CheckCircle2 className="text-green-500 w-6 h-6" />
                                            ) : (
                                                <Circle className="text-gray-300 w-6 h-6" />
                                            )}
                                            <div>
                                                <h3 className={`font-bold ${task.status === "completed" ? 'line-through text-gray-400' : 'text-[#181818]'}`}>
                                                    {task.title}
                                                </h3>
                                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{task.category || 'General'}</span>
                                            </div>
                                        </div>
                                        <Link to={`/todo/detail/${task._id}`} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all">
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200 text-gray-400">
                                    No tasks yet. Start by adding one!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-[#181818] mb-4 flex items-center gap-2">
                                <BarChart3 size={18} /> Stats Overview
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-500">Task Completion</span>
                                        <span className="font-bold">{completedTasks}/{totalTasks}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[#181818] h-full transition-all duration-1000"
                                            style={{ width: `${completionRate}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-gray-500 uppercase">Pending</p>
                                        <p className="text-xl font-bold">{totalTasks - completedTasks}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-gray-500 uppercase">Success</p>
                                        <p className="text-xl font-bold">{completedTasks}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#2A2A2A] p-6 rounded-xl text-white shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="text-gray-400" size={20} />
                                <h3 className="font-bold text-lg">Focus Mode</h3>
                            </div>
                            <p className="text-sm text-gray-300 mb-4">You have {totalTasks - completedTasks} tasks remaining for today.</p>
                            <Link to="/todo" className="block w-full text-center py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-all">
                                Open Todo List
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;