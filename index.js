const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();
app.use(expressLayouts);
app.set('layout', './layouts/defaults/index');
require('dotenv').config();
const tarefaController = require('./controllers/tarefaController');
const usuarioController = require('./controllers/usuarioController');
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    usuarioController.login(req, res);
    app.set('layout', './layouts/defauts/login')
})

app.post('/login', (req, res) => {
    usuarioController.autenticar(req, res);
/*
    if (1 == 0) {
        /*ERRADO - arrumar
    } else {
        app.set('layout', './layouts/defaults/index');
        res.locals.layoutVariables = {
            url: process.env.URL,
            img: "/img/",
            style: "/css/",
            name: "Tarefas",
            user: req.session.user,
        };
        
        if(req.session.msg){
            res.locals.layoutVariables.msg = req.session.msg;
            delete req.session.msg;
        }
    }/*nao sei se esse if e else é aqui 
    next();*/
})

app.get('/logout', (req, res) => {
    usuarioController.logout(req, res);
});

app.get('/tarefas', tarefaController.getTarefas);

app.post('/tarefas', tarefaController.addTarefa);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.use(express.static('views'));

// Rota para exibir o formulário de edição
app.get('/tarefas/:id/editar', tarefaController.getTarefaById);

// Rota para atualizar a tarefa
app.post('/tarefas/:id/editar', tarefaController.updateTarefa);

app.post('/tarefas/:id/excluir', tarefaController.deleteTarefa);

app.post('/tarefas/:id/atualizar-status', tarefaController.updateStatusTarefa);