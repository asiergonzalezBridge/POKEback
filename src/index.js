
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productsRoute = require('./routes/productsRoute');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productsRoute);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a PokéBack API' });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});