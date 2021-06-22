const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
   title: {
      type: String,
      require: true,
   },
   notes: {
      type: String,
   },
   start: {
      type: Date,
      require: true,
   },
   end: {
      type: Date,
      require: true,
   },
   user: {
      //Relación
      type: Schema.Types.ObjectId,
      ref: 'Usuarios',
   },
});

module.exports = model('Evento', EventoSchema);
