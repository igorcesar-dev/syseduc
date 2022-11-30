const Sequelize = require('sequelize');
const db = require("../db/connection");

const Disciplina = db.define('disciplina', {
    nome: {
        type: Sequelize.STRING,
    },
    codCurso: {
        type: Sequelize.STRING,
    },
    horario: {
        type: Sequelize.STRING,
    },
    semestre: {
        type: Sequelize.INTEGER,
    },
    ministrante: {
        type: Sequelize.STRING,
    }
});

module.exports = Disciplina;
