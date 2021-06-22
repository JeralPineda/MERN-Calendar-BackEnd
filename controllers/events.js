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

const actualizarEvento = async (req, res = response) => {
   // obtener el id desde el url
   const eventoId = req.params.id;
   const { uid } = req; //extraemos el uid

   try {
      const evento = await Evento.findById(eventoId);

      //   Verificar que el evento existe
      if (!evento) {
         res.status(404).json({
            ok: false,
            msg: 'Evento no existe por ese id',
         });
      }

      //   Verificar si la persona que creo el evento es el mismo que lo desea actualizar
      if (evento.user.toString() !== uid) {
         res.status(401).json({
            ok: false,
            msg: 'No tiene privilegio de editar este evento',
         });
      }

      const nuevoEvento = {
         ...req.body,
         user: uid,
      };

      //   Actualizamos el evento
      const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

      // new: true => es para que devuelva el evento actualizado que se acab de ingresar y no el anterior, que lo muestra por defecto para comparación

      res.json({
         ok: true,
         evento: eventoActualizado,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
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
