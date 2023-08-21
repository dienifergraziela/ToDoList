const UsuarioModel = require('../models/usuarioModel');
const usuarioModel = require('../models/usuarioModel');

function login(req,res){
    res.render('login');
}

async function autenticar(req, res){
    const resp = await UsuarioModel.autenticar(req.body.email, req.body.password);
    if(resp && resp.lenght > 0){
        req.session.user = resp[0];//outro é melhor bgl de senha nesse bloco de autenticar
        //mais alguma coisa aqui
    }else{
        res.redirect('/login');
    }
}

async function logout(req, res){
    delete req.session.user;
    res.redirect('/');
}

module.exports = {login, autenticar, logout}