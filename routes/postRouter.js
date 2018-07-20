const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const markdown = require( "markdown" ).markdown;

const Posts = require('../models/posts');

const postRouter = express.Router();

postRouter.route('/')
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

postRouter.route('/:postId')
.get((req,res,next) => {
    Posts.findOne({id: req.params.postId})
    .then((post) => {
        post.content = markdown.toHTML(post.content);
        res.render('article', {post: post});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.statusCode = 403;
});

module.exports = postRouter;