const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client) => {
     if(err)
     {
     	return console.log("unable to connect");
     }
     console.log("connected to Mongo Server");

     var db = client.db('TodoApp');
     
     db.collection('Users').findOneAndUpdate({_id:new ObjectID('5b1a67c3285beb11b06b6453')
      },{
        $set : {
            Name : "Bhawesh Singh"
        },
        $inc : {
            roll : 1
        }
      },{returnOriginal : false}).then((result) => {
         console.log(result);
      });

     client.close();

});
