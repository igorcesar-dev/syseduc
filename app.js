const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Aluno = require('./models/Aluno');
const Educador = require('./models/Educador');
const Sequelize = require('sequelize');
const PORT = 3000;


const routerAlunos = require("./routes/alunos");
const routerEducadores = require("./routes/educadores");
const routerCursos = require("./routes/cursos");

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

app.use("/", routerAlunos);
app.use("/", routerEducadores);
app.use("/", routerCursos);

// ROTAS 

app.get('/', (req, res) => {
  res.render('index');
});

// Rota alunos;
app.use('/alunos', require('./routes/alunos'));

// Rota educadores;
app.use('/educadores', require('./routes/educadores'));

// Rota cursos;
app.use('/cursos', require('./routes/cursos'));

