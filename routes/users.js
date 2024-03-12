const express = require('express');
const router = express.Router();
const task = require('../models/task');
const user = require('../models/user');

router.get('/getUsers', async (req, res) => {
    try{
        const users =  await user.find();
        res.json(users);
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

router.post('/postUser', async (req, res) => {
    const u = new user({
        user: req.body.user,
        pass: req.body.pass
    })
    try{
        const newUser = await u.save();
        res.status(201).json(newUser);
    }catch (err){
        res.status(400).json({message: err.message})
    }
})

router.get('/getUser/:id', getUserById, (req, res) => {
    res.send(res.u);
})

async function getUserById(req, res, next){
    let u
    try{
        u = await user.findById(req.params.id)
        if(u == null){
            return res.status(404).json({message: 'User not found'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.u = u
    next()
}

module.exports = router