import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUserCheck,
  FaDumbbell,
  FaWeightHanging,
  FaShoppingCart,
  FaClipboardList,
  FaArrowRight,
  FaFire,
  FaHeartbeat,
  FaMedal,
} from "react-icons/fa";
import { useStudentStore } from "../../store/studentStore";

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CardBase = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
  }
`;

const WelcomeCard = styled(CardBase)`
  grid-column: span 8;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1;
  }
`;

const NextClassCard = styled(CardBase)`
  grid-column: span 4;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1;
  }
`;

const ProgressCard = styled(CardBase)`
  grid-column: span 6;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1;
  }
`;

const MetricsCard = styled(CardBase)`
  grid-column: span 6;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1;
  }
`;

const ShopCard = styled(CardBase)`
  grid-column: span 4;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1;
  }
`;

const WorkoutCard = styled(CardBase)`
  grid-column: span 8;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1;
  }
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NextClassTime = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const NextClassName = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const NextClassInstructor = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const MetricItem = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5rem 0;
`;

const MetricLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MetricIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  border-radius: 6px;
  margin: 1rem 0;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${({ $progress }) => `${$progress}%`};
  transition: width 1s ease-in-out;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const ProgressLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProgressValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  font-size: 0.9rem;

  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s;
  }

  &:hover {
    text-decoration: underline;

    svg {
      transform: translateX(3px);
    }
  }
`;

const WorkoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const WorkoutItem = styled.div`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);

  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.darkAccent};
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 0.5rem;
  }
`;

const DashboardPage = () => {
  const { student } = useStudentStore();

  const nextClass = {
    time: "16:00 - Hoje",
    name: "Treino Funcional",
    instructor: "Carlos Silva",
  };

  // Formatar data de início para exibição
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  return (
    <DashboardGrid>
      <WelcomeCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CardTitle>
          <FaUserCheck /> Bem-vindo de volta, {student?.name.split(" ")[0]}!
        </CardTitle>

        <p>
          Você está no plano <strong>{student?.plan}</strong> desde{" "}
          {formatDate(student?.planStartDate)}.
          {student?.planEndDate && (
            <> Seu plano é válido até {formatDate(student?.planEndDate)}.</>
          )}
        </p>

        <p>
          Seu último check-in foi em {formatDate(new Date().toISOString())}.
        </p>

        <LinkButton to="/aluno/profile">
          Ver meu perfil completo <FaArrowRight />
        </LinkButton>
      </WelcomeCard>

      <NextClassCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <CardTitle>
          <FaCalendarAlt /> Próxima Aula
        </CardTitle>

        <NextClassTime>{nextClass.time}</NextClassTime>
        <NextClassName>{nextClass.name}</NextClassName>
        <NextClassInstructor>
          Instrutor: {nextClass.instructor}
        </NextClassInstructor>

        <LinkButton to="#">
          Ver todas as aulas <FaArrowRight />
        </LinkButton>
      </NextClassCard>

      <ProgressCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <CardTitle>
          <FaWeightHanging /> Seu Progresso
        </CardTitle>

        <p>Acompanhe suas metas e evolução:</p>

        <div style={{ marginTop: "1.5rem" }}>
          <ProgressInfo>
            <ProgressLabel>Meta de Peso</ProgressLabel>
            <ProgressValue>
              {student?.currentWeight}kg / {student?.targetWeight}kg
            </ProgressValue>
          </ProgressInfo>
          <ProgressBar>
            <ProgressFill
              $progress={Math.min(
                100,
                Math.max(
                  0,
                  ((student?.initialWeight - student?.currentWeight) /
                    (student?.initialWeight - student?.targetWeight)) *
                    100
                )
              )}
            />
          </ProgressBar>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <ProgressInfo>
            <ProgressLabel>Frequência Mensal</ProgressLabel>
            <ProgressValue>18 / 24 dias</ProgressValue>
          </ProgressInfo>
          <ProgressBar>
            <ProgressFill $progress={75} />
          </ProgressBar>
        </div>

        <LinkButton to="/aluno/measurements">
          Ver métricas detalhadas <FaArrowRight />
        </LinkButton>
      </ProgressCard>

      <MetricsCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <CardTitle>
          <FaHeartbeat /> Suas Métricas
        </CardTitle>

        <MetricsGrid>
          <MetricItem>
            <MetricIcon>
              <FaFire />
            </MetricIcon>
            <MetricValue>320</MetricValue>
            <MetricLabel>Calorias/dia</MetricLabel>
          </MetricItem>

          <MetricItem>
            <MetricIcon>
              <FaDumbbell />
            </MetricIcon>
            <MetricValue>72kg</MetricValue>
            <MetricLabel>Peso Máx. Supino</MetricLabel>
          </MetricItem>

          <MetricItem>
            <MetricIcon>
              <FaHeartbeat />
            </MetricIcon>
            <MetricValue>68</MetricValue>
            <MetricLabel>BPM em Repouso</MetricLabel>
          </MetricItem>

          <MetricItem>
            <MetricIcon>
              <FaMedal />
            </MetricIcon>
            <MetricValue>24</MetricValue>
            <MetricLabel>Dias Consecutivos</MetricLabel>
          </MetricItem>
        </MetricsGrid>
      </MetricsCard>

      <WorkoutCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <CardTitle>
          <FaDumbbell /> Seu Treino de Hoje
        </CardTitle>

        <WorkoutGrid>
          {student?.workouts?.slice(0, 4).map((workout, index) => (
            <WorkoutItem key={index}>
              <h4>{workout.name}</h4>
              <p>{workout.description}</p>
              <p>
                Séries: {workout.sets} x {workout.reps} reps
              </p>
            </WorkoutItem>
          ))}
        </WorkoutGrid>

        <LinkButton to="/aluno/workouts">
          Ver treino completo <FaArrowRight />
        </LinkButton>
      </WorkoutCard>

      <ShopCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <CardTitle>
          <FaShoppingCart /> Loja
        </CardTitle>

        <p>Aproveite descontos exclusivos na loja online!</p>

        <LinkButton to="/produtos">
          Ver produtos <FaArrowRight />
        </LinkButton>
      </ShopCard>
    </DashboardGrid>
  );
};

export default DashboardPage;
