const mongoose = require('mongoose');
const Posts = require('./models/posts');
const fs = require('fs');

var id = 03;
if (id<10) {
    id = '0' + id;
}
var title = 'Test title';
var filePath = './source/' + id + '.md';

const url = 'mongodb://localhost:27017/blog';
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected correctly to server');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;

        var post = new Posts({
            id: id,
            title: title,
            content: data
        });
    
        post.save((err, post) => {
            if (err) throw err;
            console.log("save successful to id = " + post.id + " with title: " + post.title);
        });
    });
});

setTimeout(()=>{db.close()},3000);