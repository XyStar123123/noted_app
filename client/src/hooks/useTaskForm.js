import { useEffect, useState } from "react";
import axios from "axios";
import { useFlash } from "../context/FlashContext.jsx";
import { useNavigate } from "react-router-dom";

export const useTaskForm = (initialData = null, isEdit = false) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        dueDate: initialData?.dueDate ? initialData.dueDate.split('T')[0] : "",
        category: initialData?.category || "Personal",
        priority: initialData?.priority || "low"
    });

    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        // Returns YYYY-MM-DDTHH:mm
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    const { showMessage } = useFlash()

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                dueDate: initialData.dueDate ? formatDateForInput(initialData.dueDate) : "",
                category: initialData.category || "Personal",
                priority: initialData.priority || "low"
            });
        }
    }, [initialData]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const setPriority = (val) => {
        setFormData((prev) => ({ ...prev, priority: val }));
    };

    const submitTask = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("noted_token");

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/task/${initialData._id}`, formData, config);
                showMessage("Successfully updated task!");
            } else {
                await axios.post('http://localhost:5000/api/task', formData, config);
                showMessage("Successfully created task!");
            }
            navigate('/todo')
        } catch (err) {
            showMessage(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return { formData, handleChange, setPriority, submitTask, loading, error };
};