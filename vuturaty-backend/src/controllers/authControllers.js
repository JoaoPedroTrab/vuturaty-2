const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.registro = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  const { nomeCompleto, email, senha, telefone, dataNascimento, tipoUsuario, ramoEscoteiro, numeroIdentificacaoEscoteira } = req.body;
  const endereco = JSON.parse(req.body.endereco);

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ mensagem: 'Usuário já existe' });
    }

    usuario = new Usuario({
      nomeCompleto,
      email,
      senha,
      telefone,
      dataNascimento,
      endereco,
      tipoUsuario,
      ramoEscoteiro,
      numeroIdentificacaoEscoteira,
      fotoPerfil: req.file ? req.file.filename : 'default.jpg'
    });

    await usuario.save();

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: usuario._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      refreshToken,
      usuario: {
        id: usuario._id,
        nomeCompleto: usuario.nomeCompleto,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario
      }
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};

exports.login = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas' });
    }

    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: usuario._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      refreshToken,
      usuario: {
        id: usuario._id,
        nomeCompleto: usuario.nomeCompleto,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario
      }
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};

exports.logout = (req, res) => {
  // Aqui você pode implementar a lógica para invalidar o token no servidor, se necessário
  // Por exemplo, você pode adicionar o token a uma lista negra
  res.json({ mensagem: 'Logout realizado com sucesso' });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ mensagem: 'Refresh Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const newToken = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: newToken });
  } catch (erro) {
    console.error(erro);
    res.status(400).json({ mensagem: 'Refresh Token inválido' });
  }
};

exports.getUsuarioAtual = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-senha');
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};

exports.atualizarPerfil = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  try {
    let usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    // Campos que podem ser atualizados
    const camposAtualizaveis = ['nomeCompleto', 'telefone', 'endereco', 'ramoEscoteiro', 'numeroIdentificacaoEscoteira'];
    
    camposAtualizaveis.forEach(campo => {
      if (req.body[campo] !== undefined) {
        usuario[campo] = req.body[campo];
      }
    });

    // Atualizar foto de perfil se fornecida
    if (req.file) {
      usuario.fotoPerfil = req.file.filename;
    }

    await usuario.save();

    res.json({
      mensagem: 'Perfil atualizado com sucesso',
      usuario: {
        id: usuario._id,
        nomeCompleto: usuario.nomeCompleto,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
        fotoPerfil: usuario.fotoPerfil
      }
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor ao atualizar perfil' });
  }
};