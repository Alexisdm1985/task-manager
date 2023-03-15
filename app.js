// setting web server
const express = require('express');
const app = express();
require('dotenv').config() 
const tasks = require('./routes/tasks') // routes impport
const connectDB = require('./db/connect') // mongodb connection with mongoose
const notfound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// MIDDLEWARE
app.use(express.static('./public'));
app.use(express.json()); // to parse de req into a json format

// ROUTES
app.use('/api/v1/tasks', tasks);

app.use(notfound);
app.use(errorHandlerMiddleware); // express built-in error handler from docs

const port = process.env.PORT || 3000;

const startConnection = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(`server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    };
};

startConnection()