import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaDumbbell,
  FaRegCheckCircle,
  FaCalendarAlt,
  FaDownload,
  FaVideo,
  FaRegClock,
  FaPrint,
} from "react-icons/fa";
import { useStudentStore } from "../../store/studentStore";
import { Button } from "../../components/ui/Button";

const WorkoutsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const WorkoutTabs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    overflow-x: auto;
    padding-bottom: 0.5rem;
    flex-wrap: nowrap;
  }
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "white"};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.textPrimary};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : "rgba(0, 0, 0, 0.1)"};
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.lightBackground};
  }
`;

const WorkoutCard = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const CardHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.darkAccent};
  color: white;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.75rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-right: 1rem;

  svg {
    margin-right: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const WorkoutNotes = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBackground};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;

  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.darkAccent};
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
    margin: 0;
  }
`;

const ExercisesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ExerciseItem = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
`;

const ExerciseImage = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const ExerciseInfo = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const ExerciseName = styled.h4`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const ExerciseDetail = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-left: 0.25rem;
  }
`;

const VideoButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  padding: 0;
  margin-top: 0.5rem;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const MobileActionButtons = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    justify-content: space-around;
    margin-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 1.5rem;
  }
`;

const MobileAction = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  cursor: pointer;

  svg {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const CheckoffButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $completed, theme }) =>
    $completed ? theme.colors.success : theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1.5rem;

  svg {
    margin-right: 0.75rem;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const videoModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    maxWidth: "800px",
    width: "100%",
    background: "transparent",
  },
};

const days = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const WorkoutsPage = () => {
  const { student } = useStudentStore();
  const [activeTab, setActiveTab] = useState("Segunda");
  const [completed, setCompleted] = useState({});

  // Adicionar propriedade days aos treinos se ela não existir
  const processedWorkouts = student?.workouts?.map((workout) => {
    // Se o treino não tem a propriedade days, criá-la com base no day
    if (!workout.days) {
      return {
        ...workout,
        days: [workout.day.split("-")[0]], // Pega a primeira parte do dia (ex: "Segunda-feira" -> "Segunda")
      };
    }
    return workout;
  });

  // Agrupar treinos por dia da semana
  const workoutsByDay =
    processedWorkouts?.reduce((acc, workout) => {
      workout.days.forEach((day) => {
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(workout);
      });
      return acc;
    }, {}) || {}; // Retorna objeto vazio se processedWorkouts for null ou undefined

  const handleTabChange = (day) => {
    setActiveTab(day);
  };

  const handleCheckoff = (day) => {
    setCompleted((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <WorkoutsContainer>
      <WorkoutTabs>
        {days.map((day) => (
          <TabButton
            key={day}
            $active={activeTab === day}
            onClick={() => handleTabChange(day)}
          >
            {day}
            {workoutsByDay[day] ? ` (${workoutsByDay[day].length})` : " (0)"}
          </TabButton>
        ))}
      </WorkoutTabs>

      {workoutsByDay[activeTab] && workoutsByDay[activeTab].length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <WorkoutCard>
            <CardHeader>
              <HeaderTitle>
                <FaDumbbell /> Treino de {activeTab}
              </HeaderTitle>
              <div style={{ display: "flex", alignItems: "center" }}>
                <HeaderInfo>
                  <FaRegClock /> 60 minutos
                </HeaderInfo>
                <HeaderInfo>
                  <FaCalendarAlt /> Atualizado em{" "}
                  {new Date().toLocaleDateString("pt-BR")}
                </HeaderInfo>
                <HeaderActions>
                  <Button $color="light" $size="small" onClick={handlePrint}>
                    <FaPrint /> Imprimir
                  </Button>
                  <Button $color="light" $size="small">
                    <FaDownload /> Baixar PDF
                  </Button>
                </HeaderActions>
              </div>
            </CardHeader>

            <CardContent>
              <WorkoutNotes>
                <h4>Notas do Instrutor</h4>
                <p>
                  Foco em hipertrofia muscular com períodos de descanso
                  moderados entre 60-90 segundos. Mantenha a técnica correta
                  durante todos os exercícios. Hidrate-se bem antes, durante e
                  após o treino.
                </p>
              </WorkoutNotes>

              <ExercisesList>
                {workoutsByDay[activeTab].map(
                  (workout, workoutIndex) =>
                    workout.exercises &&
                    workout.exercises.map((exercise, index) => (
                      <ExerciseItem key={`${workoutIndex}-${index}`}>
                        <ExerciseImage
                          src={
                            exercise.image || "/images/exercise-placeholder.jpg"
                          }
                        />
                        <ExerciseInfo>
                          <ExerciseName>{exercise.name}</ExerciseName>
                          <ExerciseDetail>
                            Séries: <span>{exercise.sets}</span>
                          </ExerciseDetail>
                          <ExerciseDetail>
                            Repetições: <span>{exercise.reps}</span>
                          </ExerciseDetail>
                          {exercise.weight && (
                            <ExerciseDetail>
                              Peso: <span>{exercise.weight}</span>
                            </ExerciseDetail>
                          )}
                          {exercise.rest && (
                            <ExerciseDetail>
                              Descanso: <span>{exercise.rest} seg</span>
                            </ExerciseDetail>
                          )}
                          <VideoButton>
                            <FaVideo /> Ver técnica em vídeo
                          </VideoButton>
                        </ExerciseInfo>
                      </ExerciseItem>
                    ))
                )}
              </ExercisesList>

              <MobileActionButtons>
                <MobileAction onClick={handlePrint}>
                  <FaPrint />
                  Imprimir
                </MobileAction>
                <MobileAction>
                  <FaDownload />
                  PDF
                </MobileAction>
                <MobileAction>
                  <FaVideo />
                  Vídeos
                </MobileAction>
              </MobileActionButtons>

              <CheckoffButton
                $completed={completed[activeTab]}
                onClick={() => handleCheckoff(activeTab)}
              >
                {completed[activeTab] ? (
                  <>
                    <FaRegCheckCircle /> Treino Concluído!
                  </>
                ) : (
                  <>
                    <FaRegCheckCircle /> Marcar como Concluído
                  </>
                )}
              </CheckoffButton>
            </CardContent>
          </WorkoutCard>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <FaDumbbell
            style={{ fontSize: "3rem", color: "#ccc", marginBottom: "1rem" }}
          />
          <h3>Nenhum treino programado para {activeTab}</h3>
          <p>
            Hoje é seu dia de descanso ou você ainda não tem um treino atribuído
            para este dia.
          </p>
        </motion.div>
      )}
    </WorkoutsContainer>
  );
};

export default WorkoutsPage;
