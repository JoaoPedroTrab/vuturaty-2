const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ mensagem: 'Acesso negado. Nenhum token fornecido.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.error('Erro de autenticação:', error);
    res.status(401).json({ mensagem: 'Token inválido' });
  }
};

module.exports = auth;