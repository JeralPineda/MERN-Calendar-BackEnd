const { response } = require('express');

const crearUsuario = (req, res = response) => {
   res.json({
      msg: 'registro',
   });
};

const loginUsuario = (req, res = response) => {
   res.json({
      msg: 'login',
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
