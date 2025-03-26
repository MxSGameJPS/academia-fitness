import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { SectionTitle } from "../../components/ui/SectionTitle";

const CartContainer = styled(Section)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CartHeader = styled.div`
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

const CartTitle = styled(SectionTitle)`
  margin: 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.75rem;
  }
`;

const CartEmpty = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.darkAccent};
  }

  p {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsList = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CartItem = styled(motion.div)`
  display: flex;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-right: 1.5rem;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-right: 0;
    width: 80px;
    height: 80px;
  }
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const ItemPrice = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ItemDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: flex-start;
    gap: 2rem;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.darkAccent};
  }
`;

const QuantityDisplay = styled.div`
  width: 40px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const CartSummary = styled.div`
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

const ContinueButton = styled(Button)`
  margin-bottom: 1rem;
`;

const BackToProducts = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  text-decoration: none;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const cartItemAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    getItemCount,
    clearCart,
  } = useCartStore();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const formatPrice = (price) => {
    if (typeof price === "string" && price.includes("R$")) {
      return price;
    }
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };

  const extractNumericPrice = (price) => {
    if (typeof price === "number") return price;

    const numericPrice =
      typeof price === "string"
        ? parseFloat(price.replace("R$", "").replace(",", ".").trim())
        : 0;

    return numericPrice || 0;
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = extractNumericPrice(item.price);
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContainer>
      <CartHeader>
        <CartTitle>
          <FaShoppingCart /> Meu Carrinho
        </CartTitle>
        <BackToProducts to="/produtos">
          <FaArrowLeft /> Continuar Comprando
        </BackToProducts>
      </CartHeader>

      {items.length === 0 ? (
        <CartEmpty>
          <FaShoppingCart />
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione produtos ao seu carrinho para continuar com a compra.</p>
          <Button as={Link} to="/produtos" color="primary">
            Ver Produtos
          </Button>
        </CartEmpty>
      ) : (
        <CartGrid>
          <CartItemsList>
            {items.map((item) => (
              <CartItem
                key={item.id || item.name}
                variants={cartItemAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ItemImage src={item.image} />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                  <ItemActions>
                    <QuantityControl>
                      <QuantityButton
                        onClick={() =>
                          updateQuantity(
                            item.id || item.name,
                            item.quantity - 1
                          )
                        }
                      >
                        <FaMinus />
                      </QuantityButton>
                      <QuantityDisplay>{item.quantity}</QuantityDisplay>
                      <QuantityButton
                        onClick={() =>
                          updateQuantity(
                            item.id || item.name,
                            item.quantity + 1
                          )
                        }
                      >
                        <FaPlus />
                      </QuantityButton>
                    </QuantityControl>
                    <RemoveButton
                      onClick={() => removeItem(item.id || item.name)}
                    >
                      <FaTrash /> Remover
                    </RemoveButton>
                  </ItemActions>
                </ItemInfo>
              </CartItem>
            ))}
          </CartItemsList>

          <CartSummary>
            <SummaryTitle>Resumo do Pedido</SummaryTitle>
            <SummaryRow>
              <span>Subtotal ({getItemCount()} itens)</span>
              <span>{formatPrice(calculateTotal())}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Frete</span>
              <span>Grátis</span>
            </SummaryRow>
            <SummaryRow className="total">
              <span>Total</span>
              <span>{formatPrice(calculateTotal())}</span>
            </SummaryRow>

            <ContinueButton color="primary" fullWidth onClick={handleCheckout}>
              Finalizar Compra <FaMoneyBillWave />
            </ContinueButton>
            <Button color="secondary" fullWidth onClick={() => clearCart()}>
              Limpar Carrinho <FaTrash />
            </Button>
          </CartSummary>
        </CartGrid>
      )}
    </CartContainer>
  );
};

export default CartPage;
