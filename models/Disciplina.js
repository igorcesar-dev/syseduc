const Sequelize = require('sequelize');
const db = require("../db/connection");

const Disciplina = db.define('disciplina', {
    codDisciplina: {
        type: Sequelize.INTEGER,
    },
    nome: {
        type: Sequelize.STRING,
    },
    educador: {
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
    }
});

module.exports = Disciplina;
