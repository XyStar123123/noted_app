import e from 'express'
import router from './app.js'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'

const app = e()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(e.json())
app.use('/api', router) // Good practice to prefix with /api

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch(err => console.error("DB Connection Error:", err));