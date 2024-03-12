const express = require('express');
const router = express.Router();
const task = require('../models/task');

router.get('/getTasks', async (req, res) => {
    try{
        const tasks =  await task.find();
        res.json(tasks);
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

router.post('/postTask', async (req, res) => {
    const t = new task({
        user: req.body.user,
        priority: req.body.priority,
        task: req.body.task,
        details: req.body.details,
        date: req.body.date
    })
    try{
        const newTask = await t.save();
        res.status(201).json(newTask);
    }catch (err){
        res.status(400).json({message: err.message})
    }
})

router.get('/getTask/:id', getTaskById, (req, res) => {
    res.send(res.t);
})

router.patch('/putTask/:id', getTaskById, async (req, res) => {
    if(req.body.user != null){
        res.t.user = req.body.user
    }
    if(req.body.priority != null){
        res.t.priority = req.body.priority
    }
    if(req.body.task != null){
        res.t.task = req.body.task
    }
    if(req.body.details != null){
        res.t.details = req.body.details
    }
    if(req.body.date != null){
        res.t.date = req.body.date
    }
    try{
        const updatedTask = await res.t.save();
        res.json(updatedTask)
    }catch (err){
        res.status(400).json({message: err.message})
    }
})

router.delete('/deleteTask/:id', getTaskById, async (req, res) => {
    console.log('entrando al delete');
    try{
        console.log('deleteando');
        await task.findByIdAndDelete(req.params.id)
        res.json({message: 'Task deleted'})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

async function getTaskById(req, res, next){
    let t
    try{
        t = await task.findById(req.params.id)
        if(t == null){
            return res.status(404).json({message: 'Task not found'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.t = t
    next()
}

module.exports = router