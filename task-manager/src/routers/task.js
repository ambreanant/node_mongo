const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.get('/task',async(req, res)=>{

    try{
        const task = await Task.find()
        res.send(task)
    }catch(e){
        res.status(500).send()
    }

    // Task.find({}).then((task)=>{
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

router.get('/task/:id',async(req, res)=>{
    const _id = req.params.id

    try{
        const task= await Task.findById(_id)
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
    // Task.findById({_id}).then((task)=>{
    //     if(!task)
    //     {
    //         res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

router.patch('/task/:id',async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'invalid Updates!'})
    }
    try{

        const task = await Task.findById(req.params.id)

        updates.forEach((update)=> task[update] = req.body[update])
        
        await task.save()
        // const task = await Task.findOneAndUpdate(req.params.id, req.body, {new : true, runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

// app.post('/users',(req, res)=>{
//     const user = new User(req.body);
//     user.save().then(()=>{
//         res.send(user)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
// })


// router.post('/task',async(req, res)=>{
    
//     const task = new Task(req.body)
//     try{
//         await task.save()
//         res.status(201).send(task)
//     }catch(e){
//         res.status(400).send()
//     }
   
//     // const task = new Task(req.body);
//     // task.save().then(()=>{
//     //     res.send(user)
//     // }).catch((error)=>{
//     //     res.status(400).send(error)
//     // })
// })

router.post('/task', auth, async(req, res)=>{
    
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router

