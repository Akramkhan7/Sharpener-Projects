const  express = require('express');

const router = express.Router();

// Demo courses data
const courses = [
    {
        id: 1,
        name: "Frontend",
        description: "HTML, CSS, JS, React"
    },
    {
        id: 2,
        name: "Backend",
        description: "Node.js, Express, MongoDB"
    }
];


router.get('/', (req, res) => {
    const course = courses.map(course => course.name);
     res.send(`Course: ${course.join(', ')}`);
});


router.get('/:id', (req, res)=>{
    const id = Number(req.params.id);
    const course = courses.find(s => s.id === id);
    if(!course) return res.status(404).send("Course not found");
     res.send(
        `Course: ${course.name}, Description: ${course.description}`
    );
})


module.exports = router;