const Sequelize = require('sequelize');
const db = require("../db/connection");

const Educador = db.define('educadores', {
    nome: {
        type: Sequelize.STRING,
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
    },
    turma: {
        type: Sequelize.STRING,
    },
    dataAdmissao: {
        type: Sequelize.STRING,
    },
    dataDemissao: {
        type: Sequelize.STRING,
    }
});

module.exports = Educador;
