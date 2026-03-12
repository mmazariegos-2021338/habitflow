const mongoose = require("mongoose");

const habitoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: String,
  diasCompletados: {
    type: Number,
    default: 0,
  },
  completadoHoy: {
    type: Boolean,
    default: false,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Habito", habitoSchema);
