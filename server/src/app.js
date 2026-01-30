import e from 'express'
import { userRoute } from "./routes/user.route.js";
import {taskRoute} from "./routes/task.route.js";
import {Task} from "./models/task.model.js"; // Import user route
import { authRoute } from './routes/auth.route.js'

const router = e.Router();

router.get('/', (req, res) => {
    return res.json({ message: "API Running" });
})

router.use('/auth', userRoute); // Client hits /auth/register or /auth/login
router.use('/task', taskRoute);
router.use('/me', authRoute);

export default router;