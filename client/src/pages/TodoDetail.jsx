import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Flag, Clock, Edit3, Trash2 } from "lucide-react";
import axios from "axios";

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem("noted_token");
                const res = await axios.get(`http://localhost:5000/api/task/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTask(res.data);
            } catch (err) {
                console.error("Task not found");
                navigate("/todo");
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id, navigate]);

    if (loading) return <div className="p-20 text-center">Loading details...</div>;
    if (!task) return null;

    return (
        <main className="min-h-screen bg-gray-50/50 p-8">
            <div className="max-w-2xl m-auto">
                <Link to="/todo" className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-all">
                    <ArrowLeft size={20} /> Back to List
                </Link>

                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                            task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                            {task.priority} Priority
                        </span>
                        <div className="flex gap-2">
                            <Link to={`/edit-task/${task._id}`} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                                <Edit3 size={18} />
                            </Link>
                        </div>
                    </div>

                    <h1 className="text-4xl font-black text-[#181818] mb-4">{task.title}</h1>
                    <div className="flex items-center gap-2 mb-6">
                        <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-sm font-medium text-gray-500 capitalize">{task.status}</span>
                    </div>
                    <p className="text-gray-500 text-lg leading-relaxed mb-8">{task.description || "No description provided."}</p>

                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><Calendar size={20}/></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Due Date</p>
                                <p className="font-bold text-[#181818]">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><Tag size={20}/></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Category</p>
                                <p className="font-bold text-[#181818]">{task.category}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TodoDetail;