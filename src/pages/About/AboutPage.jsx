import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaDumbbell,
  FaHeart,
  FaGem,
  FaTrophy,
  FaHandshake,
} from "react-icons/fa";
import { Section } from "../../components/ui/Section";
import { SectionTitle } from "../../components/ui/SectionTitle";

const AboutSection = styled(Section)`
  padding: 4rem 2rem;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const IntroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const StoryImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url("/images/about-gym.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 300px;
  }
`;

const StoryContent = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.darkAccent};
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const ValuesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled(motion.div)`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const ValueTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const ValueDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const AboutPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <AboutSection>
      <AboutContainer>
        <IntroSection>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>Sobre a PowerFit</SectionTitle>
            <Subtitle>Transformando vidas desde 2010</Subtitle>
            <Description>
              A PowerFit nasceu da paixão por transformar vidas através do
              fitness e bem-estar. Nosso compromisso é proporcionar um ambiente
              inclusivo e motivador, onde pessoas de todas as idades e níveis de
              condicionamento possam alcançar seus objetivos e viver mais
              saudáveis.
            </Description>
          </motion.div>
        </IntroSection>

        <GridContainer>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <StoryImage />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <StoryContent>
              <h3>Nossa História</h3>
              <p>
                A PowerFit foi fundada em 2010 por João Silva, um apaixonado
                treinador pessoal que sonhava em criar um espaço onde as pessoas
                pudessem transformar suas vidas através do exercício físico.
              </p>
              <p>
                O que começou como uma pequena academia com apenas 5
                funcionários e equipamentos básicos, rapidamente cresceu e se
                tornou referência em fitness e bem-estar na cidade. Hoje,
                contamos com uma equipe de mais de 50 profissionais qualificados
                e três unidades espalhadas pela cidade.
              </p>
              <p>
                Ao longo dos anos, ajudamos milhares de pessoas a alcançarem
                seus objetivos de saúde e fitness, sempre mantendo nosso
                compromisso com a excelência e atendimento personalizado.
              </p>
            </StoryContent>
          </motion.div>
        </GridContainer>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>Nossos Valores</SectionTitle>
          <Description>
            Na PowerFit, acreditamos que a jornada de fitness é única para cada
            pessoa. Nossos valores refletem nosso compromisso em apoiar você em
            cada passo do caminho.
          </Description>

          <ValuesList>
            <ValueCard
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ValueIcon>
                <FaHeart />
              </ValueIcon>
              <ValueTitle>Paixão</ValueTitle>
              <ValueDescription>
                Amamos o que fazemos e trazemos energia positiva e entusiasmo em
                tudo que realizamos.
              </ValueDescription>
            </ValueCard>

            <ValueCard
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ValueIcon>
                <FaUsers />
              </ValueIcon>
              <ValueTitle>Comunidade</ValueTitle>
              <ValueDescription>
                Criamos um ambiente acolhedor onde todos se sentem parte de uma
                família fitness.
              </ValueDescription>
            </ValueCard>

            <ValueCard
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ValueIcon>
                <FaGem />
              </ValueIcon>
              <ValueTitle>Excelência</ValueTitle>
              <ValueDescription>
                Buscamos a excelência em tudo que fazemos, desde nossos
                equipamentos até nossos serviços.
              </ValueDescription>
            </ValueCard>

            <ValueCard
              custom={3}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ValueIcon>
                <FaDumbbell />
              </ValueIcon>
              <ValueTitle>Inovação</ValueTitle>
              <ValueDescription>
                Estamos sempre atualizados com as últimas tendências e
                tecnologias do mundo fitness.
              </ValueDescription>
            </ValueCard>

            <ValueCard
              custom={4}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ValueIcon>
                <FaTrophy />
              </ValueIcon>
              <ValueTitle>Resultados</ValueTitle>
              <ValueDescription>
                Focamos em ajudar nossos clientes a alcançarem resultados reais
                e duradouros.
              </ValueDescription>
            </ValueCard>

            <ValueCard
              custom={5}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ValueIcon>
                <FaHandshake />
              </ValueIcon>
              <ValueTitle>Integridade</ValueTitle>
              <ValueDescription>
                Agimos com honestidade e integridade em todas as nossas
                relações.
              </ValueDescription>
            </ValueCard>
          </ValuesList>
        </motion.div>
      </AboutContainer>
    </AboutSection>
  );
};

export default AboutPage;
