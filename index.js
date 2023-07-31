const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
app.use(expressLayouts);
app.set('layout', './layouts/defaults/index');

const tarefaController = require('./controllers/tarefaController');

const port = 8080;

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

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

