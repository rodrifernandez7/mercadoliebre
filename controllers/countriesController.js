const fetch = require('node-fetch');

module.exports = {
    list: async (req , res) => { /* nos permite hacer pedidos asincrónicos pero que se hagan de manera sincrónica. Para resolverlos mas ordenadamente  */
        
        let countries =  await fetch('https://restcountries.eu/rest/v2/all').then(response => response.json());
        /* endpoint con el que queremos trabajar. tiene 2 promesas */      /* promesa que tiene que resolverse y luego pasa a la 2da con la que obtenemos la info */
        /* el await dice que de manera asincronica quiero q lea las lineas de codigo y que espere hasta que la primera linea se resuelva y guarde lo que tiene ahi. Y que luego resuelva la otra. */
        let provinces = await fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre').then(response => response.json());

        return res.render('countries', { countries, provinces: provinces.provincias}); /* provincias es como se encuentra en la API de terceros y es el valor que le estoy poniendo a "provinces"*/
    },

}