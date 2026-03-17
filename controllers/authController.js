const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "habitflow_secret_key_2024";

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Crear nuevo usuario
    const usuario = new Usuario({ nombre, email, password });
    await usuario.save();

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const isMatch = await usuario.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
