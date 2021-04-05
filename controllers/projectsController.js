const Project = require('../models/Projects')
const { validationResult } = require('express-validator')

exports.createProject = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } )
    }


    try {
        const project = new Project(req.body)
        project.author = req.user.id
        project.save();
        res.json(project)

    } catch(e) {
        console.log(e)
        res.status(500).send('error')
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ author: req.user.id}).sort({ date: -1 })
        res.json({projects})
    } catch(e) {
        console.log(e)
        res.status(500).send('error')
    }
}

exports.updateProject = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } )
    }

    const { name } = req.body

    const newProject = {}

    if(name) {
        newProject.name = name
    };

    try {

        let project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({msg: 'Project invalid'})
        }

        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Authorization error'});
        }

        project = await Project.findOneAndUpdate({_id: req.params.id}, {$set: newProject}, {new: true})
        res.json({project})
    } catch(e) {
        console.log(e)
        res.status(500).send('Error')
    }
}

exports.deleteProject = async (req, res) => {

    try {
        let project = await Project.findById(req.params.id)
        if (!project) {
            return res.status(404).json({msg: 'Invalid project'})
        }

        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Authorization error'});
        }

        await Project.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Project removed'})
    } catch (e) {

    }
}