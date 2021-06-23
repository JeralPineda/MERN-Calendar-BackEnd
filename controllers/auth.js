const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
   const { email, password } = req.body;

   try {
      let usuario = await Usuario.findOne({ email });

      //   verificar que el usuario existe
      if (usuario) {
         return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con este correo',
         });
      }

      usuario = new Usuario(req.body);

      //   Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);

      //    grabar en base de datos
      await usuario.save();

      //   Generar el JWT
      const token = await generarJWT(usuario.id, usuario.name);

      res.status(201).json({
         ok: true,
         uid: usuario.id,
         name: usuario.name,
         token,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

const loginUsuario = async (req, res = response) => {
   const { email, password } = req.body;

   try {
      const usuario = await Usuario.findOne({ email });

      //   verificar que el usuario existe
      if (!usuario) {
         return res.status(400).json({
            ok: false,
            msg: 'El usuario o la contraseña es incorrecto',
         });
      }

      // Confirmar las contraseñas
      const validPaswword = bcrypt.compareSync(password, usuario.password);

      if (!validPaswword) {
         return res.status(400).json({
            ok: false,
            msg: 'El usuario o la contraseña es incorrecto',
         });
      }

      //   Generar el JWT
      const token = await generarJWT(usuario.id, usuario.name);

      res.json({
         ok: true,
         uid: usuario.id,
         name: usuario.name,
         token,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

const revalidarToken = async (req, res = response) => {
   const { uid, name } = req;

   //    Generar un nuevo JWT y retornarlo en esta nueva petición
   const token = await generarJWT(uid, name);

   res.json({
      ok: true,
      token,
      uid,
      name,
   });
};

module.exports = {
   crearUsuario,
   loginUsuario,
   revalidarToken,
};
