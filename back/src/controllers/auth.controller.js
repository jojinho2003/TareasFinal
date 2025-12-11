const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Registro de usuario
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    await user.save();

    return res.status(201).json({ msg: "Usuario registrado correctamente" });

  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

/**
 * Login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

return res.json({
  msg: "Login exitoso",
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email
  }
});


  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

/**
 * Obtener usuario logueado
 */
exports.getMe = async (req, res) => {
  try {
    // tu middleware ya mete el usuario completo acá
    if (!req.user) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    return res.json(req.user);

  } catch (error) {
    console.error("Error en getMe:", error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};



