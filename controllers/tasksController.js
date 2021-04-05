const Task = require('../models/Tasks');
const Project = require('../models/Projects');
const { validationResult } = require('express-validator')

exports.createTask = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } )
    }

    
    try {
        const { projectId } = req.body
        
        const project = await Project.findById(projectId)
        if(!project) {
            return res.status(404).json({msg: 'Project not found'})
        }

        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Authorization error'});
        }

        const task = new Task(req.body)

        await task.save()

        res.json({ task })

    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.query
        
        const project = await Project.findById(projectId)
        if(!project) {
            return res.status(404).json({msg: 'Project not found'})
        }

        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Authorization error'});
        }

        const tasks = await Task.find({ projectId }).sort({date: -1});
        res.json({ tasks })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { projectId, name, state } = req.body

        let task = await Task.findById(req.params.id)
        const project = await Project.findById(projectId)

        if (!task) {
            return res.status(404).json({msg: 'Task not found'})
        }
        

        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Authorization error'});
        }

        let newTask = {}

            newTask.name = name
            newTask.state = state

        task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true})

        res.json({task})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
};

exports.deleteTask = async ( req, res) => {
    try {
        const { projectId } = req.query

        let task = await Task.findById(req.params.id)
        const project = await Project.findById(projectId)

        if (!task) {
            return res.status(404).json({msg: 'Task not found'})
        }
        
        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Authorization error'});
        }

        await Task.findByIdAndRemove({_id: req.params.id});

        res.json({msg: 'Task deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}