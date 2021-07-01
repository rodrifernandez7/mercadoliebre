const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/search', moviesController.search);

/* Vista de creacion de pelicula */
router.get('/add', moviesController.add);

/* Logica de almacenamiento de pelicula */
router.post('/add', moviesController.store);

/* Vista de listado de peliculas completo */
router.get('/', moviesController.list)

/* Vista detalle de cada pelicula */
router.get('/:id', moviesController.detail);

/* Actualizar peli */
router.get('/update/:id', moviesController.edit);

/* Logica update que responde al edit de la peli */
router.patch('/update/:id', moviesController.update);

/* Borrado de pelicula */
router.delete('/delete/:id', moviesController.delete);

module.exports = router;