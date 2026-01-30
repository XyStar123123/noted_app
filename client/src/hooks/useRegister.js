import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitRegister = async (e) => {
        e.preventDefault(); // This stops the browser from doing the default GET redirect
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            if (response.status === 201) {
                window.location.href = "/login";
            }
        } catch (err) {
            // Axios stores the backend message in err.response.data
            setError(err.response?.data?.message || "Registration failed. Try again.");
        }
    };

    return { formData, handleChange, submitRegister, error };
};