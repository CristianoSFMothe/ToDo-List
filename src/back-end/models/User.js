const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório']
  },
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} não é um e-mail válido!`
    }
  },
  phone: {
    type: String,
    required: [true, 'Número de telefone é obrigatório'],
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v); // Validação básica de telefone
      },
      message: props => `${props.value} não é um número de telefone válido!`
    }
  },
  country: {
    type: String,
    required: [true, 'País é obrigatório']
  },
  framework: {
    type: String,
    required: [true, 'Framework é obrigatório']
  },
  comments: String
});

module.exports = mongoose.model('User', userSchema);