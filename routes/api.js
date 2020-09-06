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

router.get('/name', (req, res) => {
    const data = {
        username: 'Saddam',
        age: 5
    };
    res.json(data);
});

module.exports = router;