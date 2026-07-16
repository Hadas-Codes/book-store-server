// 1. ייבוא ספריות ונתונים
import express from 'express';
import books from './db.js'; // שים לב: ב-ES Modules חובה להוסיף את הסיומת .js בייבוא קבצים מקומיים
const app = express();
const PORT = 5000;

// 2. הגדרת Middleware לקריאת JSON מגוף הבקשה (body)
app.use(express.json());

// ==========================================
// 3. אזור הנתיבים (Routes)
// ==========================================

// א. קבלת כל הספרים (עם סינון וחלוקה לעמודים - סעיף 4)
app.get('/books', (req, res) => {
    const { category, page, limit } = req.query;
    let filteredBooks = [...books];

    // סינון לפי קטגוריה (אם נשלחה)
    if (category) {
        filteredBooks = filteredBooks.filter(book => 
            book.category.toLowerCase() === category.toLowerCase()
        );
    }

    // הגדרת עמוד נוכחי וכמות לעמוד עם ערכי ברירת מחדל
    const currentPage = parseInt(page) || 1;
    const currentLimit = parseInt(limit) || 5;

    // חישוב המיקומים לחיתוך
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    res.json({
        totalItems: filteredBooks.length,
        page: currentPage,
        limit: currentLimit,
        totalPages: Math.ceil(filteredBooks.length / currentLimit),
        data: paginatedBooks
    });
});

// ב. קבלת ספר ספציפי לפי קוד (GET)
app.get('/books/:code', (req, res) => {
    const bookCode = req.params.code; // השוואה כמחרוזת
    const book = books.find(b => b.code === bookCode);
    
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});

// ג. הוספת ספר חדש (POST)
app.post('/books', (req, res) => {
    const { title, category } = req.body;
    if (!title || !category) {
        return res.status(400).json({ message: "Title and category are required" });
    }
    
    // יצירת קוד חדש כמחרוזת (string) בהתאם למבנה ב-db.js
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

// ד. עדכון פרטי ספר (PUT)
app.put('/books/:code', (req, res) => {
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

// ה. ביצוע השאלת ספר (POST)
app.post('/books/:code/borrow', (req, res) => {
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

// ו. ביצוע החזרת ספר (POST)
app.post('/books/:code/return', (req, res) => {
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

// ז. מחיקת ספר (DELETE)
app.delete('/books/:code', (req, res) => {
    const bookCode = req.params.code; // השוואה כמחרוזת בהתאמה ל-db.js
    const bookIndex = books.findIndex(b => b.code === bookCode);
    
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

// ==========================================
// 4. הפעלת השרת (תמיד בסוף הקובץ!)
// ==========================================
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});