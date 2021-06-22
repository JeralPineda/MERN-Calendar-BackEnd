/*
    Events Routes
    host: api/events/
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

//Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', validarJWT, getEventos);

// Crear un nuevo evento
router.post(
   '/',
   [
      check('title', 'El titulo es obligatorio').not().isEmpty(),
      check('start', 'Fecha inicio es obligatoria').custom(isDate),
      check('end', 'Fecha de finalización es obligatoria').custom(isDate),
      validarCampos, //
   ],
   crearEvento
);

// Actualizar evento
router.put(
   '/:id',
   [
      check('title', 'El titulo es obligatorio').not().isEmpty(),
      check('start', 'Fecha inicio es obligatoria').custom(isDate),
      check('end', 'Fecha de finalización es obligatoria').custom(isDate),
      check('id', 'No es un id de Mongo valido').isMongoId(),
      validarCampos, //
   ],
   actualizarEvento
);

// Borrar evento
router.delete(
   '/:id',
   [
      check('id', 'No es un id de Mongo valido').isMongoId(),
      validarCampos, //
   ],
   eliminarEvento
);

module.exports = router;
