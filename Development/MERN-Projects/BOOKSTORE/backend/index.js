import express from 'express';
import {PORT, MONGO_URI} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookmodel.js';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());

/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }
));*/

//Middleware for parsing JSON body
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log(request);
    return response.status(234).send('Hello World!');
});

app.use('/book', bookRoute);

mongoose.connect(MONGO_URI) 
    .then(() => {
        console.log('Connected to MongoDB');   
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
          }); 
    })
    .catch((err) => {
        console.log(err);
    });

