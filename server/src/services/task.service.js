import { Task } from '../models/task.model.js';
import { archiveService } from './archive.service.js';

export const taskService = {
    // UPDATED: Create a task AND log it to history
    async createTask(userId, taskData) {
        const newTask = await Task.create({
            ...taskData,
            user: userId
        });

        // Log the creation to history
        // Note: You might want to add 'created' to your archiveReason enum in archive.model.js
        await archiveService.addToArchive(newTask, 'created');

        return newTask;
    },

    async getAllTasks(userId) {
        return await Task.find({ user: userId }).sort({ createdAt: -1 });
    },

    async updateTask(taskId, userId, updateData) {
        const task = await Task.findOne({ _id: taskId, user: userId });
        if (!task) return null;

        const now = new Date();
        const gracePeriodEnd = new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000);

        if (now > gracePeriodEnd && task.status !== 'completed') {
            throw new Error("This task is locked. The 1-hour grace period has passed.");
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, user: userId },
            updateData,
            { new: true, runValidators: true }
        );

        // OPTIONAL: Log the update to history if it was marked as completed
        if (updateData.status === 'completed') {
            await archiveService.addToArchive(updatedTask, 'completed');
        }

        return updatedTask;
    },

    async getTaskById(taskId, userId) {
        return await Task.findOne({ _id: taskId, user: userId });
    },

    async deleteTask(taskId, userId) {
        const task = await Task.findOne({ _id: taskId, user: userId });
        if (!task) return null;

        let reason = 'deleted';
        const isExpired = task.status !== 'completed' &&
            new Date() > new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000);

        if (task.status === 'completed') {
            reason = 'completed';
        } else if (isExpired) {
            reason = 'expired';
        }

        await archiveService.addToArchive(task, reason);
        return await Task.deleteOne({ _id: taskId });
    }
};