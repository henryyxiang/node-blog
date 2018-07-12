const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Posts = require('../models/posts');

const indexRouter = express.Router();


indexRouter.route('/')
.get((req,res,next) => {
    Posts.find({})
    .then((posts) => {
        res.render('index', {posts: posts});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.statusCode = 403;
});

module.exports = indexRouter;