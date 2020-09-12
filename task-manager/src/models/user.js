const mongoose = require('mongoose')
const validator  = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
        unique:true,
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
            if(value.includes('password'))
            throw new Error('Password does not contain "Password" word')
        }
    },
    tokens:[{
    token:{
        type:String,
        required:true
    }
    }]
})

userSchema.virtual('task',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function(){
    const user = this

    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function(){

    const user = this

    const token = jwt.sign({_id:user._id.toString()}, 'thisismynewcource')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (emailid, password) => {
    const user = await Userme.findOne({emailid})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch)
    {
        throw new Error('Unable to Login')
    }

    return user
}

userSchema.pre('save', async function(next){

    const user =this

    // console.log("just before saving ")
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const Userme = mongoose.model('Userme',userSchema)

module.exports = Userme