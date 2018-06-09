//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client) => {
     if(err)
     {
     	return console.log("unable to connect");
     }
     console.log("connected to Mongo Server");

     var db = client.db('TodoApp');
     db.collection('Todos').find({
          _id:new ObjectID('5b1a5f78d03363115c86ee05')
     }).toArray().then((docs) => {
       console.log("Todos");
       console.log(JSON.stringify(docs,undefined,2));

     },(err) =>{
              console.log("unable to connect todos",err);
     });

     client.close();

});