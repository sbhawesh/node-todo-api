const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');

const {Todo} = require('./../models/todo');

const todos = [{
	text:"first test"
},{
	text:"second test"
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