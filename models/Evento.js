const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
   title: {
      type: String,
      required: true,
   },
   notes: {
      type: String,
   },
   start: {
      type: Date,
      required: true,
   },
   end: {
      type: Date,
      required: true,
   },
   user: {
      //Relación
      type: Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true,
   },
});

module.exports = model('Evento', EventoSchema);
