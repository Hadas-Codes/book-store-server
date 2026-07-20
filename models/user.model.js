import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true, 
            unique: true,    
            trim: true,
        },

        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            match: [/^(?:(?:(\+?972|\(\+?972\)|\+972-?)|0)(?:[23489]|5[0-489]|77)[-]?\d{7})$/, 'Please enter a valid Israeli phone number'],
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [4, 'Password must be at least 4 characters long'],
        },

        registrationDate: {
            type: Date,
            default: Date.now, 
        },

        borrows: [
            {
                code: { type: String, required: true },
                title: { type: String, required: true }
            }
        ]
    },
    {
        timestamps: true, 
    }
);

export const User = model('User', userSchema);
export default User;