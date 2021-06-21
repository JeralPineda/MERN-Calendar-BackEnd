const { response } = require('express');

const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {
   const { name, email, password } = req.body;

   try {
      const usuario = new Usuario(req.body);

      //    grabar en base de datos
      await usuario.save();

      res.status(201).json({
         ok: true,
         msg: 'registro',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

const loginUsuario = (req, res = response) => {
   const { email, password } = req.body;
   res.json({
      ok: true,
      msg: 'login',
      email,
      password,
   });
};

const revalidarToken = (req, res = response) => {
   res.json({
      msg: 'revalidar',
   });
};

module.exports = {
   crearUsuario,
   loginUsuario,
   revalidarToken,
};
