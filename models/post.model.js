const { Sequelize, DataTypes } = require('sequelize');
const Model = Sequelize.Model;
const { sequelize } = require('./../config/db');

// Crear el modelo (tabla)
class Post extends Model { };

Post.init({
    // Agregar columna name
    name: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        allowNull: false,
    },

    postContent: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        allowNull: false,
    },

},
    {
        // Conexión (requerida)
        sequelize,
        // Renombrar tabla a minúsculas (opcional)
        modelName: 'post',
    });

module.exports = { Post };