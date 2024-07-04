const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const authMiddleware = require('./middlewares/authMiddleware');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(() => 'error in connecting database');

const app = express();

//MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', require('./Routes/authRoutes'));
app.use('/', require('./Routes/userRoutes'));

// CORS Setup
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173' 
}));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
});
