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

// Configuración para que se muestre solo la información que necesito ver
EventoSchema.method('toJSON', function () {
   const { __v, _id, ...object } = this.toObject(); //Referencia a todo el objeto
   object.id = _id; // Remplazo en el object

   return object;
});

module.exports = model('Evento', EventoSchema);
