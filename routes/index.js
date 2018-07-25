const express = require('express');
const Posts = require('../models/posts');

const indexRouter = express.Router();
const MarkdownIt = require('markdown-it');
var md = new MarkdownIt();


indexRouter.route('/')
.get((req,res,next) => {
    Posts.find({}, null, {sort: '-createdAt'})
    .then((posts) => {
        posts.forEach(post => {
            if (!post.abstract) {
                post.content = md.render(post.content);
                post.abstract = post.content.replace(/(<([^>]+)>)/ig,"").substring(0,150) + '...';
            }
        });
        res.render('index', {posts: posts});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.statusCode = 403;
});
module.exports = indexRouter;