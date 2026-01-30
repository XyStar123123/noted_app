import { User, Mail, Lock, ShieldCheck, Camera, Save, ListTodo, CheckCircle } from "lucide-react";
import { useProfile } from "../hooks/useAuth.js";
import { useTasks } from "../hooks/useTask.js";
import { useFlash } from "../context/FlashContext.jsx";
import { useState } from "react";
import { useEffect } from "react";

const Profile = () => {
    const { user, loading: authLoading, updateProfile, updating } = useProfile();
    const { tasks, loading: tasksLoading } = useTasks();
    const { showMessage } = useFlash();
    const [formData, setFormData] = useState({ username: "", email: "" });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                username: user.username || prev.username || "",
                email: user.email || prev.email || ""
            }));
        }
    }, [user]);

    // 2. DEFINE YOUR HANDLERS
    const handleSave = async (e) => {
        e.preventDefault();
        const result = await updateProfile(formData);
        if (result?.success) {
            showMessage("Profile updated!", "success");
        } else {
            showMessage(result?.error || "Update failed", "error");
        }
    };

    // 3. NOW HANDLE THE LOADING STATE
    if (authLoading || tasksLoading) {
        return <div className="p-20 text-center text-gray-400">Loading profile...</div>;
    }

    // Calculate Stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <main className="min-h-screen bg-gray-50/50">
            <div className="max-w-3/4 m-auto p-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-[#181818]">Account Settings</h1>
                    <p className="text-gray-500">Manage your personal information and track your productivity.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar: Avatar & Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4">
                                <div className="w-full h-full bg-[#181818] rounded-full flex items-center justify-center text-white text-4xl font-bold uppercase">
                                    {user?.username?.substring(0, 2) || "??"}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-all">
                                    <Camera size={18} />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-[#181818]">{user?.username}</h2>
                            <p className="text-gray-400 text-sm">Joined {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                        </div>

                        {/* Productivity Stats Card */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest">Productivity</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <ListTodo className="text-blue-500 mb-2" size={20}/>
                                    <p className="text-2xl font-black">{totalTasks}</p>
                                    <p className="text-xs text-gray-500">Total Tasks</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <CheckCircle className="text-green-500 mb-2" size={20}/>
                                    <p className="text-2xl font-black">{completedTasks}</p>
                                    <p className="text-xs text-gray-500">Completed</p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span>Completion Rate</span>
                                    <span>{completionRate}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-green-500 h-full transition-all duration-1000"
                                        style={{ width: `${completionRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Account Form */}
                    <div className="lg:col-span-2">
                        <form className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" onSubmit={handleSave}>
                            <div className="p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#2A2A2A] mb-2 uppercase tracking-wide flex items-center gap-2">
                                        <User size={14} /> Username
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.username || ''} 
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#2A2A2A] mb-2 uppercase tracking-wide flex items-center gap-2">
                                        <Mail size={14} /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email || ''} 
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 flex justify-end gap-4 border-t border-gray-100">
                                <button type="button" className="px-6 py-2 text-gray-500 font-bold hover:text-black transition-colors">
                                    Discard
                                </button>
                                <button className="bg-[#181818] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#2A2A2A] transition-all shadow-lg">
                                    <Save size={18} />
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;