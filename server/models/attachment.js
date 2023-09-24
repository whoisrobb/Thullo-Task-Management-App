import mongoose from "mongoose"


const attachmentSchema = new mongoose.Schema({
    card_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    },
    file_url: String,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Attachment = mongoose.model('Attachment', attachmentSchema)

module.exports = Attachment