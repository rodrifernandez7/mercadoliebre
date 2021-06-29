module.exports = function(sequelize, dataTypes) {
    let alias = "Pelicula";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },                                       /* columnas que sequelize va a leer de la db */
        title: {
            type: dataTypes.STRING
        },
        awards: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }
    }

    let config = {
        tableName: "movies",
        timestamps: false,
        /* paranoid: true */
    }
    
    let Pelicula = sequelize.define(alias, cols, config);

    Pelicula.associate = function (models) {
        Pelicula.belongsTo(models.Genero, { /* pertenece a UN solo genero */

            as: "genero",

            foreignKey: "genre_id"

        });

        Pelicula.belongsToMany(models.Actor, { /* la relacion es de muchos a muchos. Agrego otra relación */

            as: "actores",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false

        });
    }                        

    return Pelicula;
}