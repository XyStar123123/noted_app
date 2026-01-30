import { User } from '../models/user.model.js'

export const getMe = async (req, res) => {
    try {
        // req.userId comes from your auth middleware
        const user = await User.findById(req.userId).select("-password"); 
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};