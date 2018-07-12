const express = require('express');
const aboutRouter = express.Router();

aboutRouter.route('/')
.get((req,res,next) => {
    res.render('about');
})
.post((req,res,next) => {
    res.statusCode = 403;
});

module.exports = aboutRouter;