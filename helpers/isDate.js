const moment = require('moment');

const isDate = (value) => {
   if (!value) {
      //    Si es false el campo no es correcto
      return false;
   }

   const fecha = moment(value);
   if (fecha.isValid) {
      return true;
   } else {
      return false;
   }
};

module.exports = {
   isDate,
};
