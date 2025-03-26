import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaTimes,
  FaStar,
  FaShoppingCart,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { Section } from "../../components/ui/Section";
import { Button } from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Grid from "../../components/ui/Grid";
import { useCartStore } from "../../store/cartStore";

// Header
const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: ${({ theme }) => `${theme.space["3xl"]} 0`};
  text-align: center;
`;

const HeaderTitle = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const HeaderSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  max-width: 800px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.9;
`;

// Planos
const PlansContainer = styled.div`
  margin-top: ${({ theme }) => theme.space.xl};
  padding: 0 1rem;
`;

const PlanCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["featured"].includes(prop),
})`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 2rem;
  text-align: center;
  transition: ${({ theme }) => theme.transitions.default};
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ featured, theme }) =>
      featured ? theme.colors.primary : "transparent"};
  }
`;

const PlanHeader = styled.div.withConfig({
  shouldForwardProp: (prop) => !["featured"].includes(prop),
})`
  position: relative;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${({ featured, theme }) =>
    featured &&
    `
    &::after {
      content: 'Mais Popular';
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: ${theme.colors.primary};
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: bold;
    }
  `}
`;

const PlanTitle = styled.h3`
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const PlanPrice = styled.div`
  margin: 1.5rem 0;

  .amount {
    font-size: 3rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }

  .period {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};

    &:last-child {
      border-bottom: none;
    }
  }
`;

// Produtos
const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.darkAccent};
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const ProductImage = styled.div.withConfig({
  shouldForwardProp: (prop) => !["image"].includes(prop),
})`
  height: 180px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 200px;
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 0.5rem;
  min-height: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: auto;
  }
`;

const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  flex-grow: 1;
  font-size: 0.95rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.colors.warning};
`;

// Mock data
const plans = [
  {
    title: "Básico",
    price: "R$ 89,90",
    period: "mensal",
    features: [
      "Acesso à academia",
      "Musculação",
      "Vestiários com armários",
      "Avaliação inicial",
    ],
    featured: false,
  },
  {
    title: "Premium",
    price: "R$ 129,90",
    period: "mensal",
    features: [
      "Tudo do plano Básico",
      "Aulas coletivas",
      "Área de cardio",
      "Avaliação mensal",
      "App de treinos",
    ],
    featured: true,
  },
  {
    title: "VIP",
    price: "R$ 199,90",
    period: "mensal",
    features: [
      "Tudo do plano Premium",
      "Personal Trainer (1x semana)",
      "Nutricionista (mensal)",
      "Acesso à sauna",
      "Acesso à piscina",
      "Massagem (1x mês)",
    ],
    featured: false,
  },
];

const products = [
  {
    id: 1,
    name: "Whey Protein Isolado",
    image:
      "https://images.unsplash.com/photo-1617886322168-72b886573c5f?ixlib=rb-4.0.3",
    description:
      "Whey Protein Isolado de alta qualidade, com 27g de proteína por dose e baixo teor de gordura.",
    price: "R$ 149,90",
    rating: 4.5,
  },
  {
    id: 2,
    name: "BCAA 2:1:1",
    image:
      "https://images.unsplash.com/photo-1663169851353-ca1f7c1db9be?ixlib=rb-4.0.3",
    description:
      "BCAA na proporção 2:1:1 para ajudar na recuperação muscular e evitar o catabolismo.",
    price: "R$ 79,90",
    rating: 4,
  },
  {
    id: 3,
    name: "Creatina Monohidratada",
    image:
      "https://images.unsplash.com/photo-1627467959217-7fdeebceaff5?ixlib=rb-4.0.3",
    description:
      "Creatina pura monohidratada para aumentar a força, potência e performance nos treinos.",
    price: "R$ 89,90",
    rating: 5,
  },
  {
    id: 4,
    name: "Pré-Treino Energy",
    image:
      "https://images.unsplash.com/photo-1661607262702-94358a9977f2?ixlib=rb-4.0.3",
    description:
      "Pré-treino com cafeína, beta-alanina e creatina para máxima energia e foco nos treinos.",
    price: "R$ 119,90",
    rating: 4.5,
  },
];

// Componente para as estrelas de avaliação
const RatingStars = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
      {hasHalfStar && <FaStarHalfAlt />}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
    </>
  );
};

// Animações
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ProductsPage = () => {
  const { addItem } = useCartStore();
  const [addedProducts, setAddedProducts] = useState({});

  const handleAddToCart = (product) => {
    addItem({
      ...product,
      quantity: 1,
    });
    setAddedProducts((prev) => ({ ...prev, [product.id]: true }));

    // Limpar mensagem após 3 segundos
    setTimeout(() => {
      setAddedProducts((prev) => ({ ...prev, [product.id]: false }));
    }, 3000);
  };

  return (
    <>
      <PageHeader>
        <HeaderTitle
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Planos e Produtos
        </HeaderTitle>
        <HeaderSubtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Escolha o plano ideal para seus objetivos e conheça nossos suplementos
        </HeaderSubtitle>
      </PageHeader>

      <Section bgColor={(theme) => theme.colors.background} padding="3rem 0">
        <PlansContainer>
          <SectionTitle>Nossos Planos</SectionTitle>

          <Grid
            columns="3"
            gap="1.5rem"
            as={motion.div}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            responsive={[
              { breakpoint: "lg", columns: 3 },
              { breakpoint: "md", columns: 2 },
              { breakpoint: "sm", columns: 1 },
            ]}
          >
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                variants={fadeInUp}
                $featured={plan.featured}
              >
                <PlanHeader $featured={plan.featured}>
                  <PlanTitle>{plan.title}</PlanTitle>
                </PlanHeader>

                <PlanPrice>
                  <span className="amount">{plan.price}</span>
                  <br />
                  <span className="period">{plan.period}</span>
                </PlanPrice>

                <PlanFeatures>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </PlanFeatures>

                <Button
                  color={plan.featured ? "primary" : "secondary"}
                  fullWidth
                >
                  Assinar Plano
                </Button>
              </PlanCard>
            ))}
          </Grid>
        </PlansContainer>

        <div style={{ marginTop: "4rem", padding: "0 1rem" }}>
          <SectionTitle>Suplementos</SectionTitle>

          <Grid
            columns="4"
            gap="1.5rem"
            as={motion.div}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            responsive={[
              { breakpoint: "lg", columns: 4 },
              { breakpoint: "md", columns: 2 },
              { breakpoint: "sm", columns: 1 },
            ]}
          >
            {products.map((product, index) => (
              <ProductCard key={index} variants={fadeInUp}>
                <ProductImage $image={product.image} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>{product.price}</ProductPrice>
                  <ProductRating>
                    <RatingStars rating={product.rating} />
                  </ProductRating>
                  <Button
                    color="secondary"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedProducts[product.id] ? (
                      <>
                        <FaCheck /> Adicionado
                      </>
                    ) : (
                      <>
                        <FaShoppingCart /> Adicionar ao Carrinho
                      </>
                    )}
                  </Button>
                </ProductInfo>
              </ProductCard>
            ))}
          </Grid>
        </div>
      </Section>
    </>
  );
};

export default ProductsPage;
