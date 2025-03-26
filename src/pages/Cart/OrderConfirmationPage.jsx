import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { 
  FaCheckCircle, 
  FaShoppingBag, 
  FaHome, 
  FaArrowRight,
  FaWhatsapp
} from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";

const ConfirmationContainer = styled(Section)`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SuccessIcon = styled(motion.div)`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const OrderDetails = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const OrderHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const OrderNumber = styled.h3`
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

const OrderDate = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0;
  font-size: 0.95rem;
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const InfoBlock = styled.div`
  h4 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.darkAccent};
    margin-bottom: 0.75rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CustomerSupport = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const SupportText = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.darkAccent};
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 0;
    font-size: 0.95rem;
  }
`;

const WhatsappButton = styled(Button)`
  svg {
    margin-right: 0.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const ButtonWithIcon = styled(Button)`
  svg {
    margin-right: 0.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const OrderConfirmationPage = () => {
  // Gerar número de pedido e data simulados
  const orderNumber = `PF${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Em um cenário real, esses dados viriam da API
  const paymentMethod = "Cartão de Crédito";
  const paymentStatus = "Aprovado";
  const deliveryAddress = "Rua Exemplo, 123 - Bairro, Cidade - Estado, CEP 12345-678";
  const estimatedDelivery = new Date(
    new Date().setDate(new Date().getDate() + 5)
  ).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <ConfirmationContainer>
      <SuccessIcon
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
      >
        <FaCheckCircle />
      </SuccessIcon>
      
      <Title>Pedido Realizado com Sucesso!</Title>
      <Subtitle>
        Obrigado por comprar conosco. Você receberá um e-mail de confirmação com os detalhes do seu pedido em breve.
      </Subtitle>
      
      <OrderDetails
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <OrderHeader>
          <OrderNumber>Pedido #{orderNumber}</OrderNumber>
          <OrderDate>Realizado em {orderDate}</OrderDate>
        </OrderHeader>
        
        <OrderInfo>
          <InfoBlock>
            <h4>Informações de Pagamento</h4>
            <p><strong>Método:</strong> {paymentMethod}</p>
            <p><strong>Status:</strong> {paymentStatus}</p>
          </InfoBlock>
          
          <InfoBlock>
            <h4>Informações de Entrega</h4>
            <p><strong>Endereço:</strong> {deliveryAddress}</p>
            <p><strong>Previsão de entrega:</strong> {estimatedDelivery}</p>
          </InfoBlock>
        </OrderInfo>
      </OrderDetails>
      
      <CustomerSupport
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <SupportText>
          <h3>Precisa de ajuda com seu pedido?</h3>
          <p>Nossa equipe de suporte está disponível para ajudar você.</p>
        </SupportText>
        
        <WhatsappButton $color="success">
          <FaWhatsapp /> Contato via WhatsApp
        </WhatsappButton>
      </CustomerSupport>
      
      <ButtonsContainer>
        <ButtonWithIcon 
          as={Link} 
          to="/" 
          $color="secondary"
        >
          <FaHome /> Voltar à Página Inicial
        </ButtonWithIcon>
        
        <ButtonWithIcon 
          as={Link} 
          to="/produtos"
        >
          <FaShoppingBag /> Continuar Comprando
        </ButtonWithIcon>
      </ButtonsContainer>
    </ConfirmationContainer>
  );
};

export default OrderConfirmationPage; 