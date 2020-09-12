require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');

// User.findByIdAndUpdate('5f2d12d24dd4610cec97b097', {age:10}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:20})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

// const updateAndAgeCount = async(id , age) => {
//     const user = await User.findByIdAndUpdate(id, { age})
//     const count  = await User.countDocuments({ age })
//     return count
// }

// updateAndAgeCount('5f2d12d24dd4610cec97b097',2).then((count)=>{
//     console.log(count)
// }).catch((error)=>{
//     console.log(error)
// })

const deleteTaskAndCount = async(id, name)=>{
    const task = await Task.findByIdAndDelete(id);
    const count =  await Task.countDocuments({name})
    return count
}

deleteTaskAndCount('5f2d12d24dd4610cec97b097','Anant').then((count)=>{
    console.log(count)
}).catch((error)=>{
    console.log(error)
})