import { Task } from '../models/task.model.js';

export const taskService = {
    // Create a new task linked to a user
    async createTask(userId, taskData) {
        return await Task.create({
            ...taskData,
            user: userId
        });
    },

    // Get all tasks for a specific user
    async getAllTasks(userId) {
        return await Task.find({ user: userId }).sort({ createdAt: -1 });
    },

    // Update a task (ensuring it belongs to the user)
    async updateTask(taskId, userId, updateData) {
        return await Task.findOneAndUpdate(
            { _id: taskId, user: userId },
            updateData,
            { new: true, runValidators: true }
        );
    },

    async getTaskById(taskId, userId) {
        return await Task.findOne({ _id: taskId, user: userId });
    },

    // Delete a task (ensuring it belongs to the user)
    async deleteTask(taskId, userId) {
        return await Task.findOneAndDelete({ _id: taskId, user: userId });
    }
};