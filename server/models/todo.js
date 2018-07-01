var mongoose = require('mongoose');

var Todo = mongoose.model('todos',{
	text:{
		type:String,
		required:true,
		minlength:1,
		trim:true
	},
	completed:{
		type:Boolean,
		default:false
	},
	completedAt:{
		type:String,
		default:null,
		trim:true
	}
});

module.exports = {Todo};
