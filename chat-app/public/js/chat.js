const socket = io()

socket.on('countUpdated',(count)=>{
    console.log("count : ",count)
})

socket.on('message',(message)=>{
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault()

    // const message = document.querySelector('input').value
    const message = e.target.elements.message.value

    socket.emit('sendMessage',message)
})

document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation)
    {
        return console.log("Your browser not support geolocation")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(position)
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})

// document.querySelector('#increment').addEventListener('click',()=>{
//     socket.emit('increment')
// })
