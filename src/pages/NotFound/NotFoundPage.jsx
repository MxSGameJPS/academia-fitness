import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "../../components/ui/Button";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space.xl};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ErrorCode = styled(motion.h1)`
  font-size: 10rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 6rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  margin-bottom: ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 500px;
  margin-bottom: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ButtonWrapper = styled(motion.div)`
  margin-top: ${({ theme }) => theme.space.md};
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <ErrorCode
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </ErrorCode>

      <Title
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Página não encontrada
      </Title>

      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        A página que você está procurando não existe ou foi removida.
      </Description>

      <ButtonWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button as={Link} to="/" $variant="primary" $iconOnly={false}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Voltar para Home
        </Button>
      </ButtonWrapper>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
