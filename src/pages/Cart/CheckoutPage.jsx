import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaCreditCard,
  FaBarcode,
  FaCheck,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { SectionTitle } from "../../components/ui/SectionTitle";

const CheckoutContainer = styled(Section)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CheckoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const CheckoutTitle = styled(SectionTitle)`
  margin: 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.75rem;
  }
`;

const BackToCart = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  margin-bottom: 1rem;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 1rem;
  font-size: 0.9rem;
`;

const SectionTitle2 = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) =>
    columns === 3 ? "1fr 1fr 1fr" : columns === 2 ? "1fr 1fr" : "1fr"};
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkAccent};
  font-size: 0.95rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const PaymentOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const PaymentOption = styled.div`
  flex: 1;
  min-width: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: auto;
  }
`;

const PaymentOptionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.5rem;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primaryLight : "#f8f9fa"};
  border: 2px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.primary : "transparent"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.colors.primaryLight : "#edf2ff"};
  }

  svg {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.darkAccent};
  }
`;

const OrderSummary = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
`;

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  &.total {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    font-weight: 700;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.darkAccent};
  }
`;

const OrderItems = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItemRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const ItemQuantity = styled.span`
  width: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ItemName = styled.span`
  flex: 1;
`;

const ItemPrice = styled.span`
  font-weight: 600;
`;

const SubmitButton = styled(Button)`
  margin-top: 1.5rem;

  svg {
    margin-right: 0.5rem;
  }
`;

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const CheckoutPage = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const navigate = useNavigate();

  const subtotal = getTotal();
  const shipping = subtotal > 200 ? 0 : 20;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Em um cenário real, enviaríamos os dados para processamento
    // Por enquanto, apenas simularemos uma compra bem-sucedida

    // Limpar o carrinho
    clearCart();

    // Redirecionar para página de confirmação
    navigate("/pedido-confirmado");
  };

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <CheckoutTitle>
          <FaShoppingCart /> Finalizar Compra
        </CheckoutTitle>
        <BackToCart to="/carrinho">
          <FaArrowLeft /> Voltar ao carrinho
        </BackToCart>
      </CheckoutHeader>

      <CheckoutGrid>
        <CheckoutForm
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionHeader>
                <SectionNumber>1</SectionNumber>
                <SectionTitle2>Dados Pessoais</SectionTitle2>
              </SectionHeader>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="name">Nome Completo</FormLabel>
                  <FormInput type="text" id="name" required />
                </FormGroup>
              </FormRow>

              <FormRow columns={2}>
                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput type="email" id="email" required />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="phone">Telefone</FormLabel>
                  <FormInput type="tel" id="phone" required />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <FormInput type="text" id="cpf" required />
                </FormGroup>
              </FormRow>
            </FormSection>

            <FormSection>
              <SectionHeader>
                <SectionNumber>2</SectionNumber>
                <SectionTitle2>Endereço de Entrega</SectionTitle2>
              </SectionHeader>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="cep">CEP</FormLabel>
                  <FormInput type="text" id="cep" required />
                </FormGroup>
              </FormRow>

              <FormRow columns={2}>
                <FormGroup>
                  <FormLabel htmlFor="street">Rua</FormLabel>
                  <FormInput type="text" id="street" required />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="number">Número</FormLabel>
                  <FormInput type="text" id="number" required />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="complement">Complemento</FormLabel>
                  <FormInput type="text" id="complement" />
                </FormGroup>
              </FormRow>

              <FormRow columns={3}>
                <FormGroup>
                  <FormLabel htmlFor="neighborhood">Bairro</FormLabel>
                  <FormInput type="text" id="neighborhood" required />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="city">Cidade</FormLabel>
                  <FormInput type="text" id="city" required />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="state">Estado</FormLabel>
                  <FormInput type="text" id="state" required />
                </FormGroup>
              </FormRow>
            </FormSection>

            <FormSection>
              <SectionHeader>
                <SectionNumber>3</SectionNumber>
                <SectionTitle2>Forma de Pagamento</SectionTitle2>
              </SectionHeader>

              <PaymentOptions>
                <PaymentOption>
                  <PaymentOptionButton
                    type="button"
                    selected={paymentMethod === "credit"}
                    onClick={() => setPaymentMethod("credit")}
                  >
                    <FaCreditCard />
                    <span>Cartão de Crédito</span>
                  </PaymentOptionButton>
                </PaymentOption>

                <PaymentOption>
                  <PaymentOptionButton
                    type="button"
                    selected={paymentMethod === "boleto"}
                    onClick={() => setPaymentMethod("boleto")}
                  >
                    <FaBarcode />
                    <span>Boleto Bancário</span>
                  </PaymentOptionButton>
                </PaymentOption>

                <PaymentOption>
                  <PaymentOptionButton
                    type="button"
                    selected={paymentMethod === "pix"}
                    onClick={() => setPaymentMethod("pix")}
                  >
                    <FaMoneyBillWave />
                    <span>Pix</span>
                  </PaymentOptionButton>
                </PaymentOption>
              </PaymentOptions>

              {paymentMethod === "credit" && (
                <>
                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="cardNumber">
                        Número do Cartão
                      </FormLabel>
                      <FormInput
                        type="text"
                        id="cardNumber"
                        required
                        placeholder="0000 0000 0000 0000"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow columns={3}>
                    <FormGroup>
                      <FormLabel htmlFor="cardName">Nome no Cartão</FormLabel>
                      <FormInput type="text" id="cardName" required />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="expiry">Validade (MM/AA)</FormLabel>
                      <FormInput
                        type="text"
                        id="expiry"
                        required
                        placeholder="MM/AA"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="cvv">CVV</FormLabel>
                      <FormInput
                        type="text"
                        id="cvv"
                        required
                        placeholder="123"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="installments">Parcelas</FormLabel>
                      <FormInput as="select" id="installments" required>
                        <option value="1">
                          1x de {formatCurrency(total)} (sem juros)
                        </option>
                        <option value="2">
                          2x de {formatCurrency(total / 2)} (sem juros)
                        </option>
                        <option value="3">
                          3x de {formatCurrency(total / 3)} (sem juros)
                        </option>
                        <option value="4">
                          4x de {formatCurrency(total / 4)} (sem juros)
                        </option>
                        <option value="5">
                          5x de {formatCurrency(total / 5)} (sem juros)
                        </option>
                        <option value="6">
                          6x de {formatCurrency(total / 6)} (sem juros)
                        </option>
                      </FormInput>
                    </FormGroup>
                  </FormRow>
                </>
              )}

              {paymentMethod === "boleto" && (
                <p style={{ color: "#666", marginBottom: "1rem" }}>
                  O boleto será gerado após a conclusão do pedido. O prazo de
                  entrega começa a contar a partir da confirmação do pagamento.
                </p>
              )}

              {paymentMethod === "pix" && (
                <p style={{ color: "#666", marginBottom: "1rem" }}>
                  Um QR Code PIX será gerado na próxima tela. O pedido será
                  processado imediatamente após a confirmação do pagamento.
                </p>
              )}
            </FormSection>

            <SubmitButton $fullWidth type="submit">
              <FaCheck /> Finalizar Pedido
            </SubmitButton>
          </form>
        </CheckoutForm>

        <OrderSummary
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <SummaryTitle>Resumo do Pedido</SummaryTitle>

          <OrderItems>
            {items.map((item) => (
              <OrderItemRow key={item.id}>
                <ItemQuantity>{item.quantity}x</ItemQuantity>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>
                  {formatCurrency(item.price * item.quantity)}
                </ItemPrice>
              </OrderItemRow>
            ))}
          </OrderItems>

          <SummaryRow>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </SummaryRow>

          <SummaryRow>
            <span>Frete</span>
            <span>{shipping === 0 ? "Grátis" : formatCurrency(shipping)}</span>
          </SummaryRow>

          {discount > 0 && (
            <SummaryRow>
              <span>Desconto</span>
              <span>- {formatCurrency(discount)}</span>
            </SummaryRow>
          )}

          <SummaryRow className="total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </SummaryRow>

          {shipping === 0 && (
            <p
              style={{ fontSize: "0.9rem", color: "green", marginTop: "1rem" }}
            >
              <FaCheck style={{ marginRight: "0.5rem" }} />
              Você ganhou frete grátis!
            </p>
          )}
        </OrderSummary>
      </CheckoutGrid>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
