const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario existe
    let usuario = await User.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Crear usuario nuevo
    const hashedPassword = await bcrypt.hash(password, 10);

    usuario = new User({
      name,
      email,
      password: hashedPassword
    });

    await usuario.save();

    res.json({ msg: "Usuario registrado correctamente" });

  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      msg: "Login exitoso",
      token
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
