const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    }
})

module.exports = mongoose.model('Tasks', TaskSchema)