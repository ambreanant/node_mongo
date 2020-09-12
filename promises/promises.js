const doworkpromise = new Promise((resolve, rejects)=>{
    setTimeout(()=>{
        // resolve([7,4,1])
        rejects("This went wrong")
    },2000)
})

doworkpromise.then((result)=>{
    console.log("success",result)
}).catch((error)=>{
    console.log("error",error)
})