require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(cors({
    origin: 'https://todo-utn.web.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Include DELETE method
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any other headers your app requires
}));


mongoose.connect("mongodb+srv://tisanti:ensolvers@cluster0.ufmaakm.mongodb.net/");
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(cors());

const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});