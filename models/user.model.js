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
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;   
                delete ret._id;   
                delete ret.password; 
                delete ret.__v;    
            }
        }
    }
);


import bcrypt from 'bcrypt';

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

//  פונקציה לבדיקת התאמת סיסמה
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = model('User', userSchema);
export default User;