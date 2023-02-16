const express = require('express');
        //import data
const fs = require('fs')
const food = require('./dataBase/food.json');
const employees = require('./dataBase/employees.json');
const restaurant = require('./dataBase/restaurant.json');
const users = require('./dataBase/users.json');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());

const port = 4040;

//Putting  (authenticate) in your homepage route will protected
app.get('/', (req,res) => {
    res.send('Homepage')
});
//POST REQUEST..............................................................
        //Food
app.get('/food', (req,res) => {
    res.send(food)
});
app.post('/food',(req, res) => { 
    const food = {
        id: req.body.id,
        name: req.body.name,
        desc: req.body.description,
        price: req.body.price,
        portion: req.body.portion
    }
    let data = fs.readFileSync('dataBase/food.json')
    let foods = JSON.parse(data);
    foods.push(food)
    fs.writeFileSync('dataBase/foods.json', JSON.stringify(food));
    res.send('Food posted successfully')
});

        //Users
app.get('/users', authenticate, (req,res) => {
    res.send(users)
});
app.post('/register',(req, res) => { 
    const users = {
        id: req.body.id,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }
    let data = fs.readFileSync('dataBase/users.json')
    let user = JSON.parse(data);
    user.push(users)
    fs.writeFileSync('dataBase/users.json', JSON.stringify(user));
    res.send('User posted successfully')
});
        //Employee
app.get('/employees',  authenticate,(req,res) => {
    res.send(employees)
});
app.post('/employees',(req, res) => { 
        const employees = {
            id: req.body.id,
            name: req.body.name,
            nationality: req.body.name,
            dateEmployed: req.body.Dateemployed,
            status: req.body.status,
            gender: req.body.gender,
            state: req.body.state,
        }
    let data = fs.readFileSync('dataBase/employees.json')
    let employee = JSON.parse(data);
    employee.push(employees)
    fs.writeFileSync('dataBase/employees.json', JSON.stringify(employee));
    res.send('Employee posted successfully')
});
        //Restaurant
    app.get('/restaurant', (req,res) => {
        res.send(restaurant)
});
    app.post('/restaurant',(req, res) => { 
            const restaurant = {
                id: req.body.id,
                name: req.body.name,
                location: req.body.name,
                rating: req.body.name,
                employees: req.body.name,
            }
     let data = fs.readFileSync('dataBase/restaurant.json')

        //parsing data as JSON file
     let restaurants = JSON.parse(data);
     restaurant.push(restaurant)
     fs.writeFileSync('dataBase/restaurant.json', JSON.stringify(restaurant));
     res.send('Restaurant posted successfully')
});

//PATCHING loading................................................................
//GETTING by IDs..................................................................
        //getting EMPLOYEES by id
    app.get('/employees/:id', (req,res) => {
        //read the existing data from the file
     let data = fs.readFileSync('dataBase/employees.json');
        //parse the data as JSON
     let employees = JSON.parse(data);
        //find the employee with the specific id
     let employee = employees.find(employee => employee.id == req.params.id);
        //send the found employee back as the response
     if (employee) {
            res.send(employee);
     } else {
            res.status(404).send({error: "Employee does not exist"});
     }
})
        //getting RESTAURANT by id
     app.get('/restaurant/:id', (req,res) => {
     let data = fs.readFileSync('dataBase/restaurant.json');
        //parse the data as JSON
     let restaurant = JSON.parse(data);
     let restaurants = restaurant.find(restaurant => restaurant.id == req.params.id);
     if (restaurant) {
                res.send(restaurants);
     } else {
                res.status(404).send({error: "Restaurant does not exist"});
        }
});
        //getting USERS by id
    app.get('/users/:id', (req,res) => {
    let data = fs.readFileSync('dataBase/users.json');
        //parse the data as JSON
    let users = JSON.parse(data);
    let user = users.find(user => user.id == req.params.id);
    if (user) {
            res.send(user);
     } else {
            res.status(404).send({error: "Users does not exist"});
    }

});
    
//DELETING by IDs............................................................
        //deleting EMPLOYEES by id
        app.delete('/employees/:id', (req,res) => {
        let data = fs.readFileSync('dataBase/employees.json');
        let employee = JSON.parse(data);
        //filter() method is needed to delete a file
        let employees = employee.filter(employee => employee.id == req.params.id);
        if (employee) {
            res.send("Employee deleted successfully");
        } else {
            res.status(404).send({error: "Employee does not exist"});
        }
});
        //deleting FOODS by ids
     app.delete('/foods/:id', (req,res) => {
     let data = fs.readFileSync('dataBase/foods.json');
     let food = JSON.parse(data);
        //filter() method is needed to delete a file
     let foods = food.filter(food => food.id == req.params.id);
     if (food) {
        res.send("Food deleted successfully");
     } else {
        res.status(404).send({error: "Food does not exist"});
    }
});
            //delete an employee data
    app.delete('/employees/:id', (req,res )  => {
            //get the id from request parameters
     const id  =  req.params.id;
            //read the JSON file
     const employees  = JSON.parse(fs.readFileSync('dataBase/employees.json'));
            //This code is using the filter method on the "employees" array. The filter method()
            //In this case, the function compares the "id" property of each employee obj.in the 
            //The "id" variable, it is included in the new array. This effectively removes any
            //That do not match the "id" passed in it then stored in the "updatedEmployees" variables

            //filter out the employee with the specified id
     const updatedEmployees = employees.filter(employee => employee.id != id);

            //convert the updated array to a JSON string
     const updatedEmployeesData = JSON.stringify(updatedEmployees);

            //write the updated data to the JSON file
        fs.writeFileSync('dataBase/employees.json', updatedEmployeesData);

        res.send('Employee deleted');
});


            //update an employee data
    app.patch('employees/:id', (req,res) => {
            //read the JSON file
    const employees = JSON.parse(fs.readFileSync('dataBase/employees.json', 'utf8'));
    
            //find the employee with the matching
    const employee = employees.find(e => e.id == req.params.id);

            //update the employee properties
    employee.name = req.body.name;
    employee.Phone_number = req.body.Phone_number;
    employee.Address = req.body.Address;
    employee.EmploymentStatus = req.body.EmploymentStatus;
    employee.date_joined = req.body.date_joined;
    employee.position = req.body.position;

            //write the updated array to the employees.json file

});

//LOGIN..................................(using Basic authorization).......................
            //Secure password hashing library such as bcrypt or scrypt to store passwords
app.post('/users/login', (req,res) =>{
            //Extract the username and password from the request body
    const {username, password} = req.body;
    
            //Find the user in the list of users by matcing the provided username
    const user = users.find(u => u.username === username);
            //If the user is not found, return a 401(Unauthorized) response with an error message
    if (!user) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

            //Compare the provided password with the password stored for the user
    if (password === user.password) {
            //If the password match, create an Authorization token
    const token = Buffer.from(`${username}:${password}`).toString('base64');
            //Return a 200(OK) response with the Auth Successful message and the token
    return res.status(200).json({
            message: 'Auth Successful',
            token: token
        });
    } else {
            //If the passwords doesn't match, return a 401(Unauthorized) response with an error message
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
})

//MIDDLEWARE............................................................................
    function authenticate(req, res, next) {
//Check if the authorization header is present in the request
        if (req.headers.authorization) {
//Split the header value into its type and value
//This code checks if the authorization header is present in the request object
 //If it is present, then the value of the header is split into two parts
        const authHeader = req.headers.authorization.split(' ');
//The result of the split method is stored in the authHeader variable
        const authType = authHeader[0]; 
//And the second part of the authHeader array (index 1) is assigned to the authValue
//This code is used to parse the authorization header value and determine the type
        const authValue = authHeader[1];
                
        if (authType === 'Basic') {          //Check if the authorization type is 'Basic'

//Decode the base64 encoded value and split it into username and password
//Base64 encoding is commonly used to encode data in the HTTP Authorization
        const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');
//Find the user in the list of users by matching the provided username
        const user = users.find(u => u.username === username);
//If the user is not found, return a 401(Unauthorized) response with an error message
        if (!user) {
            return res.status(401).json({
                message: 'Authentication failed'
        });
}
                
  if (password === user.password) {       //Compare the provided password with the password stored for the user
  req.user = user.username;               //If the passwords match, attach the username to the request object
  next();                                 //Call the next middleware function
      } else { 
      return res.status(401).json({      //If the passwords don't match, return a 401(Unauthorized) response with an error message
      message: 'Username or Password is incorrect'
      });
}
      } else {
//If the authorization type is not 'Basic', return a 401(Unauthorized) response with an error message
      return res.status(401).json({
      message: 'Unauthorized'
        });
      }
        } else {
 //If the authorization header isnot present, return a 401(Unauthorized) response with an error message
        return res.status(401).json({
        message: 'Auth header not present'
        });
        }
}


app.use((req,res) => {
    res.status(404).json({message: 'Page Not Found'});
});

app.listen(port, () => {
    console.log(`server is listening at ${port}`)
})
