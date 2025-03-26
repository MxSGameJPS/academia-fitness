const theme = {
  colors: {
    primary: "#FF4E50", // Vermelho vibrante
    secondary: "#FC913A", // Laranja vibrante
    tertiary: "#F9D423", // Amarelo vibrante
    accent: "#36B1BF", // Azul-turquesa
    darkAccent: "#2C3E50", // Azul escuro
    light: "#FFFFFF", // Branco
    dark: "#1A1A1A", // Preto suave
    gray: "#E5E5E5", // Cinza claro
    darkGray: "#666666", // Cinza escuro
    success: "#4CAF50", // Verde
    error: "#F44336", // Vermelho erro
    warning: "#FF9800", // Laranja aviso
    info: "#2196F3", // Azul informação
    background: "#F8F9FA",
    textPrimary: "#2C3E50",
    textSecondary: "#6C757D",
  },

  fonts: {
    primary: "'Montserrat', sans-serif",
    secondary: "'Poppins', sans-serif",
    heading: "'Montserrat', sans-serif",
    body: "'Poppins', sans-serif",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
  },

  sizes: {
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },

  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  },

  borderRadius: {
    none: "0",
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    none: "none",
  },

  transitions: {
    default: "all 0.3s ease",
    slow: "all 0.6s ease",
    fast: "all 0.1s ease",
  },

  zIndices: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

export default theme;
