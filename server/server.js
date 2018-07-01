const _=require('lodash');
const express = require('express');
const bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');

var app = express();

const port = process.env.PORT || 3000;

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

app.delete('/todo/:id',(req,res) => {
    var id = req.params.id;
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo) => {
       if(!todo)
       {
       	res.status(404).send();
       }
       res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.patch('/todo/:id',(req,res) => {
	var id = req.params.id;
	var body = _.pick(req.body,['text','completed']);

	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id,{$set:body}, {new: true}).then((todo) => {
        if(!todo){
        	return res.status(404).send();
        }
        res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});

});

app.listen(port,(err) => {
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