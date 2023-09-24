import validator from "validator"


export const validateEmail = (req, res, next) => {
    const email = req.body.email

    if (!validator.isEmail(email)) {
        return res.status(500).json({ message: 'Invalid E-Mail address!'})
    }

    next()
}