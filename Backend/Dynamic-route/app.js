const express = require('express');
const app = express();



app.get("/welcome/:username", (req, res) => {
    const username = req.params.username;
    const role = req.query.role;

    res.send({
        message: `Welcome ${username}, your role is ${role}`
    });
});

// `app.get('/contact/:id', (req, res) => {`
//     const id = req.params.id;
//     const age = req.query.age;
//     const name = req.query.name;

//     res.send({
//         message: `Hello from contact page ${id} - ${name} - ${age}.`
//     });
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});