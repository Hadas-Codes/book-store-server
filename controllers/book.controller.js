import books from '../db.js';

export const getAllBooks = (req, res) => {
    const { category } = req.query;
    let filteredBooks = [...books];
    if (category) {
        filteredBooks = filteredBooks.filter(book => 
            book.category.toLowerCase() === category.toLowerCase()
        );
    }
    res.json(filteredBooks);
};

export const addBook = (req, res) => {
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
};

// 3. עדכון פרטי ספר
export const updateBook = (req, res) => { 
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
 };

// 4. השאלת ספר
export const borrowBook = (req, res) => { 
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
 };

// 5. החזרת ספר
export const returnBook = (req, res) => { 
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
 };

// 6. מחיקת ספר
export const deleteBook = (req, res) => { 
    const bookCode = req.params.code; 
        const bookIndex = books.findIndex(b => b.code === bookCode);
        
        if (bookIndex === -1) {
            return res.status(404).json({ message: "Book not found" });
        }
        books.splice(bookIndex, 1);
        res.json({ message: "Book deleted successfully" });
};