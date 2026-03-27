const express = require("express");
const router = express.Router();
const habitoController = require("../controllers/habitocontroller");
const authMiddleware = require("../middleware/authMiddleware");

// Aplicar middleware de autenticación a todas las rutas de hábitos
router.use(authMiddleware);

router.post("/", habitoController.crearHabito);
router.get("/", habitoController.obtenerHabitos);
router.put("/:id", habitoController.actualizarHabito);
router.delete("/:id", habitoController.eliminarHabito);
router.patch("/:id/toggle", habitoController.toggleHabito);

module.exports = router;
