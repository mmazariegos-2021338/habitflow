const express = require("express");
const router = express.Router();
const habitoController = require("../controllers/habitocontroller");

router.post("/", habitoController.crearHabito);
router.get("/", habitoController.obtenerHabitos);
router.put("/:id", habitoController.actualizarHabito);
router.delete("/:id", habitoController.eliminarHabito);

module.exports = router;
