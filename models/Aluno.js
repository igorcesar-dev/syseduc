const Sequelize = require('sequelize');
const db = require("../db/connection");

const Aluno = db.define('aluno', {
    matricula: {
        type: Sequelize.INTEGER,
    },
    nome: {
        type: Sequelize.STRING,
    },
    tipo: {
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
    rua: {
        type: Sequelize.STRING,
    },
    bairro: {
        type: Sequelize.STRING,
    },
    numero: {
        type: Sequelize.INTEGER,
    },
    cidade: {
        type: Sequelize.STRING,
    },
    estado: {
        type: Sequelize.STRING,
    },
    cep: {
        type: Sequelize.INTEGER,
    },
    email: {
        type: Sequelize.STRING,
    },
    telefone: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Aluno;
