import express from 'express';
import books from '../db.js';

const router = express.Router();

// 1. קבלת ספרים (כולל סינון ודפדוף)
router.get('/', (req, res) => {
    const { category, page, limit } = req.query;
    let filteredBooks = [...books];

    if (category) {
        filteredBooks = filteredBooks.filter(book => 
            book.category.toLowerCase() === category.toLowerCase()
        );
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    res.json({
        totalItems: filteredBooks.length,
        totalPages: Math.ceil(filteredBooks.length / limitNum),
        currentPage: pageNum,
        books: paginatedBooks
    });
});

// 2. הוספת ספר חדש
router.post('/', (req, res) => {
    const { title, category } = req.body;
    if (!title || !category) {
        return res.status(400).json({ message: "Title and category are required" });
    }   
    const newCode = books.length > 0 ? (Math.max(...books.map(b => parseInt(b.code))) + 1).toString() : "101";
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

// 3. עדכון פרטי ספר
router.put('/:code', (req, res) => {
    const bookCode = req.params.code; 
    const book = books.find(b => b.code === bookCode);  
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }   
    const { title, category, price } = req.body;    
    if (title) book.title = title;
    if (category) book.category = category;
    if (price) book.price = price;
    
    res.status(200).json({ message: "Book updated successfully!", book });
});

// 4. השאלת ספר
router.post('/:code/borrow', (req, res) => {
    const bookCode = req.params.code; 
    const { customerId } = req.body;
    if (!customerId) {
        return res.status(400).json({ message: "Customer ID is required" });
    }
    const book = books.find(b => b.code === bookCode);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    } 
    if (book.isBorrowed) {
        return res.status(400).json({ message: "This book is already borrowed" }); 
    }  
    book.isBorrowed = true;
    book.borrowHistory.push({
        borrowDate: new Date().toISOString().split('T')[0], 
        customerId: customerId
    });
    res.status(200).json({ message: "Book borrowed successfully!", book });
});

// 5. החזרת ספר
router.post('/:code/return', (req, res) => {
    const bookCode = req.params.code; 
    const book = books.find(b => b.code === bookCode);
    
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    
    if (!book.isBorrowed) {
        return res.status(400).json({ message: "This book is not borrowed" }); 
    }
    
    book.isBorrowed = false;
    res.status(200).json({ message: "Book returned successfully!", book });
});

// 6. מחיקת ספר
router.delete('/:code', (req, res) => {
    const bookCode = req.params.code; 
    const bookIndex = books.findIndex(b => b.code === bookCode);
    
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

export default router;