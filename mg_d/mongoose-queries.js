const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5b262a030548a4081cfd1fe5';

if(!ObjectID.isValid(id)){
	console.log('ID not valid');
}

Todo.findById(id).then((todo) => {
	if(!todo){
		return console.log("ID not found");
	}
	console.log(JSON.stringify(todo,undefined,2));
}).catch((e) => console.log(e));