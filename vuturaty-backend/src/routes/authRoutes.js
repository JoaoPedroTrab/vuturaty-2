const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authControllers');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/registro',
  upload.single('fotoPerfil'),
  [
    body('nomeCompleto').notEmpty().withMessage('Nome completo é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres'),
    body('telefone').matches(/^(\+55|0)\s?(\d{2}|\d{0})(\s?\d{4,5}[-\s]?\d{4})$/).withMessage('Telefone inválido'),
    body('dataNascimento').isISO8601().toDate().withMessage('Data de nascimento inválida'),
    body('endereco').custom((value) => {
      const endereco = JSON.parse(value);
      if (!endereco.cep || !endereco.cep.match(/^\d{5}-?\d{3}$/)) {
        throw new Error('CEP inválido');
      }
      if (!endereco.numero) {
        throw new Error('Número do endereço é obrigatório');
      }
      return true;
    }),
    body('tipoUsuario').isIn(['Pai', 'Escotista', 'Chefe Escotista']).withMessage('Tipo de usuário inválido'),
    body('ramoEscoteiro').optional().isIn(['Lobinho', 'Escoteiro', 'Sênior', 'Pioneiro', 'Não aplicável']).withMessage('Ramo escoteiro inválido'),
  ],
  authController.registro
);

router.post('/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória'),
  ],
  authController.login
);

router.post('/logout', auth, authController.logout);

router.post('/refresh-token', authController.refreshToken);

// Certifique-se de que authController.getUsuarioAtual está definido
router.get('/me', auth, authController.getUsuarioAtual);

// Nova rota para atualização de perfil com upload de foto
router.put('/atualizar-perfil', 
  auth, 
  upload.single('fotoPerfil'),
  [
    body('nomeCompleto').optional().notEmpty().withMessage('Nome completo não pode ser vazio'),
    body('telefone').optional().matches(/^(\+55|0)\s?(\d{2}|\d{0})(\s?\d{4,5}[-\s]?\d{4})$/).withMessage('Telefone inválido'),
    // Adicione outras validações conforme necessário
  ],
  authController.atualizarPerfil
);

module.exports = router;