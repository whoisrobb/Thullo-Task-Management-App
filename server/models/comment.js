import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cardID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment