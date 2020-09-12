const doworkcallback = ((callback)=>{
    setTimeout(()=>{
        // callback('This is my errr',undefined)
        callback(undefined,[1,4,7])
    },2000)

})


doworkcallback((error, result)=>{
    if(error)
    {
        console.log(error)
    }
    console.log(result)
})