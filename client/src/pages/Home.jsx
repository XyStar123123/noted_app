import { Plus, CheckCircle2, Circle, Clock, ChevronRight, BarChart3 } from "lucide-react";

const Home = () => {
    // Mock data for the UI
    const recentTasks = [
        { id: 1, title: "Finish Project Proposal", category: "Work", status: "completed" },
        { id: 2, title: "Buy groceries for dinner", category: "Personal", status: "pending" },
        { id: 3, title: "Design System Update", category: "Design", status: "pending" },
    ];

    return (
        <main className="min-h-screen bg-gray-50/50">
            <div className="max-w-3/4 m-auto p-8">
                {/* Hero / Progress Summary */}
                <div className="w-full bg-[#181818] rounded-2xl p-10 text-white flex justify-between items-center shadow-xl mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-3">Today's Progress</h1>
                        <p className="text-gray-400 text-lg max-w-md">
                            You've completed <span className="text-white font-bold">65%</span> of your daily targets. Keep the momentum going!
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all">
                                <Plus className="w-5 h-5" />
                                Add Task
                            </button>
                            <button className="bg-[#2A2A2A] text-white border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-[#3A3A3A] transition-all">
                                View Analytics
                            </button>
                        </div>
                    </div>
                    {/* Visual Progress Ring Placeholder */}
                    <div className="hidden lg:flex items-center justify-center relative w-40 h-40">
                        <svg className="w-full h-full rotate-[-90deg]">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-800" />
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="154" className="text-white" />
                        </svg>
                        <span className="absolute text-2xl font-black">65%</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Task List */}
                    <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#181818]">Recent Tasks</h2>
                            <a href="/todo" className="text-sm font-semibold text-gray-500 hover:text-black flex items-center gap-1">
                                View all <ChevronRight size={16} />
                            </a>
                        </div>

                        <div className="space-y-4">
                            {recentTasks.map((task) => (
                                <div key={task.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-black/10 transition-all">
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
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{task.category}</span>
                                        </div>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all">
                                        <Plus className="w-4 h-4 rotate-45 text-gray-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar: Stats & Tracking */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-[#181818] mb-4 flex items-center gap-2">
                                <BarChart3 size={18} /> Stats Overview
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-500">Weekly Goal</span>
                                        <span className="font-bold">18/25</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-[#181818] h-full w-[72%]"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase">Streak</p>
                                        <p className="text-xl font-bold">5 Days</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase">Focus</p>
                                        <p className="text-xl font-bold">12h</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#2A2A2A] p-6 rounded-xl text-white shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="text-gray-400" size={20} />
                                <h3 className="font-bold text-lg">Upcoming Deadline</h3>
                            </div>
                            <p className="text-sm text-gray-300 mb-4">"Beta Release" is due in 2 hours. High priority.</p>
                            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-all">
                                Set Reminder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;