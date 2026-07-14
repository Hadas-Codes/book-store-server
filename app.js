import express from 'express';
import { books } from './db.js';

const app = express();
const PORT = 5000;

app.use(express.json());

app.all('/', (req, res) => {
    res.send(`Root path accessed via ${req.method}`);
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:code', (req, res) => {
const bookCode = parseInt(req.params.code);
const book = books.find(b => b.code === bookCode);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});


app.post('/books', (req, res) => {
    const { title, category } = req.body;
    if (!title || !category) {
        return res.status(400).json({ message: "Title and category are required" });
    }
    const newCode = books.length > 0 ? Math.max(...books.map(b => b.code)) + 1 : 1;
    const newBook = {
        code: newCode,
        title,
        category,
        isBorrowed: false, 
        borrowHistory: []
    };
    books.push(newBook);
    res.status(201).json({ message: "Book added successfully!", book: newBook });
});


app.delete('/books/:code', (req, res) => {
    const bookCode = parseInt(req.params.code);
    const bookIndex = books.findIndex(b => b.code === bookCode);
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});