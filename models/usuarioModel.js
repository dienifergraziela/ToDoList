const db = require('./database');
const md5 =require('md5');

class UsuarioModel{
    constructor(id_User, username, email, password ){
        this.id_User = id_User;
        this. username = username;
        this.email = email;
        this.password = password;
    }

    static autenticar(email, password){
        let sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${md5(password)}'`;
        console.log(sql);
    }
}

module.exports = UsuarioModel;