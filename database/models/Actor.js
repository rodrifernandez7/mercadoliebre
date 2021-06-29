module.exports = function(sequelize, dataTypes) {
    let alias = "Actor";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },                                       /* columnas que sequelize va a leer de la db */
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "actors",
        timestamps: false
    }
    
    let Actor = sequelize.define(alias, cols, config);

    Actor.associate = function (models) {
        Actor.belongsToMany(models.Pelicula, { /* la relacion es de muchos a muchos */

            as: "peliculas",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false

        });
    }                        

    return Actor;
}