// setting web server
const express = require('express');
const app = express();
require('dotenv').config() 
const tasks = require('./src/routes/tasks') // routes impport
const connectDB = require('./src/db/connect') // mongodb connection with mongoose
const notfound = require('./src/middleware/not-found');
const errorHandlerMiddleware = require('./src/middleware/error-handler');
const path = require('path')
const PUBLIC_PATH = path.join(__dirname, 'public')

// MIDDLEWARE
app.use(express.static(PUBLIC_PATH));
app.use(express.json()); // to parse de req into a json format

// ROUTES
app.use('/api/v1/tasks', tasks);

app.use(notfound);
app.use(errorHandlerMiddleware); // express built-in error handler from docs

const PORT = process.env.PORT || 3000;

const startConnection = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> console.log(`server is listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    };
};

startConnection()