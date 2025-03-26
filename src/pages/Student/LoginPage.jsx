import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaArrowLeft, FaUserAlt } from "react-icons/fa";
import { useStudentStore } from "../../store/studentStore";
import { Button } from "../../components/ui/Button";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
    url("/images/bg-login.jpg");
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  overflow: hidden;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => theme.colors.darkAccent};

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 1rem;
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.darkAccent};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.error : "rgba(0, 0, 0, 0.1)")};
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 2.4rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  margin-top: 1.5rem;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const { isAuthenticated, login, error, clearError } = useStudentStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Se já estiver autenticado, redireciona para o dashboard
    if (isAuthenticated) {
      navigate("/aluno");
    }

    // Limpa erros anteriores
    clearError();
  }, [isAuthenticated, navigate, clearError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Limpa mensagens de erro ao digitar
    if (formError) setFormError("");
    if (error) clearError();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.username || !formData.password) {
      setFormError("Por favor, preencha todos os campos");
      return;
    }

    // Tenta fazer login
    const success = login(formData.username, formData.password);

    if (success) {
      navigate("/aluno");
    }
  };

  return (
    <PageContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <FaUserAlt />
          <h1>
            Power<span>Fit</span>
          </h1>
        </Logo>

        <LoginHeader>
          <h2>Área do Aluno</h2>
          <p>Entre com seus dados para acessar</p>
        </LoginHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Nome de Usuário</Label>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Ex: ALUNO123"
              value={formData.username}
              onChange={handleChange}
              error={formError && !formData.username}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Sua senha"
              value={formData.password}
              onChange={handleChange}
              error={formError && !formData.password}
            />
          </FormGroup>

          {(formError || error) && (
            <ErrorMessage>{formError || error}</ErrorMessage>
          )}

          <Button $fullWidth type="submit">
            Entrar
          </Button>
        </Form>

        <BackLink to="/">
          <FaArrowLeft /> Voltar para o site
        </BackLink>
      </LoginCard>
    </PageContainer>
  );
};

export default LoginPage;
