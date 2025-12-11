// back/src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Token faltante" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario en la base de datos
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ msg: "Usuario no encontrado" });
    }

    // Guardamos el usuario completo, no solo el ID, me quede aca el 9/12 nota mental
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};
