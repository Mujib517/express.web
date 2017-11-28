const express = require('express');
const hbs = require('express-hbs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const jade = require('jade');

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');
const middlewares = require('./utilities/middlewares');

const app = express();
const port = process.env.PORT || 3000;

const Auth = require('./utilities/auth');
const auth = new Auth(app);


app.use(express.static("public"));

app.set('view engine', 'hbs');
app.set('views', path.join(path.join(__dirname, 'public'), 'views'));
app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + "/public/views/layout.hbs",
    partialsDir: __dirname + "/public/views/partials"
}));

// app.set('view engine', 'jade');

app.get('/basic', function (req, res) {
    res.render("index");
});

//arrow function
app.listen(port, () => {
    console.log("Server is running...");
});

mongoose.connection.openUri("mongodb://admin:admin@ds163595.mlab.com:63595/products");
mongoose.Primary = global.Primary;

auth.configureAuth();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users/', userRouter);
app.use('/', defaultRouter);

app.use(middlewares.isAuthenticated);
app.use(middlewares.attchAuthInfo);
app.use(middlewares.noCache);

app.use('/products', productRouter);
