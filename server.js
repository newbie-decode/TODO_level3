const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];

app.get("/", (req, res) => {
    res.render("index", { tasks }); 
});

app.post("/add", (req, res) => {
    const { task } = req.body;
    if (task) {
        const newTask = {
            _id: tasks.length + 1, 
            name: task,
            completed: false,
        };
        tasks.push(newTask);
        res.redirect("/"); 
    } else {
        res.status(400).send("Task content is required");
    }
});

app.post("/complete/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
        task.completed = !task.completed; 
        res.redirect("/");
    } else {
        res.status(404).send("Task not found");
    }
});

app.post("/delete/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter((t) => t._id !== taskId);
    res.redirect("/");
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
