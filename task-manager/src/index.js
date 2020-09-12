const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task');
// const { update } = require('./models/user');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=>{
    console.log("Server is running on port: "+port)
})


const Task = require('./models/task')
const User = require('./models/user')

const main = async () =>{
    const user = await User.findById('5f2efe42bf757b3664d124b6')
    await user.populate('task').execPopulate()
    console.log(user.tasks)
}

main()

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const myFunction  = async() => {

    const token = jwt.sign({_id:'abc123'}, 'thisismynewcource', {expiresIn: '2 week'})

    console.log(token)

    const data = jwt.verify(token, 'thisismynewcource')
    console.log(data)
    // const password = 'Red12345'
    // const hashedPassword = await bcrypt.hash(password, 8)

    // console.log(password)
    // console.log(hashedPassword)

    // const isMatch = await bcrypt.compare('Red12345', hashedPassword)
    // console.log(isMatch)

}

myFunction()