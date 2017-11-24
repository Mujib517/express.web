const express = require('express');
const hbs = require('express-hbs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.set('view engine', 'hbs');
app.set('views', path.join(path.join(__dirname, 'public'), 'views'));
app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + "/public/views/layout.hbs",
    partialsDir: __dirname + "/public/views/partials"
}));

//arrow function
app.listen(port, () => {
    console.log("Server is running...");
});

mongoose.connection.openUri("mongodb://admin:admin@ds163595.mlab.com:63595/products");

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', defaultRouter);
app.use('/products', productRouter);
