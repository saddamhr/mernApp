// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const URI = "mongodb+srv://dbUser:dbUser@cluster0.r5usd.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
});

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }    
});

// Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Saving data to our mongo database
const data = {
    title: 'A',
    body: 'B'
};

const newBlogPost = new BlogPost(data); // instance of the model

// newBlogPost.save((error) => {
//     if(error) {
//         console.log('Ooops, something happened');
//     } else {
//         console.log('Data has been saved!!');
//     }
// });

// HTTP request logger
app.use(morgan('tiny'));

// Routes
app.get('/api', (req, res) => {
    BlogPost.find({})
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
});

app.get('/api/name', (req, res) => {
    const data = {
        username: 'Saddam',
        age: 5
    };
    res.json(data);
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));