const express    = require('express');
const exphbs     = require('express-handlebars')
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const Aluno      = require('./models/Aluno');
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`O express está rodando na porta ${PORT}`);
});

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));

// HANDLEBARS
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// DB CONNECTION
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso!");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err);
    });

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
});

// routes
app.get('/alunos/mostraralunos', (req, res) => {

    let search = req.query.aluno;
    let query  = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress
  
    if(!search) {
      Aluno.findAll({order: [
        ['createdAt', 'DESC']
      ]})
      .then(alunos => {
        
        res.render('mostraralunos', {
          alunos
        });
    
      })
      .catch(err => console.log(err));
    } else {
      Aluno.findAll({
        where: {nome: {[Op.like]: query}},
        order: [
          ['createdAt', 'DESC']
      ]})
      .then(alunos => {    
        res.render('mostraralunos', {
          alunos, search
        });
    
      })
      .catch(err => console.log(err));
    }
  });

app.get('/removeraluno/:id', function (req, res) {
    Aluno.destroy({
        where: { 'id': req.params.id }
    }).then(function () {
        res.render('msg-exclusao')
    }).catch(function (erro) {
        res.send("Aluno não foi removido!")
    })
});

// JOBS ROUTES
app.use('/alunos', require('./routes/alunos'));
