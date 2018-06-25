const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Todo.remove({}).then((res) => {
//     console.log(res);
// });

Todo.findOneAndRemove({_id:'5b30a3cba69d81198847037f'}).then((result) => {
   console.log(result);
});

// Todo.findByIdAndRemove('5b30a3cba69d81198847037f').then((result) => {
//    console.log(result);
// });