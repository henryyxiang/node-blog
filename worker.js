const mongoose = require('mongoose');
const Posts = require('./models/posts');
const fs = require('fs');

//const url = 'mongodb://$[username]:$[password]@$[hostlist]/$[database]?authSource=$[authSource]';

const url = 'mongodb://localhost:27017/blog';
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected correctly to server');

    fs.readFile('./source/01.md', 'utf-8', (err, data) => {
        if (err) throw err;

        var post = new Posts({
            id: 1,
            title: "Test for default method", //can do parse
            content: data
        });
    
        post.save((err, post) => {
            if (err) throw err;
            console.log("save successful to id = " + post.id + " with title: " + post.title);
        });
    });
});

setTimeout(()=>{db.close()},3000);