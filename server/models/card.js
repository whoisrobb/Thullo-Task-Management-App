import mongoose from "mongoose"


// Create a schema for checklist items
const checklistSchema = new mongoose.Schema({
    text: String,
    checked: Boolean,
})
  
// Create a schema for checklists
// const checklistSchema = new mongoose.Schema({
//     title: String,
//     items: [checklistItemSchema],
// })


// Create a schema for labels
const labelSchema = new mongoose.Schema({
    name: String,
    color: String,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})


const cardSchema = new mongoose.Schema({
    title: String,
    description: String,
    position: Number,
    checklists: [checklistSchema],
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    },
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })

const Card = mongoose.model('Card', cardSchema)
const Label = mongoose.model('Label', labelSchema)

export {
    Card,
    Label
}