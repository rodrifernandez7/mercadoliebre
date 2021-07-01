const express = require ('express');
const session = require ('express-session');
const process = require ('process');
const app = express();
const path = require ('path');
const cookies = require('cookie-parser');
const methodOverride = require('method-override');

/* Porque es un middleware de aplicacion completa */
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')


/* Configuraciones */
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret: 'Silencio. Es un secreto...',
    resave: false,
    saveUninitialized: false
}));

app.use(cookies()); /* implemento cookies */

app.use(userLoggedMiddleware); /* tiene que ir siempre despues de la session */

app.use(methodOverride('_method'));


/* Rutas */
const homeRoutes = require ('./routes/home.js');
const usersRoutes = require ('./routes/users.js');
const productsRoutes = require ('./routes/products');
const moviesRoutes = require ('./routes/movies');


app.use('/', homeRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/movies', moviesRoutes);



/* Servidor */
app.listen(process.env.PORT || 3000, () =>{
    console.log('Servidor corriendo en el puerto 3000');
});