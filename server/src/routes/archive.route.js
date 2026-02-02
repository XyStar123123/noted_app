import e from 'express';
import { protect } from "../middlewares/auth.middleware.js";
import { archiveController } from "../controllers/archive.controller.js";

export const archiveRoute = e.Router();

// Apply 'protect' to all history/archive routes
archiveRoute.use(protect);

// GET /api/archive - Fetch all history for the logged-in user
archiveRoute.get('/', archiveController.list);

// DELETE /api/archive/:id - Permenantly delete a history log
archiveRoute.delete('/:id', archiveController.delete);