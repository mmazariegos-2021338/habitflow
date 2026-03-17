const mongoose = require("mongoose");

const habitoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: String,
  racha: {
    type: Number,
    default: 0,
  },
  completado: {
    type: Boolean,
    default: false,
  },
  fechaUltimoCompletado: {
    type: Date,
    default: null,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

module.exports = mongoose.model("Habito", habitoSchema);
