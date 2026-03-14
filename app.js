const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public'))); 


let tasks = [];
let currentId = 1;


app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = { id: currentId++, title: req.body.title };
    tasks.push(newTask);
    res.status(201).json(newTask);
});


app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.title = req.body.title;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Tugas tidak ditemukan' });
    }
});


app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send(); 
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});
