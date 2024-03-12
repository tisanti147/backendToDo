require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(cors());

const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

app.listen(10000, () => {
    console.log('Server running on port 3000');
});