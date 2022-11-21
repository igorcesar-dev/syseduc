const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/cadastrarCurso', (req, res) => {
  res.render('admin/curso/cadastrarCurso');
});

/* EXIBIÇÃO, BUSCA (Cursos); */
router.get('/cursos/exibirCursos', (req, res) => {

  let search = req.query.curso;
  let query = '%' + search + '%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

  if (!search) {
    Curso.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(cursos => {

        res.render('admin/curso/exibirCursos', {
          cursos
        });

      })
      .catch(err => console.log(err));
  } else {
    Curso.findAll({
      where: { nome: { [Op.like]: query } },
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(cursos => {
        res.render('admin/curso/exibirCursos', {
          cursos, search
        });

      })
      .catch(err => console.log(err));
  }
});

// Rota de editar informações do aluno
router.get('/editcurso/:id', (req, res) => {
  Curso.findAll({
    where: { id: req.params.id }
  }).then((cursos) => {
    res.render("admin/curso/editarCurso", { cursos: cursos })
  }).catch((err) => {
    res.render("admin/curso/exibirCurso")
  })
})
router.post("/editcurso/:id", (req, res) => {
  Curso.findOne({
    where: { id: req.params.id }
  }).then((cursos) => {

    cursos.codCurso = req.body.codCurso
    cursos.nome = req.body.nome
    cursos.modulo = req.body.modulo
    cursos.cargaHoraria = req.body.cargaHoraria

    cursos.save().then(() => {
      res.render("admin/curso/msg-edicao")
    }).catch((err) => {
      res.render("admin/curso/exibirCursos")
    })

  }).catch((err) => {
    res.render("admin/curso/exibirCursos")
  })
})
// Fim da rota de editar aluno


// ADD ALUNO VIA POST
router.post('/add', (req, res) => {
  let { codCurso, nome, modulo, cargaHoraria } = req.body;

  // INSERT
  Curso.create({
    codCurso,
    nome,
    modulo,
    cargaHoraria,

  })
    .then(() =>
      res.render('admin/curso/msg-cadastro')
    )
    .catch(err => console.log(err));

});

/* EXCLUSAO (ALUNOS) */
router.get('/removercurso/:id', function (req, res) {
  Curso.destroy({
    where: { 'id': req.params.id }
  }).then(function () {
    res.render('admin/curso/msg-exclusao')
  }).catch(function (erro) {
    res.send("Curso não foi removido!")
  })
});


module.exports = router;