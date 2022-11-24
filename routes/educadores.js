const express = require('express');
const router = express.Router();
const Educador = require('../models/Educador');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/cadastrarEducador', (req, res) => {
  Educador.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(educadores => {

      res.render('admin/educador/cadastrarEducador', {
        educadores
      });

    })
    .catch(err => console.log(err));
});

/* EXIBIÇÃO, BUSCA (EDUCADORES); */
router.get('/educadores/exibirEducadores', (req, res) => {

  let search = req.query.educador;
  let query = '%' + search + '%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

  if (!search) {
    Educador.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(educadores => {

        res.render('admin/educador/exibirEducadores', {
          educadores
        });

      })
      .catch(err => console.log(err));
  } else {
    Educador.findAll({
      where: { nome: { [Op.like]: query } },
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(educadores => {
        res.render('admin/educador/exibirEducadores', {
          educadores, search
        });

      })
      .catch(err => console.log(err));
  }
});

// ADD EDUCADOR VIA POST
router.post('/add', (req, res) => {
  let { nome, rua, bairro, numero, cidade, estado, cep, email, telefone, turma, dataAdmissao, dataDemissao } = req.body;

  // INSERT
  Educador.create({
    nome,
    rua,
    bairro,
    numero,
    cidade,
    estado,
    cep,
    email,
    telefone,
    turma,
    dataAdmissao,
    dataDemissao
  })
    .then(() => res.render('admin/educador/msg-cadastro'))
    .catch(err => console.log(err));

});

// Rota de editar informações do educador
router.get('/editeducador/:id', (req, res) => {
  Educador.findAll({
    where: { id: req.params.id }
  }).then((educadores) => {
    res.render("admin/educador/editarEducador", { educadores: educadores })
  }).catch((err) => {
    res.render("admin/educador/exibirEducadores")
  })
})
router.post("/editeducador/:id", (req, res) => {
  Educador.findOne({
    where: { id: req.params.id }
  }).then((educadores) => {

    educadores.nome = req.body.nome
    educadores.matricula = req.body.matricula
    educadores.rua = req.body.rua
    educadores.bairro = req.body.bairro
    educadores.numero = req.body.numero
    educadores.cidade = req.body.cidade
    educadores.estado = req.body.estado
    educadores.cep = req.body.cep
    educadores.email = req.body.email
    educadores.telefone = req.body.telefone

    educadores.save().then(() => {
      res.render("admin/educador/msg-edicao")
    }).catch((err) => {
      res.render("admin/educador/exibirEducadores")
    })

  }).catch((err) => {
    res.render("admin/educador/exibirEducadores")
  })
})
// Fim da rota de editar aluno

/* EXCLUSAO (EDUCADORES) */
router.get('/removereducador/:id', function (req, res) {
  Educador.destroy({
    where: { 'id': req.params.id }
  }).then(function () {
    res.render('admin/educador/msg-exclusao')
  }).catch(function (erro) {
    res.send("Educador não foi removido!")
  })
});

module.exports = router;