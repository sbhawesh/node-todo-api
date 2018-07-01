const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');

const {Todo} = require('./../models/todo');

const todos = [{
	_id:new ObjectID(),
	text:"first test"
},{
	_id:new ObjectID(),
	text:"second test",
	completed: true,
	completedAt: 555
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todo',() => {
	it('create a new todo', (done) => {    //creating test case 1
        var text = 'Test todo text';        //testing text

        request(app)
         .post('/todo')
         .send({text})
         .expect(200)
         .expect((res) => {
         	expect(res.body.text).toBe(text);
         })
         .end((err,res) => {
         	if(err){
         		return done(err);
         	}

         	Todo.find({text}).then((todos) => {             //database testing
         		expect(todos.length).toBe(1);
         		expect(todos[0].text).toBe(text);
         		done();
         	}).catch((e) => done(e));
         });
	});

	it('should not create todo with invalid body data',(done) =>{   //testcase 2
         request(app)
           .post('/todo')
           .send({})
           .expect(400)
           .end((err,res) => {
           	if(err){
           		return done(err);
           	}

           	Todo.find().then((todos) => {
           		expect(todos.length).toBe(2);
           		done();
           	}).catch((e) => done(e));
           });
	});
});

describe('GET /todo',() => {                    
	it("should get all todos",(done) => {         //third test case
        request(app)
         .get('/todo')
         .expect(200)
         .expect((res) => {
         	expect(res.body.todos.length).toBe(2);
         }).end(done);
	});
});

describe('GET /todo/:id',() => {                //three test cases of id route
	it("should return todo",(done) => {
		request(app)
		 .get(`/todo/${todos[0]._id.toHexString()}`)
		 .expect(200)
		 .expect((res) => {
		 	expect(res.body.todo.text).toBe(todos[0].text);
		 }).end(done);
	});

	it("should return 404 if not found",(done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		 .get(`/todo/${hexId}`)
		 .expect(404)
		 .end(done);
 
	});

	it("should return 404 for invalid id's",(done) => {
		request(app)
		 .get('/todo/1123ab')
		 .expect(404)
		 .end(done);

	});
      
});

describe('DELETE /todo/:id',() => {                //three test cases of delete route
    it("should remove todo",(done) => {
    	var hexID = todos[1]._id.toHexString();

    	request(app)
    	 .delete(`/todo/${hexID}`)
    	 .expect(200)
    	 .expect((res) => {
    	 	expect(res.body.todo._id).toBe(hexID);
    	 })
    	 .end((err,res) => {
    	 	if(err)
    	 	{
    	 		return done(err);
    	 	}

    	 	Todo.findById(hexID).then((todo) => {
    	 		expect(todo).toBeFalsy();
    	 		done();
    	 	}).catch((e) => done(e));
    	 });
    });

    it("should return 404 if not found",(done) =>{
    	var hexId = new ObjectID().toHexString();
		request(app)
		 .delete(`/todo/${hexId}`)
		 .expect(404)
		 .end(done);

    });

    it("should return 404 if ObjectID invalid",(done) => {
    	request(app)
		 .delete('/todo/1123ab')
		 .expect(404)
		 .end(done);

    });
});

describe('PATCH /todo/:id',() => {                //two testcases of patch
	it("should update todo",(done) => {
		var hexId = todos[0]._id.toHexString();
		var text = "updated text -------";

		request(app)
		 .patch(`/todo/${hexId}`)
		 .send({
		 	completed: true,
		 	text
		 })
		 .expect(200)
		 .expect((res) => {
		 	expect(res.body.todo.text).toBe(text);
		 	expect(res.body.todo.completed).toBe(true);
		 	expect(typeof(res.body.todo.completedAt)).toBe('string');
		 })
		 .end(done);
	});

	it("set completedAt null when completed false",(done) => {
		var hexId = todos[1]._id.toHexString();
		var text = "updated --text -------";

		request(app)
		 .patch(`/todo/${hexId}`)
		 .send({
		 	completed: false,
		 	text
		 })
		 .expect(200)
		 .expect((res) => {
		 	expect(res.body.todo.text).toBe(text);
		 	expect(res.body.todo.completed).toBe(false);
		 	expect(res.body.todo.completedAt).toBeFalsy();
		 })
		 .end(done);
	})

});