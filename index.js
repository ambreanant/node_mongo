// // const note = require('./note.js');
// // const validator = require('validator');
// // // const name = 'anant';

// // console.log(note(2,4));
// // // console.log(name);

// // console.log(validator.isEmail('anantgmail.com'))
// // console.log(validator.isURL('anant@gmail.com'))


// // const chalk = require('chalk');
 
// // console.log(chalk.bold.green('Success'));

// // console.log(process.argv[2]);

// // const argumnt =process.argv;

// // if(argumnt === 'add')
// // {
// //     console.log('Adding');
// // }else if(argumnt === 'remove')
// // {
// //     console.log("Removing");
// // }

// // const {argv} = require('yargs');
// const yargs = require('yargs');

// yargs.version('1.1.0')
// // console.log(process.argv);
// // console.log(yargs.argv);

// // if(argv.add)
// // {
// //     console.log(argv.add);
// // }

// yargs.command({
//     command:'add',
//     describe:'Adding note',
//     builder:{
//         describe:'note title',
//         demandOption:true,
//         type:String
//     },
//     handler:function(){
//         console.log("note added successfuly")
//     }
// })

// console.log(yargs.argv);

const fs = require('fs')

const details= {
    name:'anant',
    address:'parvati'
}

const detailsjson = JSON.stringify(details);
console.log(detailsjson);

const detailsback = JSON.parse(detailsjson);
console.log(detailsback)