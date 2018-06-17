var express = require('express');
var bodyparser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');

var app = express();

app.use(bodyparser.json());

app.post('/todo',(req,res) => {

	var todo = new Todo({
		text: req.body.text

	});

	todo.save().then((result) =>{
           res.send(result);
           console.log(result);
	},(err) => {
        res.status(400).send(err);
	});

});

app.get('/todo',(req,res) => {
     Todo.find().then((todos) => {
          res.send({todos});
     },(err) => {
     	res.status(400).send(todos);
     });
      
});

app.get('/todo/:id',(req,res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send();
	}
	Todo.findById(id).then((todo) => {
       if(!todo)
       {
       	res.status(404).send();
       }
       res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
    
});

app.listen(3000,(err) => {
	if(err)
	{
		return console.log("error"+err);
	}
   console.log("server running");
});

module.exports = {app};

// var newTodo = new Todo({
// 	text:'First test',
// 	completed:true
// });

// newTodo.save().then((result) => {
// 	console.log(JSON.stringify(result,undefined,2));

// },(error) => {
//     console.log('unable to save todo');
// });