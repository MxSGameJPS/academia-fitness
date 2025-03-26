import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "./Button";
import { useContactStore } from "../../store/contactStore";
import { v4 as uuidv4 } from "uuid";

const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.light};
  transition: ${({ theme }) => theme.transitions.default};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.light};
  transition: ${({ theme }) => theme.transitions.default};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.light};
  transition: ${({ theme }) => theme.transitions.default};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const SuccessMessage = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 1rem;
`;

const ErrorMessage = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 1rem;
`;

const ContactForm = () => {
  const addContact = useContactStore((state) => state.addContact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Informações gerais",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Por favor, informe seu nome");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Por favor, informe seu email");
      return false;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, informe um email válido");
      return false;
    }

    if (!formData.message.trim()) {
      setError("Por favor, informe sua mensagem");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    // Adicionar contato à store
    const newContact = {
      id: uuidv4(),
      ...formData,
      date: new Date().toISOString(),
      status: "novo",
    };

    addContact(newContact);

    // Limpar formulário
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Informações gerais",
      message: "",
    });

    // Mostrar mensagem de sucesso
    setSubmitted(true);

    // Esconder a mensagem após 5 segundos
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <FormContainer>
      <FormTitle>Envie sua mensagem</FormTitle>

      {submitted && (
        <SuccessMessage
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          Mensagem enviada com sucesso! Em breve entraremos em contato.
        </SuccessMessage>
      )}

      {error && (
        <ErrorMessage
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </ErrorMessage>
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Nome completo*</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email*</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="subject">Assunto</Label>
          <Select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="Informações gerais">Informações gerais</option>
            <option value="Planos e preços">Planos e preços</option>
            <option value="Aulas e horários">Aulas e horários</option>
            <option value="Suporte técnico">Suporte técnico</option>
            <option value="Reclamação">Reclamação</option>
            <option value="Outros">Outros</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Mensagem*</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Digite sua mensagem"
            rows={5}
          />
        </FormGroup>

        <Button type="submit" color="primary">
          Enviar mensagem
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;
