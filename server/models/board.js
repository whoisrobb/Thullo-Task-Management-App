import mongoose from "mongoose"


const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true })

const Board = mongoose.model('Board', boardSchema)

export default Board