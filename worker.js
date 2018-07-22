const mongoose = require('mongoose');
const Posts = require('./models/posts');
const fs = require('fs');

//const url = 'mongodb://$[username]:$[password]@$[hostlist]/$[database]?authSource=$[authSource]';

const url = 'mongodb://localhost:27017/blog';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected correctly to server');

    fs.readFile('./source/js.md', 'utf-8', (err, data) => {
        if (err) throw err;

        var post = new Posts({
            id: 09,
            title: "Read .md into content field! ", //can do parse
            content: data
        });
    
        post.save((err, post) => {
            if (err) throw err;
            console.log("save successful:\n" + post);
        });
    });
    
});
