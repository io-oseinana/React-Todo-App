import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from "./config/db.js";
import { userRoutes, todoRoutes } from './routes/index.js';
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

connectDB().then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection failed:', err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Todo App Backend API is running!')
})

app.use('/api', userRoutes);
app.use('/api/todos', todoRoutes);


app.use(errorHandler)

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
})