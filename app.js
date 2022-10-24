const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Aluno = require('./models/Aluno');
const Sequelize = require('sequelize');
const { post } = require('./routes/alunos');
const Op = Sequelize.Op;
const PORT = 3000;

/* Verifica se o express está funcionando */
app.listen(PORT, function () {
  console.log(`O express está rodando na porta ${PORT}`);
});

/* Body Parser:  */
app.use(bodyParser.urlencoded({ extended: false }));

/* Handlebars */
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/* Pasta estática */
app.use(express.static(path.join(__dirname, 'public')));

/* Conexão com o database */
db
  .authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso!");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
  });

/* Rotas */

// Rota para a página inicial;
app.get('/', (req, res) => {
  res.render('index');
});


// Rota para a tela que exibe os alunos permitindo a busca e cadastro dos mesmos;
app.get('/alunos/exibirAlunos', (req, res) => {

  let search = req.query.aluno;
/*   let search = qAluno.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
 */  let query = '%' + search + '%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress
  if (!search) {
    Aluno.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(alunos => {

        res.render('exibirAlunos', {
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
        res.render('exibirAlunos', {
          alunos, search
        });

      })
      .catch(err => console.log(err));
  }
});

// Rota para excluir o aluno do banco;
app.get('/removeraluno/:id', function (req, res) {
  Aluno.destroy({
    where: { 'id': req.params.id }
  }).then(function () {
    res.render('msg-exclusao')
  }).catch(function (erro) {
    res.send("Aluno não foi removido!")
  })
});

// Rota alunos;
app.use('/alunos', require('./routes/alunos'));
