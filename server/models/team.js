import mongoose from "mongoose"


const teamSchema = new mongoose.Schema({
    name: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
})
  
const Team = mongoose.model('Team', teamSchema)

export default Team