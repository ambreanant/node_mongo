// const { MongoClient } = require('mongodb');

const { ObjectID } = require('mongodb');
const { command } = require('yargs');

const MongoClient = require('mongodb').MongoClient;

const connectionUrl = 'mongodb://localhost:27017'

const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true,useUnifiedTopology: true}, (error, client)=>{

    if(error){
        return console.log("Connect Failed")
    }
    console.log("Connection Successfuly")

    const db = client.db(databaseName)

    // db.collection('users').findOne({name:'Anant', age:'27'}, (error , user)=>{
    //     if(error)
    //     {
    //         console.log("Unable to find")
    //     }
    //     console.log(user)
    // })

    // db.collection('users').findOne({_id:new ObjectID('5f2bf6fc16d0d60a9c0be912')},(error, user)=>{
    //     if(error)
    //     {
    //         console.log("Unable to find")
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({name:'Anant'}).toArray((error, user)=>{
    //     if(error)
    //     {
    //         console.log("Unable to find")
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({name:'Anant'}).count((error, count)=>{
    //     console.log(count)
    // })

    // const updatepromise = db.collection('users').updateOne({name:'Anant',age:'20'},{
    //     $set:{
    //         name:'anant',
    //         age:'12'
    //     }
    // })

    // updatepromise.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').updateOne({name:'anant',age:'12'},{
    //     $set:{
    //         name:'Anant',
    //         age:'28'
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').updateMany({name:'Anant'},{
    //     $set:{
    //         name:'Anant A'
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('users').deleteOne({
        name:'Anant A'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })


    db.collection('users').deleteMany({
        name:'Anant A'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })


    // db.collection('users').insertOne({
    //     name:'Anant',
    //     age:'20'
    // },(error, result)=>{
    //     if(error){
    //         console.log("Unable to insert user")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('task').insertMany([
    //     {
    //         name:'Anant',
    //         address:'Parvati'
    //     },
    //     {
    //         name:'ak',
    //         address:'swargate',
    //         age:'20'
    //     }
    // ],(error, result)=>{
    //     if(error)
    //     {
    //         console.log("Unable to insert")
    //     }
    //     console.log(result.ops)
    // })
})
