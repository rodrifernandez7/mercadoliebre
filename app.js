const express = require ('express');
const process = require ('process');
const app = express();
const path = require ('path');

/* Configuraciones */
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/* Rutas */
const homeRoutes = require ('./routes/home.js');
const usersRoutes = require ('./routes/users.js');


app.use('/', homeRoutes);
app.use('/users', usersRoutes);


/* Servidor */
app.listen(process.env.PORT || 3000, () =>{
    console.log('Servidor corriendo en el puerto 3000');
});