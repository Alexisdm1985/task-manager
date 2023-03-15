const mongoose = require('mongoose');

const connectDB =  (url) => {
    return mongoose.connect(url, 
        {
            useUnifiedTopology: true, // remove warnings from cli
            useNewUrlParser: true // remove warnings from cli
        });
};

module.exports = connectDB;

