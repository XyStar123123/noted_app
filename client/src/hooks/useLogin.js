import { useState } from "react";
import axios from "axios";

export const useLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);

            if (response.status === 200) {
                // In a real app, you'd save a token to localStorage here
                // localStorage.setItem('token', response.data.token);
                localStorage.setItem("noted_token", response.data.token); // Save token
                window.location.reload();
                window.location.href = "/todo";
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password.");
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, handleChange, submitLogin, error, isLoading };
};