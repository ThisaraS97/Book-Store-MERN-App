import express from 'express';
import { Book } from '../models/bookmodel.js'; 
import multer from 'multer';

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });    // Set the destination folder for uploaded files


//Route for Saving a new Book
router.post('/', upload.fields([{name: 'image', maxcount: 1 }, {name: 'pdfVersion', maxCount: 1 }]), async (req, res) => {
    try {
        if (!req.body.title || 
            !req.body.author || 
            !req.body.publishYear ||
            !req.body.publisher) 
            {
            return res.status(400).send('All fields are required');
        }

        const newBook ={
            title: req.body.title,
            author: req.body.author,  
            publishYear: new Date(req.body.publishYear).getFullYear(),
            publisher: req.body.publisher,
        };

        const book = await Book.create(newBook);
        console.log(book);

        res.status(201).send({book});
    }
    
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route for Getting all Books
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const books = await Book.find().skip(skip).limit(limit);
        console.log(books);

        const totalBooksCount = await Book.countDocuments();

        return res.status(200).send({
            count: books.length,
            totalBooks: totalBooksCount,
            totalPages: Math.ceil(totalBooksCount / limit), 
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route for Getting all Books
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        
        return res.status(200).send({
            count: book.length,
            data: book,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route for Updating a Book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || 
            !req.body.author || 
            !req.body.publishYear ||
            !req.body.publisher) 
            {
            return res.status(400).send('All fields are required');
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).send('Book not found');
        }
        return res.status(200).send('Book updated successfully');
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
    //
});

//Route for Deleting a Book
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('Book not found');
        }
        return res.status(200).send('Book deleted successfully');
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

export default router;