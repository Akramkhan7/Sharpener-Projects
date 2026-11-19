const express = require('express');
const router = express.Router();

// Demo students data
const students = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

router.get('/', (req, res) => {
    const names = students.map(student => student.name);
     res.send(`Students: ${names.join(', ')}`);
});


router.get('/:id', (req, res)=>{
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);
    if(!student) return res.status(404).send("Student not found");
    res.send(`Student: ${student.name}`);
})


module.exports = router;