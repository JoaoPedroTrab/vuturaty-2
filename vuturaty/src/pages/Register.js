import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    dataNascimento: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',    
      bairro: '',
      cidade: '',
      estado: ''
    },
    tipoUsuario: '',
    ramoEscoteiro: '',
    numeroIdentificacaoEscoteira: '',
    fotoPerfil: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, fotoPerfil: e.target.files[0] }));
  };

  const validateStep = () => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.nomeCompleto) newErrors.nomeCompleto = 'Nome completo é obrigatório';
        if (!formData.email) newErrors.email = 'Email é obrigatório';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email inválido';
        if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
        else if (formData.senha.length < 8) newErrors.senha = 'A senha deve ter no mínimo 8 caracteres';
        if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'As senhas não coincidem';
        break;
      case 2:
        if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
        if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória';
        if (!formData.endereco.cep) newErrors['endereco.cep'] = 'CEP é obrigatório';
        if (!formData.endereco.numero) newErrors['endereco.numero'] = 'Número é obrigatório';
        break;
      case 3:
        if (!formData.tipoUsuario) newErrors.tipoUsuario = 'Tipo de usuário é obrigatório';
        if (formData.tipoUsuario !== 'Pai' && !formData.ramoEscoteiro) newErrors.ramoEscoteiro = 'Ramo escoteiro é obrigatório';
        if (formData.tipoUsuario !== 'Pai' && !formData.numeroIdentificacaoEscoteira) newErrors.numeroIdentificacaoEscoteira = 'Número de Identificação Escoteira é obrigatório';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setLoading(true);
      setError('');
      setErrors({});
      const data = new FormData();
      for (const key in formData) {
        if (key === 'endereco') {
          data.append('endereco', JSON.stringify(formData.endereco));
        } else if (key === 'fotoPerfil') {
          if (formData.fotoPerfil) {
            data.append('fotoPerfil', formData.fotoPerfil);
          }
        } else {
          data.append(key, formData[key]);
        }
      }

      try {
        const response = await axios.post('http://localhost:5000/api/auth/registro', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Registro bem-sucedido:', response.data);
        navigate('/login', { state: { message: 'Registro realizado com sucesso! Faça login para continuar.' } });
      } catch (error) {
        console.error('Erro no registro:', error.response?.data || error.message);
        if (error.response?.data?.erros) {
          const newErrors = {};
          error.response.data.erros.forEach(err => {
            newErrors[err.param] = err.msg;
          });
          setErrors(newErrors);
        } else {
          setError(error.response?.data?.mensagem || 'Ocorreu um erro durante o registro. Por favor, tente novamente.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              placeholder="Nome Completo"
              className="input-field"
            />
            {errors.nomeCompleto && <p className="error-message">{errors.nomeCompleto}</p>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Senha"
              className="input-field"
            />
            {errors.senha && <p className="error-message">{errors.senha}</p>}
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirmar Senha"
              className="input-field"
            />
            {errors.confirmarSenha && <p className="error-message">{errors.confirmarSenha}</p>}
          </>
        );
      case 2:
        return (
          <>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Telefone"
              className="input-field"
            />
            {errors.telefone && <p className="error-message">{errors.telefone}</p>}
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              className="input-field"
            />
            {errors.dataNascimento && <p className="error-message">{errors.dataNascimento}</p>}
            <input
              type="text"
              name="endereco.cep"
              value={formData.endereco.cep}
              onChange={handleChange}
              placeholder="CEP"
              className="input-field"
            />
            {errors['endereco.cep'] && <p className="error-message">{errors['endereco.cep']}</p>}
            <input
              type="text"
              name="endereco.logradouro"
              value={formData.endereco.logradouro}
              onChange={handleChange}
              placeholder="Logradouro"
              className="input-field"
            />
            <input
              type="text"
              name="endereco.numero"
              value={formData.endereco.numero}
              onChange={handleChange}
              placeholder="Número"
              className="input-field"
            />
            {errors['endereco.numero'] && <p className="error-message">{errors['endereco.numero']}</p>}
            <input
              type="text"
              name="endereco.complemento"
              value={formData.endereco.complemento}
              onChange={handleChange}
              placeholder="Complemento"
              className="input-field"
            />
            <input
              type="text"
              name="endereco.bairro"
              value={formData.endereco.bairro}
              onChange={handleChange}
              placeholder="Bairro"
              className="input-field"
            />
            <input
              type="text"
              name="endereco.cidade"
              value={formData.endereco.cidade}
              onChange={handleChange}
              placeholder="Cidade"
              className="input-field"
            />
            <input
              type="text"
              name="endereco.estado"
              value={formData.endereco.estado}
              onChange={handleChange}
              placeholder="Estado"
              className="input-field"
            />
          </>
        );
      case 3:
        return (
          <>
            <select
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Selecione o tipo de usuário</option>
              <option value="Pai">Pai</option>
              <option value="Escotista">Escotista</option>
              <option value="Chefe Escotista">Chefe Escotista</option>
            </select>
            {errors.tipoUsuario && <p className="error-message">{errors.tipoUsuario}</p>}
            {formData.tipoUsuario !== 'Pai' && (
              <>
                <select
                  name="ramoEscoteiro"
                  value={formData.ramoEscoteiro}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Selecione o ramo escoteiro</option>
                  <option value="Lobinho">Lobinho</option>
                  <option value="Escoteiro">Escoteiro</option>
                  <option value="Sênior">Sênior</option>
                  <option value="Pioneiro">Pioneiro</option>
                </select>
                {errors.ramoEscoteiro && <p className="error-message">{errors.ramoEscoteiro}</p>}
                <input
                  type="text"
                  name="numeroIdentificacaoEscoteira"
                  value={formData.numeroIdentificacaoEscoteira}
                  onChange={handleChange}
                  placeholder="Número de Identificação Escoteira"
                  className="input-field"
                />
                {errors.numeroIdentificacaoEscoteira && <p className="error-message">{errors.numeroIdentificacaoEscoteira}</p>}
              </>
            )}
            <input
              type="file"
              name="fotoPerfil"
              onChange={handleFileChange}
              className="input-field"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary-blue-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-neutral-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary-blue-dark">
            Criar uma conta no Vuturaty
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Etapa {step} de 3
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {renderStep()}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-blue-main bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue-light"
              >
                Voltar
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-blue-main hover:bg-primary-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue-light"
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-blue-main hover:bg-primary-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue-light"
              >
                {loading ? 'Registrando...' : 'Registrar'}
              </button>
            )}
          </div>
        </form>
        <div className="text-center">
          <Link to="/login" className="font-medium text-primary-blue-main hover:text-primary-blue-dark">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;