const Habito = require("../models/Habito");

// Crear hábito
exports.crearHabito = async (req, res) => {
  try {
    const habito = new Habito(req.body);
    await habito.save();
    res.json(habito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener hábitos
exports.obtenerHabitos = async (req, res) => {
  const habitos = await Habito.find();
  res.json(habitos);
};

// Actualizar hábito
exports.actualizarHabito = async (req, res) => {
  const habito = await Habito.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(habito);
};

// Eliminar hábito
exports.eliminarHabito = async (req, res) => {
  await Habito.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Hábito eliminado" });
};
