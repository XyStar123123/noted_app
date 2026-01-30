import { User } from '../models/user.model.js';

export const userService = {
    async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    },

    async findUserByEmail(email) {
        return await User.findOne({ email });
    },
    
    async updateUser(userId, updateData) {
        return await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true } // 'new: true' returns the modified document
        ).select("-password");
    }
};