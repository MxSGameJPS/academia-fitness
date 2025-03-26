import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Section } from "../../components/ui/Section";
import Grid from "../../components/ui/Grid";

// Header
const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.darkAccent};
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

// Team Member Card
const TeamMemberCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.xl};

    img {
      transform: scale(1.05);
    }
  }
`;

const MemberImageContainer = styled.div`
  height: 350px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const MemberInfo = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  text-align: center;
`;

const MemberName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const MemberTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const MemberDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.space.md};
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.darkAccent};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    transform: translateY(-3px);
  }
`;

// Expertise Section
const ExpertiseBox = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  height: 100%;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const ExpertiseIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme, $bgColor }) =>
    $bgColor || theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.space.lg};
  font-size: 2.5rem;
`;

const ExpertiseTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const ExpertiseDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Animações
const fadeIn = {
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

// Mock data
const teamMembers = [
  {
    id: 1,
    name: "Carlos Silva",
    title: "Personal Trainer",
    description:
      "Especialista em hipertrofia e fisiculturismo, com mais de 10 anos de experiência no mercado fitness.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    social: {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    id: 2,
    name: "Ana Martins",
    title: "Nutricionista",
    description:
      "Especialista em nutrição esportiva, formada pela USP com pós-graduação em nutrição funcional.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    social: {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    id: 3,
    name: "Ricardo Ferreira",
    title: "Fisioterapeuta",
    description:
      "Especialista em reabilitação esportiva, com foco em prevenção e tratamento de lesões em atletas.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    social: {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    id: 4,
    name: "Juliana Costa",
    title: "Instrutora de Yoga",
    description:
      "Especialista em yoga e meditação, com certificação internacional e mais de 5 anos de experiência.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    social: {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    id: 5,
    name: "Marcelo Santos",
    title: "Instrutor de Musculação",
    description:
      "Educador Físico com especialização em treinamento funcional e preparação física de atletas.",
    image:
      "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    social: {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    id: 6,
    name: "Bianca Oliveira",
    title: "Nutricionista",
    description:
      "Especialista em emagrecimento e reeducação alimentar, com foco em mudança de hábitos saudáveis.",
    image:
      "https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    social: {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
];

const expertises = [
  {
    icon: "🏋️",
    title: "Musculação",
    description:
      "Profissionais especializados em técnicas avançadas de musculação e hipertrofia.",
    bgColor: "#FF4E50",
  },
  {
    icon: "🥗",
    title: "Nutrição",
    description:
      "Equipe de nutricionistas com foco em alimentação saudável e suplementação.",
    bgColor: "#FC913A",
  },
  {
    icon: "🧘",
    title: "Bem-estar",
    description:
      "Yoga, meditação e técnicas de relaxamento para o equilíbrio corpo e mente.",
    bgColor: "#F9D423",
  },
  {
    icon: "💪",
    title: "Funcional",
    description:
      "Treinamento funcional para melhorar sua performance em atividades do dia a dia.",
    bgColor: "#36B1BF",
  },
];

const TeamPage = () => {
  return (
    <>
      <PageHeader>
        <HeaderTitle
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nossa Equipe
        </HeaderTitle>
        <HeaderSubtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Conheça os profissionais que vão te ajudar a alcançar seus objetivos
        </HeaderSubtitle>
      </PageHeader>

      {/* Team Members Section */}
      <Section
        title="Profissionais Especializados"
        subtitle="Nossa equipe é formada por profissionais qualificados e apaixonados pela área fitness"
        centeredContent
      >
        <Grid
          autoFit
          minWidth="300px"
          gap="2rem"
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={fadeIn}>
              <TeamMemberCard>
                <MemberImageContainer>
                  <img src={member.image} alt={member.name} />
                </MemberImageContainer>
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberTitle>{member.title}</MemberTitle>
                  <MemberDescription>{member.description}</MemberDescription>
                  <SocialLinks>
                    <SocialLink
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </SocialLink>
                    <SocialLink
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                    </SocialLink>
                    <SocialLink
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook />
                    </SocialLink>
                  </SocialLinks>
                </MemberInfo>
              </TeamMemberCard>
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* Expertise Section */}
      <Section
        title="Nossas Especialidades"
        subtitle="Oferecemos diversos serviços especializados para atender todas as suas necessidades"
        bgColor="#f9f9f9"
        centeredContent
      >
        <Grid
          columns={4}
          columnsMd={2}
          columnsSm={1}
          gap="2rem"
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {expertises.map((expertise, index) => (
            <motion.div key={index} variants={fadeIn}>
              <ExpertiseBox>
                <ExpertiseIcon $bgColor={expertise.bgColor}>
                  {expertise.icon}
                </ExpertiseIcon>
                <ExpertiseTitle>{expertise.title}</ExpertiseTitle>
                <ExpertiseDescription>
                  {expertise.description}
                </ExpertiseDescription>
              </ExpertiseBox>
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* Join the Team Section */}
      <Section
        title="Faça Parte da Nossa Equipe"
        subtitle="Estamos sempre em busca de profissionais qualificados e apaixonados pelo que fazem"
        centeredContent
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: "800px",
            margin: "0 auto 2rem",
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          Se você é um profissional qualificado e apaixonado pela área fitness,
          envie seu currículo para <strong>carreiras@powerfit.com.br</strong> e
          venha fazer parte da nossa equipe. Oferecemos um ambiente de trabalho
          dinâmico, oportunidades de crescimento e benefícios exclusivos.
        </motion.p>
      </Section>
    </>
  );
};

export default TeamPage;
