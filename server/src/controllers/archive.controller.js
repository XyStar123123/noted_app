import { archiveService } from '../services/archive.service.js';

export const archiveController = {
    list: async (req, res) => {
        try {
            const history = await archiveService.getUserHistory(req.userId);
            res.json(history);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await archiveService.deleteArchiveEntry(req.params.id, req.userId);
            res.json({ message: "History entry removed permenantly" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};