const mongoose = require('mongoose')
const { request } = require('express')
const validator  = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const Userme = mongoose.model('Userme',{
    name:{
        type: String,
        required:true,
        trim:true
    },
    age:{
        type: Number,
        required:true,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be apositive number')
            }
        }
    },
    emailid:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Email is not valid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase.includes('password'))
            throw new Error('Password does not contain "Password" word')
        }
    }
})
  
const me = new Userme({
    name:'niraj',
    age:20,
    emailid:'anant@gmail.com',
    password:'password'
})

me.save().then(()=>{
console.log(me)
}).catch((error)=>{
console.log("Error",error)
})