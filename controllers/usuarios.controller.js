const { request, response } = require('express');

const usuariosGet =  (req = request, res = response) => {

  const { q, nombre, apikey } = req.query;
  res.json({
    ok: true,
    msg: 'get API - controlador',
    q,
    nombre,
    apikey
  });
};

const usuariosPost = (req = request, res = response) => {

  // const body = req.body;
  const { nombre, edad } = req.body;
  res.json({
    ok: true,
    msg: 'post API - controlador',
    //body
    nombre,
    edad
  })
};

const usuariosPut =  (req = request, res = response) => {
  const { id } = req.params
  res.json({
    ok: true,
    msg: 'put API - controlador',
    id
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'delete API - controlador'
  })
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'patch API - controlador'
  })
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch
};