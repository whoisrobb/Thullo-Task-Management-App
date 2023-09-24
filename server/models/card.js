import mongoose from "mongoose"


// Create a schema for checklist items
const checklistItemSchema = new mongoose.Schema({
    text: String,
    is_completed: Boolean,
})
  
// Create a schema for checklists
const checklistSchema = new mongoose.Schema({
    title: String,
    items: [checklistItemSchema],
})


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
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    list_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    },
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label'
    }],
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

const Card = mongoose.model('Card', cardSchema)
const Label = mongoose.model('Label', labelSchema)

export {
    Card,
    Label
}