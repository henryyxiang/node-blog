const mongoose = require('mongoose');
const Posts = require('./models/posts');

//const url = 'mongodb://$[username]:$[password]@$[hostlist]/$[database]?authSource=$[authSource]';
const url = 'mongodb://localhost:27017/blog';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected correctly to server');

    var post = new Posts({
        id: 02,
        title: "Test Title III",
        content: "The test content III."
    });

    post.save(function (err, post) {
        if (err) {
            return console.error(err);
        } else {
            console.log("save successful:\n" + post);
        }
    });
});
