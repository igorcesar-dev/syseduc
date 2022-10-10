const express = require('express');
const router  = express.Router();
const Aluno   = require('../models/Aluno')

router.get('/mostraralunos', (req, res) => {
    res.render('mostraralunos');
});

router.get('/adicionaralunos', (req, res) => {
    res.render('adicionaralunos');
});

router.get('/msg-exclusao', (req, res) => {
    res.render('msg-exclusao');
});

router.get('/editaralunos', (req, res) => {
    res.render('editaralunos');
});

// ADD ALUNO VIA POST
router.post('/add', (req, res) => {
    let {matricula, nome, cpf, nascimento, responsavel, endereco, email, telefone} = req.body;

    // INSERT
    Aluno.create({
        matricula,
        nome,
        cpf,
        nascimento,
        responsavel,
        endereco,
        email,
        telefone,
    })
    .then(() => res.redirect('mostraralunos'))
    .catch(err => console.log(err));

});

module.exports = router;