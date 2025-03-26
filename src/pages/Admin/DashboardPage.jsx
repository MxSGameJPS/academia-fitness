import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaEnvelope,
  FaDumbbell,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaExclamationCircle,
} from "react-icons/fa";
import { useContactStore } from "../../store/contactStore";

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .value {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme, color }) => theme.colors[color] || theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  .description {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    margin-top: auto;
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme, color }) =>
    `${theme.colors[color]}15` || `${theme.colors.primary}15`};
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;

  display: flex;
  align-items: center;

  svg {
    margin-right: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RecentContactsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
`;

const ContactItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const ContactInfo = styled.div`
  flex: 1;

  .name {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 0.2rem;
  }

  .subject {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const ContactTime = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  min-width: 100px;
  text-align: right;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;

  ${({ $status, theme }) => {
    switch ($status) {
      case "novo":
        return `
          background-color: ${theme.colors.primaryLight};
          color: ${theme.colors.primary};
        `;
      case "em_andamento":
        return `
          background-color: ${theme.colors.warningLight};
          color: ${theme.colors.warning};
        `;
      case "concluido":
        return `
          background-color: ${theme.colors.successLight};
          color: ${theme.colors.success};
        `;
      default:
        return `
          background-color: ${theme.colors.grayLight};
          color: ${theme.colors.gray};
        `;
    }
  }}
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}10`};
  }
`;

const ActionButton = styled(Link)`
  background-color: ${({ theme, color }) =>
    theme.colors[color] || theme.colors.primary};
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  gap: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  svg {
    font-size: 1.1rem;
  }
`;

const QuickActions = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.border};
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const RevenueChartCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 1.5rem;
  overflow: hidden;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const ChartPlaceholder = styled.div`
  height: 250px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;

// Mock data
const mockStats = [
  {
    title: "Total de Alunos",
    value: 345,
    description: "12 novos nos últimos 30 dias",
    icon: <FaUsers />,
    color: "primary",
  },
  {
    title: "Contatos",
    value: 28,
    description: "8 mensagens não lidas",
    icon: <FaEnvelope />,
    color: "secondary",
  },
  {
    title: "Equipamentos",
    value: 42,
    description: "3 em manutenção",
    icon: <FaDumbbell />,
    color: "darkAccent",
  },
  {
    title: "Aulas Agendadas",
    value: 189,
    description: "Esta semana",
    icon: <FaCalendarAlt />,
    color: "success",
  },
];

const DashboardPage = () => {
  const contacts = useContactStore((state) => state.contacts);
  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const unreadContacts = contacts.filter((c) => c.status === "novo").length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Hoje
      return `Hoje às ${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    } else if (diffDays === 1) {
      // Ontem
      return `Ontem às ${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    } else if (diffDays < 7) {
      // Menos de uma semana
      const weekdays = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ];
      return `${weekdays[date.getDay()]} às ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    } else {
      // Mais de uma semana
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    }
  };

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Dashboard Administrativo</Title>
        <Subtitle>Visão geral e estatísticas da academia</Subtitle>
      </PageHeader>

      <StatsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mockStats.map((stat, index) => (
          <StatCard key={index} variants={itemVariants} color={stat.color}>
            <IconWrapper color={stat.color}>{stat.icon}</IconWrapper>
            <h3>{stat.title}</h3>
            <div className="value">{stat.value}</div>
            <div className="description">{stat.description}</div>
          </StatCard>
        ))}
      </StatsGrid>

      <CardGrid>
        <RevenueChartCard>
          <h3>Receita Mensal</h3>
          <ChartPlaceholder>
            Gráfico de receita seria exibido aqui
          </ChartPlaceholder>
        </RevenueChartCard>

        <RevenueChartCard>
          <h3>Novas Inscrições</h3>
          <ChartPlaceholder>
            Gráfico de novas inscrições seria exibido aqui
          </ChartPlaceholder>
        </RevenueChartCard>
      </CardGrid>

      <SectionTitle>
        <FaEnvelope />
        Mensagens Recentes
      </SectionTitle>

      <RecentContactsContainer>
        {recentContacts.length > 0 ? (
          <>
            {recentContacts.map((contact) => (
              <ContactItem key={contact.id}>
                <ContactInfo>
                  <div className="name">{contact.name}</div>
                  <div className="subject">{contact.subject}</div>
                </ContactInfo>
                <ContactTime>
                  {formatDate(contact.date)}
                  <StatusBadge $status={contact.status}>
                    {contact.status}
                  </StatusBadge>
                </ContactTime>
              </ContactItem>
            ))}
            <ViewAllLink to="/admin/contacts">
              Ver todas as mensagens
            </ViewAllLink>
          </>
        ) : (
          <EmptyState>
            <FaExclamationCircle />
            <h3>Nenhuma mensagem recebida</h3>
            <p>
              As mensagens recebidas pelo formulário de contato aparecerão aqui.
            </p>
          </EmptyState>
        )}
      </RecentContactsContainer>

      <QuickActions>
        <ActionButton to="/admin/contacts" color="primary">
          <FaEnvelope />
          {unreadContacts > 0
            ? `Ver ${unreadContacts} mensagens não lidas`
            : "Ver todas as mensagens"}
        </ActionButton>

        <ActionButton to="/admin" color="secondary">
          <FaMoneyBillWave /> Gerenciar Planos
        </ActionButton>

        <ActionButton to="/admin" color="success">
          <FaUsers /> Gerenciar Alunos
        </ActionButton>
      </QuickActions>
    </PageContainer>
  );
};

export default DashboardPage;
