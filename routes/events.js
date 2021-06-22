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

//Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', validarJWT, getEventos);

// Crear un nuevo evento
router.post(
   '/',
   [
      check(),
      validarCampos, //
   ],
   crearEvento
);

// Actualizar evento
router.put(
   '/:id',
   [
      check(),
      validarCampos, //
   ],
   actualizarEvento
);

// Borrar evento
router.delete(
   '/:id',
   [
      check(),
      validarCampos, //
   ],
   eliminarEvento
);

module.exports = router;
