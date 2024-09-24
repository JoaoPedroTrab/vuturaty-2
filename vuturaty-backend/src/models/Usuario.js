const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const enderecoSchema = new mongoose.Schema({
  cep: {
    type: String,
    required: [true, 'CEP é obrigatório'],
    match: [/^\d{5}-?\d{3}$/, 'Formato de CEP inválido']
  },
  logradouro: String,
  numero: {
    type: String,
    required: [true, 'Número é obrigatório']
  },
  complemento: String,
  bairro: String,
  cidade: String,
  estado: String
});

const usuarioSchema = new mongoose.Schema({
  nomeCompleto: {
    type: String,
    required: [true, 'Nome completo é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [8, 'A senha deve ter no mínimo 8 caracteres']
  },
  telefone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
    match: [/^(\+55|0)\s?(\d{2}|\d{0})(\s?\d{4,5}[-\s]?\d{4})$/, 'Formato de telefone inválido']
  },
  dataNascimento: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatória']
  },
  endereco: {
    type: enderecoSchema,
    required: [true, 'Endereço é obrigatório']
  },
  tipoUsuario: {
    type: String,
    enum: ['Pai', 'Escotista', 'Chefe Escotista'],
    required: [true, 'Tipo de usuário é obrigatório']
  },
  ramoEscoteiro: {
    type: String,
    enum: ['Lobinho', 'Escoteiro', 'Sênior', 'Pioneiro', 'Não aplicável'],
    default: 'Não aplicável'
  },
  numeroIdentificacaoEscoteira: {
    type: String,
    unique: true,
    sparse: true
  },
  permissoes: {
    type: [String],
    default: function() {
      switch(this.tipoUsuario) {
        case 'Pai':
          return ['visualizar_atividades', 'visualizar_calendario'];
        case 'Escotista':
          return ['visualizar_atividades', 'visualizar_calendario', 'criar_atividades'];
        case 'Chefe Escotista':
          return ['visualizar_atividades', 'visualizar_calendario', 'criar_atividades', 'gerenciar_usuarios'];
        default:
          return [];
      }
    }
  },
  fotoPerfil: {
    type: String,
    default: 'default.jpg'
  }
}, {
  timestamps: true
});

usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 12);
  next();
});

usuarioSchema.methods.compararSenha = async function(senhaCandidata) {
  return await bcrypt.compare(senhaCandidata, this.senha);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;