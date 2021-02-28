const { Router } = require('express');
const { check } = require('express-validator');
const {
  usuariosGet,
  usuarioGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios.controller');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator.helper');
const { validarCampos } = require('../middlewares/validar-campos.middleware');

const router = Router();

router.get('/', usuariosGet);

router.get('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuarioGet);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('password', 'El password debe ser de más de 6 dígitos').isLength({min: 6}),
  //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(esRoleValido),
  check('correo').custom(emailExiste),
  validarCampos,
], usuariosPost);

router.put('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
],usuariosPut);

router.delete('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;