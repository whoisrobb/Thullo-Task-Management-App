import mongoose from "mongoose"


const labelSchema = new mongoose.Schema({
    name: String,
    color: String,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // created_at: {
    //     type: Date,
    //     default: Date.now
    // },
    // updated_at: {
    //     type: Date,
    //     default: Date.now
    // }
}, { timestamps: true })

const Label = mongoose.model('Label', labelSchema)

export default Label