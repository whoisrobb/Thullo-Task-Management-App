import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import multer from 'multer'
import authRoutes from './routes/users.js'
import actionRoutes from './routes/action.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'


/* CONFIGURATIONS */
const app = express()

dotenv.config()

// app.use(cors())
app.use(
    cors({
      origin: 'https://thullo-task-management-app-r4s1.vercel.app', // Replace with your client's URL
    })
)
  
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(express.json())


/* ROUTES */
app.use('/auth', authRoutes)
app.use('/board', actionRoutes)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6000
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })
}).catch((err) => console.log(err))