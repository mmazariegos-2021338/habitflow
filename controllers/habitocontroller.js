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
  try {
    const habitos = await Habito.find();
    res.json(habitos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar hábito
exports.actualizarHabito = async (req, res) => {
  try {
    const habito = await Habito.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(habito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar hábito
exports.eliminarHabito = async (req, res) => {
  try {
    await Habito.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Hábito eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle hábito - maneja la lógica de rachas
exports.toggleHabito = async (req, res) => {
  try {
    const habito = await Habito.findById(req.params.id);

    if (!habito) {
      return res.status(404).json({ error: "Hábito no encontrado" });
    }

    const ahora = new Date();
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    const yesterday = new Date(hoy);
    yesterday.setDate(yesterday.getDate() - 1);

    // Verificar la fecha del último completado
    let fechaUltimo;
    if (habito.fechaUltimoCompletado) {
      fechaUltimo = new Date(habito.fechaUltimoCompletado);
      fechaUltimo = new Date(
        fechaUltimo.getFullYear(),
        fechaUltimo.getMonth(),
        fechaUltimo.getDate()
      );
    }

    if (habito.completado) {
      // Si ya está completado, lo desmarcamos
      // Reducimos la racha pero no低于 0
      habito.completado = false;
      if (habito.racha > 0) {
        habito.racha -= 1;
      }
    } else {
      // Si no está completado, lo marcamos
      // Verificar si es el primer día o si perdió la racha
      if (!fechaUltimo) {
        // Primer vez que completa
        habito.racha = 1;
      } else if (fechaUltimo.getTime() === hoy.getTime()) {
        // Ya completó hoy, no hacer nada
        return res.json(habito);
      } else if (fechaUltimo.getTime() === yesterday.getTime()) {
        // Completó ayer, continuar racha
        habito.racha += 1;
      } else {
        // Pasó más de un día, reiniciar racha
        habito.racha = 1;
      }

      habito.completado = true;
      habito.fechaUltimoCompletado = ahora;
    }

    await habito.save();
    res.json(habito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
