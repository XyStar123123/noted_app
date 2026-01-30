import { taskService } from '../services/task.service.js';

export const taskController = {
    create: async (req, res) => {
        try {
            // req.userId is provided by the 'protect' middleware
            const task = await taskService.createTask(req.userId, req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    list: async (req, res) => {
        try {
            const tasks = await taskService.getAllTasks(req.userId);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const task = await taskService.getTaskById(req.params.id, req.userId);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Add this to your taskController
    update: async (req, res) => {
        try {
            const updatedTask = await taskService.updateTask(req.params.id, req.userId, req.body);
            if (!updatedTask) return res.status(404).json({ message: "Task not found" });
            res.json(updatedTask);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            // Capture the result of the deletion
            const deletedTask = await taskService.deleteTask(req.params.id, req.userId);

            // If no task was returned/deleted, it's a 404, not a 500 error
            if (!deletedTask) {
                return res.status(404).json({ message: "Task not found or unauthorized" });
            }

            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};