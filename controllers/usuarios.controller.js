const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { check } = require('express-validator');

const usuariosGet =  async(req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [ total, usuarios ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);
  res.json({
    total,
    usuarios
  });

};

const usuarioGet =  async(req = request, res = response) => {

  const { id } = req.params;

  const usuario = await Usuario.findById(id);
  res.json(usuario);

};

const usuariosPost = async(req = request, res = response) => {

  const { nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en DB
  await usuario.save();
  
  res.json({
    usuario
  })
};

const usuariosPut = async(req = request, res = response) => {
  const { id } = req.params;
  console.log(id)
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosDelete = async(req = request, res = response) => {

  const { id } = req.params;

  // Físicamente lo borra de la BD
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });



  res.json(usuario);

};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'patch API - controlador'
  })
};

module.exports = {
  usuariosGet,
  usuarioGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch
};