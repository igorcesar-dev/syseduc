const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno');
const Curso = require('../models/Curso');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/cadastrarAluno', (req, res) => {
  Curso.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(cursos => {
      res.render('admin/aluno/cadastrarAluno', {
        cursos
      });
    })
});

/* EXIBIÇÃO, BUSCA (ALUNOS); */
router.get('/alunos/exibirAlunos', (req, res) => {

  let search = req.query.aluno;
  /*   let search = qAluno.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
   */
  let query = '%' + search + '%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress
  if (!search) {
    Aluno.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(alunos => {

        res.render('admin/aluno/exibirAlunos', {
          alunos
        });

      })
      .catch(err => console.log(err));
  } else {
    Aluno.findAll({
      where: { nome: { [Op.like]: query } },
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(alunos => {
        res.render('admin/aluno/exibirAlunos', {
          alunos, search
        });

      })
      .catch(err => console.log(err));
  }
});

// Rota de editar informações do aluno
router.get('/edit/:id', (req, res) => {
  Aluno.findAll({
    where: { id: req.params.id }
  }).then((alunos) => {
    res.render("admin/aluno/editarAluno", { alunos: alunos })
  }).catch((err) => {
    res.render("admin/aluno/exibirAlunos")
  })
})
router.post("/edit/:id", (req, res) => {
  Aluno.findOne({
    where: { id: req.params.id }
  }).then((alunos) => {

    alunos.nome = req.body.nome
    alunos.tipo = req.body.tipo
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
      res.render("admin/aluno/msg-edicao")
    }).catch((err) => {
      res.render("admin/aluno/exibirAlunos")
    })

  }).catch((err) => {
    res.render("admin/aluno/exibirAlunos")
  })
})
// Fim da rota de editar aluno


// ADD ALUNO VIA POST
router.post('/add', (req, res) => {
  let { matricula, nome, tipo, cpf, nascimento, responsavel, rua, bairro, numero, cidade, estado, cep, email, telefone } = req.body;

  // INSERT
  Aluno.create({
    matricula,
    nome,
    tipo,
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
    .then(() =>
      res.render('admin/aluno/msg-cadastro')
    )
    .catch(err => console.log(err));

});

/* EXCLUSAO (ALUNOS) */
router.get('/removeraluno/:id', function (req, res) {
  Aluno.destroy({
    where: { 'id': req.params.id }
  }).then(function () {
    res.render('admin/aluno/msg-exclusao')
  }).catch(function (erro) {
    res.send("Aluno não foi removido!")
  })
});


module.exports = router;
