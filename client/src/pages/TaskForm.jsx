import {useEffect, useState} from "react";
import {ArrowLeft, Calendar, Tag, Flag, CheckCircle2, Save} from "lucide-react";
import axios from "axios";
import {useTaskForm} from "../hooks/useTaskForm.js";
import {useParams} from "react-router-dom";

// I renamed this to TaskForm so it feels consistent for both roles
const TaskForm = ({mode = "add", existingData: initialData = null}) => {
    const { id } = useParams();
    const isEdit = mode === "edit";
    const token = localStorage.getItem("noted_token");
    const [taskData, setTaskData] = useState(initialData);

    useEffect(() => {
        if (isEdit && !taskData && id) {
            const fetchTask = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/task/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setTaskData(res.data);
                } catch (err) {
                    console.error("Could not fetch task for editing", err);
                }
            };
            fetchTask();
        }
    }, [isEdit, id, taskData, token]);

    const { formData, handleChange, setPriority, submitTask, loading } = useTaskForm(taskData, isEdit);

    if (isEdit && !formData.title && !loading) {
        return <div className="p-20 text-center">Loading task details...</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50/50">
            <div className="max-w-3/4 m-auto p-8">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                    <a href="/"
                       className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
                        <ArrowLeft className="w-6 h-6 text-[#2A2A2A]"/>
                    </a>
                    <div>
                        <h1 className="text-3xl font-bold text-[#181818]">
                            {isEdit ? "Edit Task" : "Create New Task"}
                        </h1>
                        <p className="text-gray-500">
                            {isEdit ? "Update your task details and progress." : "Define your goals and track your progress."}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <form className="space-y-6" onSubmit={submitTask} method="post">
                                {/* Task Title */}
                                <div>
                                    <label
                                        className="block text-sm font-bold text-[#2A2A2A] mb-2 uppercase tracking-wide">Task
                                        Title</label>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="e.g., Finalize Project Dashboard"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-lg"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label
                                        className="block text-sm font-bold text-[#2A2A2A] mb-2 uppercase tracking-wide">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="What needs to be done?"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Due Date */}
                                    <div>
                                        <label
                                            className="block text-sm font-bold text-[#2A2A2A] mb-2 uppercase tracking-wide flex items-center gap-2">
                                            <Calendar size={14}/> Due Date
                                        </label>
                                        <input
                                            name="dueDate"
                                            value={formData.dueDate}
                                            onChange={handleChange}
                                            type="date"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label
                                            className="block text-sm font-bold text-[#2A2A2A] mb-2 uppercase tracking-wide flex items-center gap-2">
                                            <Tag size={14}/> Category
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all bg-white"
                                        >
                                            <option>Personal</option>
                                            <option>Work</option>
                                            <option>Design</option>
                                            <option>Urgent</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Dynamic Action Button */}
                                <div className="pt-4 flex items-center gap-4">
                                    <button type="submit"
                                            disabled={loading}
                                            className="bg-[#181818] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#2A2A2A] transition-all shadow-lg">
                                        {isEdit ? <Save size={20}/> : <CheckCircle2 size={20}/>}
                                        {isEdit ? "Update Task" : "Save Task"}
                                    </button>
                                    <a href="/todo"
                                       className="px-8 py-4 font-bold text-gray-500 hover:text-black transition-colors">Cancel</a>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar: Priority */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-[#181818] mb-4 flex items-center gap-2 border-b pb-4"><Flag
                                size={18}/> Task Priority</h3>
                            <div className="space-y-3">
                                {["low", "medium", "high"].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setPriority(p)}
                                        className={`w-full p-4 rounded-xl border-2 text-left capitalize font-bold transition-all flex items-center justify-between ${
                                            formData.priority === p
                                                ? "border-[#181818] bg-[#181818] text-white"
                                                : "border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200"
                                        }`}
                                    >
                                        {p} Priority
                                        {formData.priority === p && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TaskForm;