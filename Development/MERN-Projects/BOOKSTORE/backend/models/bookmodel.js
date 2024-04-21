import mongoose from 'mongoose';


const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },  
        author: {
            type: String,
            required: true
        },  
        publishYear: {
            type: Number,
            required: true
        }, 
        publisher: {
            type: String,
            required: true
        },
        image: {
            data: Buffer, // or you can use a base64 string
            contentType: String // MIME type of the image
          },
        pdfVersion:  {
            data: Buffer, // or you can use a base64 string
            contentType: String // MIME type of the pdf
          },
        // This is an object that contains the configuration options for the schema,

    } ,
    {   // This is an object that contains the configuration options for the schema}
    timestamps: true,
    }
    

);

export const Book = mongoose.model('Book', bookSchema );