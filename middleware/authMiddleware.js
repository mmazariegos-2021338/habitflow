const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "habitflow_secret_key_2024";

// Middleware para verificar el token JWT
const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No se proporcionó token de autenticación" });
    }

    // Verificar formato "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Formato de token inválido" });
    }

    const token = parts[1];

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Agregar la información del usuario al request
    req.usuario = decoded;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token inválido" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    }
    return res.status(500).json({ error: "Error al verificar el token" });
  }
};

module.exports = authMiddleware;