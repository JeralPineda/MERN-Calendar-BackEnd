/*
    Events Routes
    host: api/events/
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Obtener eventos
router.get('/', validarJWT, getEventos);

// Crear un nuevo evento
router.post(
   '/',
   [
      validarJWT, //
      check(),
      validarCampos,
   ],
   crearEvento
);

// Actualizar evento
router.put(
   '/:id',
   [
      validarJWT, //
      check(),
      validarCampos,
   ],
   actualizarEvento
);

// Borrar evento
router.delete(
   '/:id',
   [
      validarJWT, //
      check(),
      validarCampos,
   ],
   eliminarEvento
);

module.exports = router;
