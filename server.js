require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- AÑADE ESTO
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // <-- Y ESTO
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error('Error conectando a MongoDB Atlas:', err));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Microservicio de usuarios funcionando');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});