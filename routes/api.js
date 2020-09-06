const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');

// Routes
router.get('/', (req, res) => {
    BlogPost.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
});

router.post('/save', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        return res.json({
            msg: 'We received your data!!!'
        });
    })
});

router.get('/name', (req, res) => {
    const data = {
        username: 'Saddam',
        age: 5
    };
    res.json(data);
});

module.exports = router;