const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId, ref:'registrations'
    }
})

const registerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Tasks = mongoose.model('tasks', taskSchema)
const Registrations = mongoose.model('registrations', registerSchema)
const mySchemas = {'Tasks': Tasks, 'Registrations': Registrations}

module.exports = mySchemas