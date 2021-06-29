let db = require('../database/models'); /* nos va a permitir interactuar con la base de datos */

let moviesController = {
    add: function (req , res){
        db.Genero.findAll()        /* para que los usuarios puedan agregar tambien el genero pero de los que aparecen en la db */
        .then(function(generos){
            return res.render('moviesAdd', {generos:generos}); /* le aclaro cuales son los datos que quiero mostrar */
        })
    },

    store: function (req , res){
        db.Pelicula.create({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre_id,
            length: req.body.length,
            rating: req.body.rating
        });

        res.redirect('/movies');
    },

    list: function (req , res){
        db.Pelicula.findAll()
        .then(function(peliculas){
            res.render('moviesList', {peliculas:peliculas});
        })  
    },

    detail: function (req , res){
        db.Pelicula.findByPk(req.params.id, { /* porque lo saco del url */
            include: [{association: 'genero'},{association: 'actores'}]  /* son los 'as' que puse en las relaciones. Para que asocie y muestre tambien generos y actores */
        }) 
         .then(function(pelicula){
             res.render('moviesDetail', {pelicula:pelicula});
         })
    },

    edit: function (req , res){
        let pedidoPelicula = db.Pelicula.findByPk(req.params.id);

        let pedidoGeneros = db.Genero.findAll();

        /* Tengo 2 pedidos asincronicos entonces los defino por separado y hago un prmise.all con ambas promesas*/

        Promise.all([pedidoPelicula, pedidoGeneros])
        .then(function([pelicula, generos]){
            res.render('moviesEdit', {pelicula:pelicula, generos:generos});
        })
    },

    update: function (req , res){
        db.Pelicula.update({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre_id,
            length: req.body.length,
            rating: req.body.rating
        }, {
            where: {
                id: req.params.id
            }
        }); 

        res.redirect('/movies/' + req.params.id);
    },

    delete: function (req , res){
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
        .then()
        .catch(e => res.send(e));
        res.redirect('/movies');
    }
}

module.exports = moviesController;