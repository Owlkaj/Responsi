const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware agar Express bisa membaca data JSON dari frontend
app.use(express.json()); 
// Mengatur folder 'public' sebagai tempat file statis (HTML)
app.use(express.static(path.join(__dirname, 'public'))); 

// "Database" sementara menggunakan Array
let tasks = [];
let currentId = 1;

// 1. READ (Mendapatkan semua data)
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// 2. CREATE (Menambahkan data baru)
app.post('/api/tasks', (req, res) => {
    const newTask = { id: currentId++, title: req.body.title };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 3. UPDATE (Mengubah data berdasarkan ID)
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

// 4. DELETE (Menghapus data berdasarkan ID)
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send(); // Status 204 berarti sukses dihapus tanpa mengembalikan data
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});