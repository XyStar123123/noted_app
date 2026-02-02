import e from 'express'
import { userRoute } from "./routes/user.route.js";
import { taskRoute } from "./routes/task.route.js";
import { authRoute } from './routes/auth.route.js'
import { archiveRoute } from './routes/archive.route.js'

const router = e.Router();

router.get('/', (req, res) => {
    return res.json({ message: "API Running" });
})

router.use('/auth', userRoute); // Client hits /auth/register or /auth/login
router.use('/task', taskRoute);
router.use('/archive', archiveRoute);
router.use('/me', authRoute);

export default router;