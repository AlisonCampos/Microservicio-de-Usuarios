const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Registrar nuevo usuario
router.post('/register', async (req, res) => {
  const { username, password, securityQuestion, securityAnswer } = req.body;
  try {
    const user = new User({ username, password, securityQuestion, securityAnswer });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Obtener pregunta de seguridad
router.post('/get-security-question', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json({ securityQuestion: user.securityQuestion });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Recuperar contraseña mediante pregunta de seguridad
router.post('/forgot-password', async (req, res) => {
  const { username, securityAnswer, newPassword } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });

    // Comparamos la respuesta de seguridad
    const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);
    if (!isMatch) return res.status(401).json({ error: 'Respuesta de seguridad incorrecta.' });

    user.password = newPassword; // Esto hará que se hashee por el pre('save')
    await user.save();
    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Obtener lista de usuarios (sin datos sensibles)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, securityAnswer: 0, __v: 0, _id: 0 });
    res.json(users);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta.' });

    res.json({ message: 'Login exitoso.' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;