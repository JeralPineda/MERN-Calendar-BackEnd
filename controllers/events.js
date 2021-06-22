const { response } = require('express');

const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
   try {
      const eventos = await Evento.find().populate('user', 'name');

      res.json({
         ok: true,
         eventos,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

const crearEvento = async (req, res = response) => {
   const evento = new Evento(req.body);

   try {
      // Obtener el id del usuario del token
      evento.user = req.uid;

      //    Guardar en la DB
      const eventoGuardado = await evento.save();

      res.status(201).json({
         ok: true,
         evento: eventoGuardado,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

const actualizarEvento = (req, res = response) => {
   res.json({
      ok: true,
      msg: 'Actualizar evento',
   });
};

const eliminarEvento = (req, res = response) => {
   res.json({
      ok: true,
      msg: 'Eliminar evento',
   });
};

module.exports = {
   getEventos,
   crearEvento,
   actualizarEvento,
   eliminarEvento,
};
