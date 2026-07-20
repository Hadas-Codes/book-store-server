import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'נא להזין שם ספר'],
            trim: true,
        },
        
        price: {
            type: Number,
            required: [true, 'נא להזין מחיר'],
            min: [0, 'מחיר לא יכול להיות שלילי'],
        },

        category: [
            {
                type: String,
            },
        ],
      
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