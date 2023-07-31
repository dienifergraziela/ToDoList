const Tarefa = require('../models/tarefa');

function getTarefas(req, res) {
  Tarefa.getAll((err, tarefas) => {
    if (err) {
      console.error('Erro ao obter as tarefas:', err);
      return res.status(500).send('Erro ao obter as tarefas do banco de dados.');
    }
    return res.render('tarefas', { tarefas });
  });
}

function addTarefa(req, res) {
  const { name, description } = req.body;

  Tarefa.create(name, description, (err, id) => {
    if (err) {
      console.error('Erro ao inserir a tarefa:', err);
      return res.status(500).send('Erro ao inserir a tarefa no banco de dados.');
    }
    res.redirect('/tarefas');
  });
}

function updateTarefa(req, res) {
  const { id } = req.params; // Obtém o ID da tarefa a ser atualizada
  const { name, description } = req.body; // Obtém os dados atualizados do formulário

  // Faça uma consulta para atualizar os dados da tarefa no banco de dados
  Tarefa.update(id, name, description, (err) => {
    if (err) {
      console.error('Erro ao atualizar a tarefa:', err);
      return res.status(500).send('Erro ao atualizar a tarefa no banco de dados.');
    }
    res.redirect('/tarefas'); // Redireciona para a lista de tarefas após a atualização
  });
}

function getTarefaById(req, res) {
    const { id } = req.params;
  
    Tarefa.getById(id, (err, tarefa) => {
      if (err) {
        console.error('Erro ao obter a tarefa:', err);
        return res.status(500).send('Erro ao obter a tarefa do banco de dados.');
      }
      return res.render('editarTarefa', { tarefa }); // Renderiza o formulário de edição com os dados da tarefa
    });
}

function deleteTarefa(req, res) {
    const { id } = req.params; // Obtém o ID da tarefa a ser excluída
  
    // Faça uma consulta para excluir a tarefa no banco de dados
    Tarefa.delete(id, (err) => {
      if (err) {
        console.error('Erro ao excluir a tarefa:', err);
        return res.status(500).send('Erro ao excluir a tarefa do banco de dados.');
      }
      res.redirect('/tarefas'); // Redireciona para a lista de tarefas após a exclusão
    });
}

function updateStatusTarefa(req, res) {
    const { id } = req.params; // Obtém o ID da tarefa a ser atualizada
    const { status } = req.body; // Obtém o novo status do formulário
  
    // Faça uma consulta para atualizar o status da tarefa no banco de dados
    Tarefa.updateStatus(id, status, (err) => {
      if (err) {
        console.error('Erro ao atualizar o status da tarefa:', err);
        return res.status(500).send('Erro ao atualizar o status da tarefa no banco de dados.');
      }
      res.redirect('/tarefas'); // Redireciona para a lista de tarefas após a atualização
    });
  }

module.exports = { getTarefas, addTarefa, updateTarefa, getTarefaById, deleteTarefa, updateStatusTarefa };
