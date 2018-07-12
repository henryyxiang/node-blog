const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//const url = 'mongodb://$[username]:$[password]@$[hostlist]/$[database]?authSource=$[authSource]';
const url = 'mongodb://localhost:27017/blog';

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log('Connect correctly to the server');
    const db = client.db("blog");

    for (let index = 1; index <= 10; index++) {

        var titleContent = "Test Title " + index;
        var bodyContent = "Test body " + index;
    
        db.collection('posts').insertOne({
            title: titleContent,
            date: "July 11, 2018",
            content: bodyContent
          });
    }

    client.close();
  });
