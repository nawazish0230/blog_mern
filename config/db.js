const mongoose = require('mongoose');
const MONGO_URI  = require('./dev').MONGO_URI;
// console.log(MONGO_URI)
const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('mongdb connected');
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

module.exports = connectDb;