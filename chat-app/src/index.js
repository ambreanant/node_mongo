const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const { isObject } = require('util')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicPathDirectory = path.join(__dirname,'../public')
app.use(express.static(publicPathDirectory))

let count = 0

io.on('connection',(socket)=>{
    console.log('New WebSocket Connection !')

    // socket.emit('message','Welcome !')

    socket.emit('countUpdated',count)

    // socket.on('increment',()=>{
    //     count++
    //     socket.emit('countUpdated',count)
    // })

    socket.on('sendMessage',(message)=>{
        socket.emit('message',message)
    })

    socket.on('sendLocation',(coords)=>{
        socket.emit('message',`Location: ${coords.latitude}, ${coords.longitude}`)
        socket.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
})

const port = process.env.PORT || 3000
server.listen(port,()=>{
    console.log(`App running on port ${port}` )
})