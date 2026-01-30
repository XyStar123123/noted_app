import e from 'express';
import { protect } from "../middlewares/auth.middleware.js";
import { taskController } from "../controllers/task.controller.js";

export const taskRoute = e.Router();

// Apply 'protect' to all task routes
taskRoute.use(protect);

taskRoute.get('/', taskController.list);
taskRoute.get('/:id', taskController.getById);
taskRoute.post('/', taskController.create);
taskRoute.patch('/:id', taskController.update);
taskRoute.put('/:id', taskController.update);
taskRoute.delete('/:id', taskController.delete)