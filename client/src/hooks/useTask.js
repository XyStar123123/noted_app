import { useState, useEffect } from "react";
import axios from "axios";
import {useFlash} from "../context/FlashContext.jsx";

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const { showMessage } = useFlash();
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("noted_token");

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/task', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/task/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update UI locally without reloading
            showMessage("Successfully deleted task!");
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            alert("Failed to delete task");
        }
    };

    const toggleStatus = async (task) => {
        const newStatus = task.status === 'completed' ? 'todo' : 'completed';
        try {
            await axios.patch(`http://localhost:5000/api/task/${task._id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            showMessage("Task completed!");
            setTasks(prev => prev.map(t => t._id === task._id ? { ...t, status: newStatus } : t));
        } catch (err) {
            console.error("Failed to update status");
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    return { tasks, loading, deleteTask, toggleStatus, fetchTasks };
};