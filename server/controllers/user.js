import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


/* REGISTER A USER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({  firstName, lastName, username, email, password: hashedPassword })
        const savedUser = await user.save()

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET
        )

        res.status(201).json({savedUser, token})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* LOGIN USER */
export const loginUser = async (req, res) => {
    try {
        const { value, password } = req.body
        const user = await User.findOne({
            $or: [{ username: value }, { email: value }]
        })

        if (!user) {
            return res.status(404).json({ message: 'Invalid user!'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' })
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET
        )

        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const getUsers = async (req, res) => {
    try {
        res.status(200).json(await User.find())
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}