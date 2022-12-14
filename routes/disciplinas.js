const express = require('express');
const router = express.Router();
const Disciplina = require('../models/Disciplina');
const Educador = require('../models/Educador');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/cadastrarDisciplinas', (req, res) => {
  Educador.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(educadores => {
      res.render('admin/disciplina/cadastrarDisciplinas', {
        educadores
      });
    })
});

/* EXIBIÇÃO, BUSCA (ALUNOS); */
router.get('/disciplinas/exibirDisciplinas', (req, res) => {

  let search = req.query.disciplina;
  /*   let search = qAluno.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
   */
  let query = '%' + search + '%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress
  if (!search) {
    Disciplina.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(disciplinas => {

        res.render('admin/disciplina/exibirDisciplinas', {
          disciplinas
        });

      })
      .catch(err => console.log(err));
  } else {
    Disciplina.findAll({
      where: { nome: { [Op.like]: query } },
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(disciplinas => {
        res.render('admin/disciplina/exibirDisciplinas', {
          disciplinas, search
        });

      })
      .catch(err => console.log(err));
  }
});

// Rota de editar informações do aluno
router.get('/editdisciplinas/:id', (req, res) => {
  Disciplina.findAll({
    where: { id: req.params.id }
  }).then((disciplinas) => {
    Educador.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(educadores => {
        res.render("admin/disciplina/editarDisciplinas", { educadores: educadores, disciplinas: disciplinas })
      })
  }).catch((err) => {
    res.render("admin/disciplina/exibirDisciplinas")
  })
})
router.post("/editdisciplinas/:id", (req, res) => {
  Disciplina.findOne({
    where: { id: req.params.id }
  }).then((disciplinas) => {

    disciplinas.nome = req.body.nome
    disciplinas.codDisciplina = req.body.codDisciplina
    disciplinas.educador = req.body.educador
    disciplinas.codCurso = req.body.codCurso
    disciplinas.horario = req.body.horario
    disciplinas.semestre = req.body.semestre
    disciplinas.ministrante = req.body.ministrante

    disciplinas.save().then(() => {
      res.render("admin/disciplina/msg-edicao")
    }).catch((err) => {
      res.render("admin/disciplina/exibirDisciplinas")
    })

  }).catch((err) => {
    res.render("admin/disciplina/exibirDisciplinas")
  })
})
// Fim da rota de editar aluno


// ADD ALUNO VIA POST
router.post('/add', (req, res) => {
  let { codDisciplina, nome, educador, codCurso, horario, semestre, ministrante } = req.body;

  // INSERT
  Disciplina.create({
    codDisciplina,
    nome,
    educador,
    codCurso,
    horario,
    semestre,
    ministrante
  })
    .then(() =>
      res.render('admin/disciplina/msg-cadastro')
    )
    .catch(err => console.log(err));

});

/* EXCLUSAO (ALUNOS) */
router.get('/removerdisciplina/:id', function (req, res) {
  Disciplina.destroy({
    where: { 'id': req.params.id }
  }).then(function () {
    res.render('admin/disciplina/msg-exclusao')
  }).catch(function (erro) {
    res.send("Aluno não foi removido!")
  })
});

module.exports = router;
