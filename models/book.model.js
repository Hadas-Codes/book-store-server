import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'נא להזין שם ספר'],
            trim: true,
            unique: true, 
            minlength: [2, 'שם ספר חייב להכיל לפחות 2 תווים'],
            maxlength: [20, 'שם ספר לא יכול לעלות על 20 תווים'],
        },
        
        price: {
            type: Number,
            required: [true, 'נא להזין מחיר'],
            min: [0, 'מחיר לא יכול להיות שלילי'],
        },

        category: {
            type: String,
            required: [true, 'נא לבחור קטגוריה'],
            enum: {
                values: ['Fiction', 'Non-Fiction', 'Children', 'Science'], 
                message: '{VALUE} אינה קטגוריה תקפה'
            }
        },
      
        supplier: {
            nameSuper: String,
            tel: String, 
            mail: String,
        },
    },
    {
        timestamps: true, 
    }
);

export const Book = model('Book', bookSchema);
export default Book;