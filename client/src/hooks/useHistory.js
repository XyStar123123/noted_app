import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useFlash } from "../context/FlashContext.jsx";

export const useHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showMessage } = useFlash();
    const token = localStorage.getItem("noted_token");

    const fetchHistory = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/archive', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(res.data);
        } catch (err) {
            console.error("Error fetching history", err);
            showMessage("Could not load history", "error");
        } finally {
            setLoading(false);
        }
    }, [token, showMessage]);

    const deleteHistoryItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/archive/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(prev => prev.filter(item => item._id !== id));
            showMessage("Record removed permanently");
        } catch (err) {
            showMessage("Failed to delete record", "error");
        }
    };

    useEffect(() => {
        if (token) fetchHistory();
    }, [fetchHistory, token]);

    return { history, loading, deleteHistoryItem, refreshHistory: fetchHistory };
};