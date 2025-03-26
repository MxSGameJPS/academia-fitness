import React from "react";
import styled, { css } from "styled-components";

const ButtonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.light};
    border: 2px solid ${({ theme }) => theme.colors.secondary};

    &:hover {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.secondary};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.light};
    }
  `,
  text: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `,
  accent: css`
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.light};
    border: 2px solid ${({ theme }) => theme.colors.accent};

    &:hover {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.accent};
    }
  `,
  light: css`
    background-color: rgba(255, 255, 255, 0.9);
    color: ${({ theme }) => theme.colors.darkAccent};
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background-color: white;
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.light};
    border: 2px solid ${({ theme }) => theme.colors.danger};

    &:hover {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.danger};
    }
  `,
};

const ButtonSizes = {
  small: css`
    font-size: ${({ theme }) => theme.fontSizes?.sm || "0.8rem"};
    padding: 0.4rem 0.8rem;
  `,
  sm: css`
    font-size: ${({ theme }) => theme.fontSizes?.sm || "0.8rem"};
    padding: 0.5rem 1rem;
  `,
  md: css`
    font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
    padding: 0.75rem 1.5rem;
  `,
  lg: css`
    font-size: ${({ theme }) => theme.fontSizes?.lg || "1.2rem"};
    padding: 1rem 2rem;
  `,
};

// Filtrar propriedades que não devem ir para o DOM
const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => {
    // Filtra props transientes (que começam com $) e props específicas do componente
    return (
      !prop.startsWith("$") &&
      !["variant", "size", "fullWidth", "iconOnly", "color", "isOpen"].includes(
        prop
      )
    );
  },
})`
  font-family: ${({ theme }) => theme.fonts?.primary || "inherit"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || "500"};
  border-radius: ${({ theme }) => theme.borderRadius?.md || "4px"};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions?.default || "all 0.3s ease"};
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  box-shadow: ${({ theme }) =>
    theme.shadows?.sm || "0 1px 3px rgba(0,0,0,0.1)"};

  ${({ variant, $variant, color, $color, theme }) =>
    ButtonVariants[variant || $variant || color || $color] ||
    ButtonVariants.primary}

  ${({ size, $size, theme }) => ButtonSizes[size || $size] || ButtonSizes.md}
  
  ${({ fullWidth, $fullWidth }) =>
    (fullWidth || $fullWidth) &&
    css`
      width: 100%;
    `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    margin-right: ${({ iconOnly, $iconOnly }) =>
      iconOnly || $iconOnly ? "0" : "0.5rem"};
  }
`;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  fullWidth = false,
  icon = null,
  iconOnly = false,
  color, // Alias para variant
  $color,
  $size,
  $variant,
  $fullWidth,
  $iconOnly,
  ...rest
}) => {
  // Suporte para props comuns e transientes ($)
  const finalProps = {
    type,
    variant: $variant || variant,
    size: $size || size,
    fullWidth: $fullWidth || fullWidth,
    iconOnly: $iconOnly || iconOnly,
    color: $color || color,
    ...rest,
  };

  return (
    <StyledButton {...finalProps}>
      {icon && icon}
      {!finalProps.iconOnly && children}
    </StyledButton>
  );
};

export { Button };
export default Button;
