import { Archive } from '../models/archive.model.js';

export const archiveService = {
    async getUserHistory(userId) {
        return await Archive.find({ user: userId }).sort({ archivedAt: -1 });
    },

    async deleteArchiveEntry(archiveId, userId) {
        return await Archive.findOneAndDelete({ _id: archiveId, user: userId });
    },

    // Internal helper used by Task Service
    async addToArchive(task, reason) {
        return await Archive.create({
            user: task.user,
            originalTaskId: task._id,
            title: task.title,
            description: task.description,
            category: task.category,
            priority: task.priority,
            dueDate: task.dueDate,
            statusAtArchive: task.status,
            archiveReason: reason
        });
    }
};