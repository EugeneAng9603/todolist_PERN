const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// POST - create todo
app.post("/todos", async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// Get all Todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        )

        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// Get todo by id
app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todobyID = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", 
            [id]
        )

        res.json(todobyID.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

// Update todo by id and new des
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        )

        res.json("Updated!")
    } catch (err) {
        console.err(err.message)
    }
})

// Delete todo by id
app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        )

        res.json("Deleted!")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("Server has started on post 5000");
})