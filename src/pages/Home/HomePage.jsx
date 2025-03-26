import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaDumbbell, FaHeartbeat, FaAppleAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Section } from "../../components/ui/Section";
import { Button } from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Grid from "../../components/ui/Grid";

// Importes de imagens
// Note: Substituir por imagens reais ou adicionar imagens ao projeto
const heroImage =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
const aboutImage =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

// Hero Section
const HeroSection = styled.section.withConfig({
  shouldForwardProp: (prop) => !["fullHeight"].includes(prop),
})`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(${heroImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 2rem;
  margin-top: -120px; /* Compensa o padding-top do Main */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: -70px; /* Compensa o padding-top do Main em dispositivos móveis */
    padding: 0 1rem;
    height: 100vh;
  }
`;

const HeroBackground = styled.div.withConfig({
  shouldForwardProp: (prop) => !["image"].includes(prop),
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.space.md};
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);

  span {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.95;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

// Features Section
const FeatureCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  transition: ${({ theme }) => theme.transitions.default};
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const FeatureTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// About Section
const AboutContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

const AboutImageContainer = styled(motion.div)`
  flex: 1;
  position: relative;
  height: 500px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    height: 400px;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AboutContent = styled.div`
  flex: 1;
`;

const AboutTitle = styled(motion.h2)`
  margin-bottom: ${({ theme }) => theme.space.md};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AboutText = styled(motion.p)`
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.xl};
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Classes Section
const ClassCard = styled(Card)`
  height: 100%;
`;

// Call to Action
const CtaSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
  padding: ${({ theme }) => `${theme.space["2xl"]} 0`};
`;

const CtaTitle = styled(motion.h2)`
  margin-bottom: ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.colors.light};
`;

const CtaText = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.xl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

// Animações
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
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

const features = [
  {
    icon: <FaDumbbell />,
    title: "Equipamentos modernos",
    description:
      "Contamos com equipamentos de última geração para otimizar seus treinos.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Treinos personalizados",
    description:
      "Nossos personal trainers criam programas exclusivos para suas necessidades.",
  },
  {
    icon: <FaAppleAlt />,
    title: "Nutrição especializada",
    description:
      "Nutricionistas qualificados para orientar sua alimentação e suplementação.",
  },
  {
    icon: <FaUsers />,
    title: "Aulas em grupo",
    description:
      "Diversas modalidades de aulas coletivas com instrutores certificados.",
  },
];

const classes = [
  {
    title: "Musculação",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description:
      "Desenvolva força e hipertrofia muscular com orientação especializada.",
  },
  {
    title: "Funcional",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description:
      "Treine movimentos que melhoram sua capacidade funcional no dia a dia.",
  },
  {
    title: "Spinning",
    image:
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1378&q=80",
    description:
      "Aulas de ciclismo indoor com música energética e alta queima calórica.",
  },
  {
    title: "Pilates",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description:
      "Fortaleça seu core e melhore sua postura com exercícios controlados.",
  },
];

const HomePage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection $fullHeight>
        <HeroBackground $image={heroImage} />
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Transforme seu corpo na <span>PowerFit</span>
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Oferecemos um ambiente completo para você alcançar seus objetivos
            com acompanhamento profissional.
          </HeroSubtitle>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button as={Link} to="/contato" size="lg">
              Experimente Grátis
            </Button>
            <Button as={Link} to="/produtos" variant="outline" size="lg">
              Ver Planos
            </Button>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <Section
        title="O que oferecemos"
        subtitle="Nossa academia disponibiliza uma estrutura completa para garantir os melhores resultados aos nossos alunos"
        bgColor="#f9f9f9"
        centeredContent
      >
        <Grid autoFit minWidth="260px" gap="2rem">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 * index }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </Grid>
      </Section>

      {/* About Section */}
      <Section id="about" bgColor="#fff">
        <AboutContainer ref={ref}>
          <AboutImageContainer
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
          >
            <AboutImage src={aboutImage} alt="Sobre a PowerFit" />
          </AboutImageContainer>

          <AboutContent>
            <AboutTitle
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.2 },
                },
              }}
            >
              Sobre a <span>PowerFit</span>
            </AboutTitle>

            <AboutText
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.3 },
                },
              }}
            >
              A PowerFit é mais que uma academia, é um centro de transformação
              física e mental. Fundada em 2010, temos ajudado milhares de
              pessoas a conquistarem seus objetivos de saúde e estética.
            </AboutText>

            <AboutText
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.4 },
                },
              }}
            >
              Nossa equipe é formada por profissionais altamente qualificados e
              apaixonados por fitness, prontos para oferecer o suporte
              necessário em sua jornada de transformação.
            </AboutText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.5 },
                },
              }}
            >
              <Button as={Link} to="/equipe">
                Conheça nossa equipe
              </Button>
            </motion.div>

            <Stats>
              <StatItem
                initial={{ opacity: 0, scale: 0.8 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, delay: 0.6 },
                  },
                }}
              >
                <StatNumber>1200+</StatNumber>
                <StatLabel>Alunos ativos</StatLabel>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, scale: 0.8 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, delay: 0.7 },
                  },
                }}
              >
                <StatNumber>25+</StatNumber>
                <StatLabel>Profissionais</StatLabel>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, scale: 0.8 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, delay: 0.8 },
                  },
                }}
              >
                <StatNumber>30+</StatNumber>
                <StatLabel>Modalidades</StatLabel>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, scale: 0.8 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, delay: 0.9 },
                  },
                }}
              >
                <StatNumber>13</StatNumber>
                <StatLabel>Anos de experiência</StatLabel>
              </StatItem>
            </Stats>
          </AboutContent>
        </AboutContainer>
      </Section>

      {/* Classes Section */}
      <Section
        title="Nossas Aulas"
        subtitle="Oferecemos uma grande variedade de aulas para todos os níveis e objetivos"
        bgColor="#f9f9f9"
        centeredContent
      >
        <Grid
          autoFit
          minWidth="280px"
          gap="2rem"
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {classes.map((classItem, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <ClassCard
                title={classItem.title}
                image={classItem.image}
                text={classItem.description}
                imageHeight="200px"
                elevation="medium"
                hoverable
                imageOverlay
                footer={
                  <Button
                    as={Link}
                    to="/contato"
                    variant="outline"
                    size="sm"
                    fullWidth
                  >
                    Mais informações
                  </Button>
                }
              />
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* Call to Action */}
      <CtaSection>
        <CtaTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pronto para começar sua transformação?
        </CtaTitle>
        <CtaText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Matricule-se hoje mesmo ou agende uma visita gratuita para conhecer
          nossa estrutura e conversar com nossos profissionais.
        </CtaText>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button as={Link} to="/contato" variant="secondary" size="lg">
            Matricule-se Agora
          </Button>
        </motion.div>
      </CtaSection>
    </>
  );
};

export default HomePage;
