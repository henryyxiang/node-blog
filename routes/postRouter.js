const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MarkdownIt = require('markdown-it');

const Posts = require('../models/posts');

const postRouter = express.Router();
var md = new MarkdownIt();

postRouter.route('/')
.get((req,res,next) => {
    Posts.find({})
    .then((posts) => {
        posts.forEach(post => {
            post.content = md.render(post.content);
        });
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
        post.content = md.render(post.content);
        res.render('article', {post: post});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.statusCode = 403;
});

module.exports = postRouter;