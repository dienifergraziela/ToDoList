const usuarioModel = require('../models/usuarioModel');

function login(req,res){
    res.render('login');
}

function autenticar(req, res){
    usuarioModel.autenticar(req.body.email, req.body.password);
}

module.exports = {login, autenticar}