const express = require('express')
const User = require('../models/user')
const { update } = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


router.get('/users',auth,async(req, res)=>{
    try{
        const user = await User.find({})
        res.send(user)
    }catch(e){
        res.status(500).send()
    }

    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

router.get('/users/me', auth, (req, res)=>{
    res.send(req.user)
})

router.post('/users/logout', auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })

        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async(req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e)
    {
        res.status(500).send()
    }
})

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try{
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.emailid, req.body.password)
        const token = await user.generateAuthToken()
        console.log(token)
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }

})

router.get('/users/:id',async(req, res)=>{
    const _id=req.params.id

    try{
        const user = await User.findById({_id})
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
    // User.findById({_id}).then((users)=>{
    //     if(!users){
    //         res.status(404).send()
    //     }
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

router.patch('/users/:id',async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','emailid']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'invalid Updates!'})
    }
    try{
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        // const user = await User.findOneAndUpdate(req.params.id, req.body, {new : true, runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/users/me', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','emailid']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'invalid Updates!'})
    }
    try{

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/:id',async(req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/users/me', auth,async(req, res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     res.status(404).send()
        // }
        
        await res.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router 