import { User } from '../models/user.model.js';

// 1. קבלת כל המשתמשים
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// 2. הרשמה (sign-up)
export const signUp = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        next(error);
    }
};

// 3. התחברות (sign-in)
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        next(error);
    }
};