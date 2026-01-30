import { useState, useEffect } from "react";
import axios from "axios";

export const useProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false); // Added for button state
    const token = localStorage.getItem("noted_token");

    const fetchProfile = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data);
        } catch (err) {
            console.error("Error fetching profile", err);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data) => {
        setUpdating(true);
        try {
            const res = await axios.put("http://localhost:5000/api/auth/update", data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data);
            return { success: true };
        } catch (err) {
            console.error("Update failed", err);
            return { success: false, error: err.response?.data?.message };
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => { fetchProfile(); }, []);

    return { user, loading, updating, fetchProfile, updateProfile };
};