const Sequelize = require('sequelize');
const db = require("../db/connection");

const Curso = db.define('curso', {
    codCurso: {
        type: Sequelize.INTEGER,
    },
    nome: {
        type: Sequelize.STRING,
    },
    modulo: {
        type: Sequelize.STRING,
    },
    cargaHoraria: {
        type: Sequelize.STRING,
    }
});

module.exports = Curso;
