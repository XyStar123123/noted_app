import e from 'express';
import { userController } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js'

export const userRoute = e.Router();

userRoute.post('/register', userController.register);
userRoute.post('/login', userController.login);
userRoute.put('/update', protect, userController.updateProfile);