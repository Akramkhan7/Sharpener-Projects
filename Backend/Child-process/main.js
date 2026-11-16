const {fork} = require('child_process');

console.log('Parent process started');

const child = fork('./file1.js');


child.send({num : 40});


child.on('message', (data)=>{
    console.log('Message from child process:', data);
})


console.log('Parent process ended');