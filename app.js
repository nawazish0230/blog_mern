const express = require('express');
const connectDb = require('./config/db')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// routes
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')

const app = express();

// cors
app.use(cors())

// db connection
connectDb();
// mongoose.connect('mongodb+srv://nawaz0230:nawaz0230@cluster0-ul74t.mongodb.net/blog_mern?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true})
// mongoose.connection.on('connected', () => {
//     console.log('connected to db');
// })
// mongoose.connection.on('error', () => {
//     console.log('error connecting');
// })



// image
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', (req, res) => {
    console.log(req.body)
    res.json({msg: "it works"})
})

app.use('/post', postRoutes)
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server is running in port ' + port);
})
