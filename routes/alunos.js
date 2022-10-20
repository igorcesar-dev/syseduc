const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno')

router.get('/mostraralunos', (req, res) => {
    res.render('mostraralunos');
});

router.get('/adicionaralunos', (req, res) => {
    res.render('adicionaralunos');
});

router.get('/msg-exclusao', (req, res) => {
    res.render('msg-exclusao');
});

// Rota de editar informações do aluno
router.get('/edit/:id', (req, res) => {
    Aluno.findAll({
        where: { id: req.params.id }
    }).then((alunos) => {
        res.render("editaralunos", { alunos: alunos })
    }).catch((err) => {
        res.redirect("mostraralunos")
    })
})
router.post("/edit/:id", (req, res) => {
    Aluno.findOne({
        where: { id: req.params.id} 
    }).then((alunos) => {

        alunos.nome = req.body.nome
        alunos.matricula = req.body.matricula
        alunos.cpf = req.body.cpf
        alunos.nascimento = req.body.nascimento
        alunos.responsavel = req.body.responsavel
        alunos.rua = req.body.rua
        alunos.bairro = req.body.bairro
        alunos.numero = req.body.numero
        alunos.cidade = req.body.cidade
        alunos.estado = req.body.estado
        alunos.cep = req.body.cep
        alunos.email = req.body.email
        alunos.telefone = req.body.telefone

        alunos.save().then(() => {
            res.redirect("/")
        }).catch((err) => {
            res.redirect("/alunos/mostraralunos")
        })

    }).catch((err) => {
        res.redirect("/alunos/mostraralunos")
    })
})
// Fim da rota de editar aluno


// ADD ALUNO VIA POST
router.post('/add', (req, res) => {
    let { matricula, nome, cpf, nascimento, responsavel, rua, bairro, numero, cidade, estado, cep, email, telefone } = req.body;

    // INSERT
    Aluno.create({
        matricula,
        nome,
        cpf,
        nascimento,
        responsavel,
        rua,
        bairro,
        numero,
        cidade,
        estado,
        cep,
        email,
        telefone,
    })
        .then(() => res.redirect('mostraralunos'))
        .catch(err => console.log(err));

});

module.exports = router;