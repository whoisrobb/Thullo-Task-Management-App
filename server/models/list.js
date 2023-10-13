import mongoose from "mongoose"


const listSchema = new mongoose.Schema({
    title: String,
    position: Number,
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
      },
    ],
  }, { timestamps: true })
  
const List = mongoose.model('List', listSchema)

export default List