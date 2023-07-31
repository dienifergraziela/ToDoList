const db = require('./database');

class Tarefa {
  constructor(id_tarefa, name, description) {
    this.id_tarefa = id_tarefa;
    this.name = name;
    this.description = description;
  }

  static create(name, description, callback) {
    const sql = 'INSERT INTO tarefa (name, description) VALUES (?, ?)';
    db.query(sql, [name, description], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.insertId); // Retorna o ID da tarefa inserida
    });
  }

  static getAll(callback) {
    // Implemente a lógica para buscar todas as tarefas no banco de dados
    const sql = 'SELECT * FROM tarefa';
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  static getById(id, callback) {
    const sql = 'SELECT * FROM tarefa WHERE id_tarefa = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(new Error('Tarefa não encontrada'), null);
      }
      return callback(null, results[0]);
    });
  }

  static update(id, name, description, callback) {
    const sql = 'UPDATE tarefa SET name = ?, description = ? WHERE id_tarefa = ?';
    db.query(sql, [name, description, id], (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  static delete(id, callback) {
    db.query('DELETE FROM tarefa WHERE id_tarefa = ?', [id], (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  static updateStatus(id, status, callback) {
    db.query('UPDATE tarefa SET status = ? WHERE id_tarefa = ?', [status, id], (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

}


module.exports = Tarefa;
