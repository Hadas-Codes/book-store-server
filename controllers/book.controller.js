import { Book } from '../models/book.model.js';

// 1. קבלת כל הספרים
export const getAllBooks = async (req, res, next) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const books = await Book.find(filter);
        res.status(200).json(books);
    } catch (error) {
        next(error); 
    }
};

// 2. קבלת ספר לפי ID
export const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const book = await Book.findById(id);  
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        } 
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

// 3. קבלת ספרים לפי קטגוריה (כפרמטר ב-URL)
export const getBooksByCategory = async (req, res, next) => {
    try {
        const { category } = req.params; 
        const books = await Book.find({ category });
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

// 4. הוספת ספר חדש
export const addBook = async (req, res, next) => {
    try {
        const { title, category } = req.body;
        if (!title || !category) {
            return res.status(400).json({ message: "Title and category are required" });
        }
        const newBook = await Book.create(req.body);
        res.status(201).json({ message: "Book added successfully!", book: newBook });
    } catch (error) {
        next(error);
    }
};

// 5. עדכון פרטי ספר
export const updateBook = async (req, res, next) => { 
    try {
        const { id } = req.params; 
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });   
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }   

        res.status(200).json({ message: "Book updated successfully!", book: updatedBook });
    } catch (error) {
        next(error); 
    }
};

// 6. השאלת ספר
export const borrowBook = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const { customerId } = req.body;
        if (!customerId) {
            return res.status(400).json({ message: "Customer ID is required" });
        }
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }    
        if (book.isBorrowed) {
            return res.status(400).json({ message: "This book is already borrowed" }); 
        }   
        book.isBorrowed = true;
        book.borrowHistory.push({
            customerId,
            borrowDate: new Date()
        });
        await book.save();
        res.status(200).json({ message: "Book borrowed successfully!", book });
    } catch (error) {
        next(error); 
    }
};

// 7. החזרת ספר
export const returnBook = async (req, res, next) => { 
    try {
        const { id } = req.params; 
        const book = await Book.findById(id);  
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }  
        if (!book.isBorrowed) {
            return res.status(400).json({ message: "This book is not borrowed" }); 
        }
        book.isBorrowed = false;
        await book.save();
        res.status(200).json({ message: "Book returned successfully!", book });
    } catch (error) {
        next(error); 
    }
};

// 8. מחיקת ספר
export const deleteBook = async (req, res, next) => { 
    try {
        const { id } = req.params; 
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        next(error);
    }
};