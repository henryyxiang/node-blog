const mongoose = require('mongoose');
const Posts = require('./models/posts');
const fs = require('fs');

var id = 03;
if (id<10) {
    id = '0' + id;
}
var filePath = './source/' + id + '.md';
console.log('try to modifying ' + filePath);

const url = 'mongodb://localhost:27017/blog';
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected correctly to server');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;

        Posts.findOneAndUpdate({id: id}, {$set:{content: data}}, (err,doc) => {
            if (err) throw err;
            console.log('success!');
        });
    
    });
});

setTimeout(()=>{db.close()},2000);