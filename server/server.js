var express = require('express');
var bodyparser = require('body-parser');

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

app.listen(3000,(err) => {
	if(err)
	{
		return console.log("error"+err);
	}
   console.log("server running");
});

// var newTodo = new Todo({
// 	text:'First test',
// 	completed:true
// });

// newTodo.save().then((result) => {
// 	console.log(JSON.stringify(result,undefined,2));

// },(error) => {
//     console.log('unable to save todo');
// });