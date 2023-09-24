
import express, { Router } from "express"
import { validateEmail } from "../middleware/validator.js"
import { getUsers, loginUser, register } from "../controllers/user.js"

const router = express.Router()


/* REGISTER NEW USER */
router.post('/register', validateEmail, register)


/* LOGIN USER */
router.post('/login', loginUser)


router.get('/users', getUsers)


export default router