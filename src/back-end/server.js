const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
require('dotenv').config(); // Para usar variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use(cors());
app.use(bodyParser.json());

// Rota para salvar o usuário
app.post('/api/users', async (req, res) => {
  const { name, email, phone, country, framework, comments } = req.body;
  const newUser = new User({ name, email, phone, country, framework, comments });

  try {
    await newUser.save();
    res.status(201).send('Usuário salvo com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao salvar o usuário: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
