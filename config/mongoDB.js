const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'crud';
// Use connect method to connect to the server
MongoClient.connect(
    url, {
        useNewUrlParser: true
    },
    function (err, db) {
        if (err) throw err;
        global.dbo = db.db(dbName);
    }
);
// con global.dbo no necesito exportarlo, es global en node