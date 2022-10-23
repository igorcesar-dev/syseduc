const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno')

router.get('/exibirAlunos', (req, res) => {
    res.render('exibirAlunos');
});

router.get('/cadastrarAluno', (req, res) => {
    res.render('cadastrarAluno');
});

router.get('/msg-exclusao', (req, res) => {
    res.render('msg-exclusao');
});

router.get('/msg-cadastro', (req, res) => {
    res.render('msg-cadastro');
});

router.get('/edit/msg-edicao', (req, res) => {
    res.render('msg-edicao');
})

// Rota de editar informações do aluno
router.get('/edit/:id', (req, res) => {
    Aluno.findAll({
        where: { id: req.params.id }
    }).then((alunos) => {
        res.render("editarAluno", { alunos: alunos })
    }).catch((err) => {
        res.redirect("exibirAlunos")
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
            res.redirect("msg-edicao")
        }).catch((err) => {
            res.redirect("/alunos/exibirAlunos")
        })

    }).catch((err) => {
        res.redirect("/alunos/exibirAlunos")
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
        .then(() => res.redirect('msg-cadastro'))
        .catch(err => console.log(err));

});

module.exports = router;