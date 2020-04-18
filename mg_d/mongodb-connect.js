//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb');

// var object = new ObjectID();      //generating own unique ID
// console.log(object);     

// var user = {name:"bhawesh",college:"skit"}; //ES6 feature object destructuring
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017',(err,client) => {
     if(err)
     {
     	return console.log("unable to connect");
     }
     console.log("connected to Mongo Server");

     var db = client.db('TodoApp');
     db.collection('Users').insertOne({
     	Name: 'Bhawesh',
     	College: 'SKIT',
     	Address: 'Jaipur'

     },(err,result) => {
     	if(err)
     		{return console.log("error in user",err);}
     	console.log(JSON.stringify(result.ops,undefined,2));

     });
     // db.collection('Todos').insertOne({
     // 	text: "Something to do",
     // 	completed: false


     // },(err,result) => {
     // 	if(err)
     // 		{
     // 			return console.log("unable to connect todo",err);
     //         }
     //      console.log(JSON.stringify(result.ops,undefined,2));

     // });
     

     client.close();

});
