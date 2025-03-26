import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Montserrat', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: ${theme.colors.darkAccent};
  }

  h1 {
    font-size: ${theme.fontSizes["5xl"]};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes["4xl"]};
    }
  }

  h2 {
    font-size: ${theme.fontSizes["4xl"]};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes["3xl"]};
    }
  }

  h3 {
    font-size: ${theme.fontSizes["3xl"]};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes["2xl"]};
    }
  }

  h4 {
    font-size: ${theme.fontSizes["2xl"]};
  }

  h5 {
    font-size: ${theme.fontSizes.xl};
  }

  h6 {
    font-size: ${theme.fontSizes.lg};
  }

  p {
    margin-bottom: 1rem;
    font-size: ${theme.fontSizes.md};
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};
    transition: ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  ul, ol {
    list-style-position: inside;
    margin-bottom: ${theme.space.md};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  section {
    padding: ${theme.space["3xl"]} 0;
  }

  .container {
    width: 100%;
    max-width: ${theme.sizes.container.xl};
    margin: 0 auto;
    padding: 0 ${theme.space.md};
  }

  /* Utilitários para animações */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Utilitários de espaçamento */
  .mb-1 { margin-bottom: ${theme.space.xs}; }
  .mb-2 { margin-bottom: ${theme.space.sm}; }
  .mb-3 { margin-bottom: ${theme.space.md}; }
  .mb-4 { margin-bottom: ${theme.space.lg}; }
  .mb-5 { margin-bottom: ${theme.space.xl}; }

  .mt-1 { margin-top: ${theme.space.xs}; }
  .mt-2 { margin-top: ${theme.space.sm}; }
  .mt-3 { margin-top: ${theme.space.md}; }
  .mt-4 { margin-top: ${theme.space.lg}; }
  .mt-5 { margin-top: ${theme.space.xl}; }

  .py-1 { padding-top: ${theme.space.xs}; padding-bottom: ${theme.space.xs}; }
  .py-2 { padding-top: ${theme.space.sm}; padding-bottom: ${theme.space.sm}; }
  .py-3 { padding-top: ${theme.space.md}; padding-bottom: ${theme.space.md}; }
  .py-4 { padding-top: ${theme.space.lg}; padding-bottom: ${theme.space.lg}; }
  .py-5 { padding-top: ${theme.space.xl}; padding-bottom: ${theme.space.xl}; }

  .px-1 { padding-left: ${theme.space.xs}; padding-right: ${theme.space.xs}; }
  .px-2 { padding-left: ${theme.space.sm}; padding-right: ${theme.space.sm}; }
  .px-3 { padding-left: ${theme.space.md}; padding-right: ${theme.space.md}; }
  .px-4 { padding-left: ${theme.space.lg}; padding-right: ${theme.space.lg}; }
  .px-5 { padding-left: ${theme.space.xl}; padding-right: ${theme.space.xl}; }

  /* Utilitários de texto */
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-left { text-align: left; }

  /* Utilitários de display */
  .d-flex { display: flex; }
  .d-inline-flex { display: inline-flex; }
  .flex-column { flex-direction: column; }
  .flex-row { flex-direction: row; }
  .justify-content-center { justify-content: center; }
  .justify-content-between { justify-content: space-between; }
  .justify-content-around { justify-content: space-around; }
  .align-items-center { align-items: center; }
  .flex-wrap { flex-wrap: wrap; }
  .flex-nowrap { flex-wrap: nowrap; }

  main {
    padding-top: 70px; /* Espaço para o header fixo */
  }

  /* Estilos para ScrollBar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundAlt};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryDark};
  }
`;

export default GlobalStyle;
