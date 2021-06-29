module.exports = function(sequelize, dataTypes) {
    let alias = "Genero";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },                                       /* columnas que sequelize va a leer de la db */
        name: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName = "genres",
        timestamps = false
    }
    
    let Genero = sequelize.define(alias, cols, config);

    Genero.associate = function (models) {
        Genero.hasMany(models.Pelicula, {  /* explicando que un genero tiene muchas peliculas asociadas. "Pelicula" es el alias que le puse en el modelo */

            as: "peliculas",

            foreignKey: "genre_id"

        });                                  
            
    }

    return Genero;
}