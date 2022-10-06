const Sequelize = require('sequelize');
const db = require("../db/connection");

const Aluno = db.define('aluno', {
    matricula: {
        type: Sequelize.INTEGER,
    },
    nome: {
        type: Sequelize.STRING,
    },
    cpf: {
        type: Sequelize.INTEGER,
    },
    nascimento: {
        type: Sequelize.STRING,
    },
    responsavel: {
        type: Sequelize.BOOLEAN,
    },
    endereco: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    telefone: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Aluno;
