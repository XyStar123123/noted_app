import { userService } from '../services/user.service.js';
import 'dotenv/config'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userController = {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            // Check if user exists
            const existing = await userService.findUserByEmail(email);
            if (existing) return res.status(400).json({ message: "User already exists" });

            const user = await userService.createUser({ username, email, password });
            res.status(201).json({ message: "User created", user: { id: user._id, email: user.email } });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.findUserByEmail(email);

            if (!user) return res.status(404).json({ message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1d' }
            );

            // Returning user data (In a real app, you'd send a JWT token here)
            res.json({
                message: "Login successful",
                token, // Send this to the frontend
                user: { id: user._id, username: user.username }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // ... existing register and login methods ...

    async updateProfile(req, res) {
        try {
            const { username, email } = req.body;
            
            // Pass the ID from the token and the new data to the service
            const updatedUser = await userService.updateUser(req.userId, { username, email });

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({
                message: "Profile updated",
                user: { 
                    id: updatedUser._id, 
                    username: updatedUser.username, 
                    email: updatedUser.email 
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};