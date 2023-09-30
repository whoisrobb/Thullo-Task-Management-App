import mongoose from "mongoose"


const listSchema = new mongoose.Schema({
    title: String,
    position: Number,
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
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
  
const List = mongoose.model('List', listSchema)

export default List