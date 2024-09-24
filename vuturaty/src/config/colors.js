// src/config/colors.js
const colors = {
  primary: {
    blue: {
      dark: '#1E3A8A',  // Um azul marinho mais profundo
      main: '#2563EB',  // Um azul vibrante mas não muito brilhante
      light: '#60A5FA', // Um azul claro para hover e destaques
    },
    yellow: {
      main: '#FCD34D',  // Mantivemos o amarelo original
      light: '#FDE68A', // Um amarelo mais claro para hover
    },
  },
  neutral: {
    white: '#FFFFFF',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  accent: {
    green: '#10B981', // Um verde para elementos de sucesso ou ação positiva
    red: '#EF4444',   // Um vermelho para erros ou alertas
  },
};

export default colors;

/*
Use primary-blue-main para elementos principais de ação e destaques.
Use primary-yellow-main para chamar atenção para elementos secundários importantes.
Use a escala de cinza para texto e elementos de fundo.
Use as cores de acento com moderação para feedback e ações importantes.
*/