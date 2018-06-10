//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client) => {
     if(err)
     {
     	return console.log("unable to connect");
     }
     console.log("connected to Mongo Server");

     var db = client.db('TodoApp');
     
     // db.collection('Todos').deleteMany({text:"creating duplicates"}).then((result) => {
     //  console.log(result);
     // });

     //db.collection('Todos').deleteOne({_id:new ObjectID('5b1bcf7204c071a02139913e')});

      db.collection('Todos').findOneAndDelete({completed:true}).then((result) => {
        console.log(result);
      });

     client.close();

});