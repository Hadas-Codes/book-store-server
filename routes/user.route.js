import express from 'express';
import users from '../users.js'; 

const router = express.Router();

router.get('/', (req, res) => {
    res.json(users);
});

router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newCode = users.length > 0 ? 
    (Math.max(...users.map(u => parseInt(u.code))) + 1).toString() : "1";

    const newUser = {
        code: newCode,
        username,
        email,
        password,
        borrowedBooks: []
    };

    users.push(newUser);
    res.status(201).json({ message: "User registered successfully!", user: newUser });
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful!", user });
});

export default router;