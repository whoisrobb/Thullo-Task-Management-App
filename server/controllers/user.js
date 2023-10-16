import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Extract the first letter of each string and convert to uppercase
function getInitials(firstName, lastName) {
    const firstInitial = firstName.charAt(0).toUpperCase()
    const lastInitial = lastName.charAt(0).toUpperCase()
  
    // Combine the initials and return them
    const initials = firstInitial + lastInitial;
    return initials
}

/* REGISTER A USER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({  firstName, lastName, username, email, password: hashedPassword })
        const savedUser = await user.save()
        
        const initials = getInitials(firstName, lastName)

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                firstName : user.firstName,
                lastName: user.lastName,
                email: user.email,
                initials
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

        const initials = getInitials(user.firstName, user.lastName)

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                firstName : user.firstName,
                lastName: user.lastName,
                email: user.email,
                initials
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