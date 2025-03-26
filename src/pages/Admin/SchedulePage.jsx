import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCalendarAlt,
  FaClock,
  FaChalkboardTeacher,
  FaMapMarkerAlt,
  FaUsers,
  FaSave,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { SectionTitle } from "../../components/ui/SectionTitle";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1;
  max-width: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    margin-bottom: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: ${({ $showMobile }) => ($showMobile ? "flex" : "none")};
    position: ${({ $showMobile }) => ($showMobile ? "absolute" : "static")};
    top: 60px;
    left: 0;
    right: 0;
    z-index: 10;
    background: white;
    padding: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex: 1;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
  }

  .desktop-buttons {
    display: flex;
    gap: 0.5rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      display: none;
    }
  }

  .mobile-select {
    display: none;
    width: 100%;
    margin-bottom: 0.5rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      display: block;
    }
  }
`;

const CalendarNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const NavButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
`;

const CalendarTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    text-align: center;
    font-size: 1.25rem;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(7, 1fr);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 80px repeat(7, 1fr);
    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 60px repeat(7, 1fr);
    font-size: 0.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
    overflow-x: auto;
  }
`;

const CalendarHeader = styled.div`
  background: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  text-align: center;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 100px repeat(7, 1fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 80px repeat(7, 1fr);
    padding: 0.75rem 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 60px repeat(7, 1fr);
    padding: 0.5rem 0.25rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    padding: 0.5rem;
  }
`;

const CalendarDay = styled.div`
  padding: 0.5rem;
  text-align: center;

  span {
    display: block;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.25rem;

    span {
      font-size: 0.7rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: 60px;
    flex: 1;
  }
`;

const TimeSlot = styled.div`
  padding: 0.75rem 0.5rem;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const CalendarCell = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 60px;
  position: relative;

  &:last-child {
    border-right: none;
  }
`;

const ClassItem = styled.div`
  position: absolute;
  width: calc(100% - 6px);
  left: 3px;
  height: ${({ duration }) => `${duration * 60 - 4}px`};
  top: ${({ start }) => `${start * 60 + 2}px`};
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "musculação":
        return theme.colors.primary;
      case "funcional":
        return theme.colors.success;
      case "yoga":
        return theme.colors.info;
      case "spinning":
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  border-radius: 4px;
  padding: 0.25rem;
  font-size: 0.7rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
    z-index: 10;
  }
`;

const ClassTitle = styled.div`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClassTime = styled.div`
  font-size: 0.65rem;
  opacity: 0.9;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.25rem;
    font-size: 0.6rem;
  }
`;

const ClassInstructor = styled.div`
  font-size: 0.65rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  svg {
    margin-right: 0.25rem;
    font-size: 0.6rem;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 95%;
    max-height: 80vh;
    margin: 0 10px;
  }
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols || 1}, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const WeekSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WeekNavigationButton = styled(Button)`
  padding: 0.5rem;
  min-width: unset;
`;

const MobileScheduleView = styled.div`
  display: none;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`;

const MobileDay = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MobileDayHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1rem;
  font-weight: bold;
  text-align: center;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const MobileDayOfWeek = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
  font-weight: normal;
  margin-top: 0.2rem;
`;

const MobileClassList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileClassItem = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const MobileClassTime = styled.div`
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "musculação":
        return theme.colors.primary;
      case "funcional":
        return theme.colors.success;
      case "yoga":
        return theme.colors.info;
      case "spinning":
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  margin-right: 0.75rem;
  min-width: 60px;
  text-align: center;
  font-size: 0.85rem;
`;

const MobileClassInfo = styled.div`
  flex: 1;

  .title {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .instructor {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.25rem;
      font-size: 0.75rem;
    }
  }
`;

const MobileClassActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DesktopScheduleView = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;

const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem;
    flex-wrap: wrap;

    button {
      flex: 1;
      min-width: 120px;
    }
  }
`;

const SmallButton = styled(Button)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;

    svg {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 400px) {
    .btn-text {
      display: none;
    }
  }
`;

const AddButton = styled(Button)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const FloatingAddButton = styled(Button)`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;

  svg {
    font-size: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileSearchButton = styled(Button)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`;

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [activeInstructor, setActiveInstructor] = useState("all");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Exemplo de dados de profissionais da academia
  const profissionais = [
    {
      id: 1,
      nome: "Carlos Silva",
      especialidade: "Personal Trainer",
      foto: "",
    },
    { id: 2, nome: "Ana Oliveira", especialidade: "Nutricionista", foto: "" },
    { id: 3, nome: "Márcio Santos", especialidade: "Fisioterapeuta", foto: "" },
    { id: 4, nome: "Juliana Costa", especialidade: "Yoga", foto: "" },
    { id: 5, nome: "Roberto Alves", especialidade: "Crossfit", foto: "" },
  ];

  // Exemplo de aulas e compromissos
  const classes = [
    {
      id: 1,
      title: "Treinamento Funcional",
      instructor: "Carlos Silva",
      capacity: 15,
      participants: 8,
      type: "funcional",
      day: 1, // Segunda-feira
      startTime: 8, // 8:00
      duration: 1, // 1 hora
      room: "Sala 2",
    },
    {
      id: 2,
      title: "Yoga para Iniciantes",
      instructor: "Juliana Costa",
      capacity: 10,
      participants: 6,
      type: "yoga",
      day: 1, // Segunda-feira
      startTime: 9, // 9:00
      duration: 1, // 1 hora
      room: "Sala de Yoga",
    },
    {
      id: 3,
      title: "Consulta Nutricional",
      instructor: "Ana Oliveira",
      capacity: 1,
      participants: 1,
      type: "consulta",
      day: 2, // Terça-feira
      startTime: 10, // 10:00
      duration: 1.5, // 1 hora e meia
      room: "Consultório 1",
    },
    {
      id: 4,
      title: "Crossfit",
      instructor: "Roberto Alves",
      capacity: 12,
      participants: 10,
      type: "funcional",
      day: 3, // Quarta-feira
      startTime: 18, // 18:00
      duration: 1, // 1 hora
      room: "Arena Crossfit",
    },
    {
      id: 5,
      title: "Fisioterapia - Paciente Márcia",
      instructor: "Márcio Santos",
      capacity: 1,
      participants: 1,
      type: "consulta",
      day: 4, // Quinta-feira
      startTime: 14, // 14:00
      duration: 1, // 1 hora
      room: "Sala de Reabilitação",
    },
    {
      id: 6,
      title: "Treinamento HIIT",
      instructor: "Carlos Silva",
      capacity: 10,
      participants: 7,
      type: "funcional",
      day: 5, // Sexta-feira
      startTime: 7, // 7:00
      duration: 0.5, // 30 minutos
      room: "Arena Principal",
    },
    {
      id: 7,
      title: "Avaliação Física - Novo Aluno",
      instructor: "Carlos Silva",
      capacity: 1,
      participants: 1,
      type: "avaliacao",
      day: 5, // Sexta-feira
      startTime: 16, // 16:00
      duration: 1, // 1 hora
      room: "Sala de Avaliação",
    },
    {
      id: 8,
      title: "Yoga Avançado",
      instructor: "Juliana Costa",
      capacity: 8,
      participants: 5,
      type: "yoga",
      day: 6, // Sábado
      startTime: 9, // 9:00
      duration: 1.5, // 1 hora e meia
      room: "Sala de Yoga",
    },
  ];

  // Filtrar aulas com base no profissional selecionado
  const filteredClasses = classes.filter(
    (cls) =>
      (activeInstructor === "all" || cls.instructor === activeInstructor) &&
      (searchTerm === "" ||
        cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Horários a serem exibidos na agenda (7:00 às 21:00)
  const timeSlots = Array.from({ length: 15 }, (_, i) => i + 7);

  // Obter os dias da semana atual
  const getCurrentWeek = (date) => {
    const monday = new Date(date);
    const dayOfWeek = monday.getDay();

    // Ajustar para começar na segunda-feira (1)
    monday.setDate(monday.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    // Criar array com os 7 dias da semana
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      week.push(day);
    }

    return week;
  };

  // Semana atual baseada na data selecionada
  const currentWeek = getCurrentWeek(currentDate);

  const navigateToPreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const navigateToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const navigateToCurrentWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // ajuste para começar na segunda-feira
    setCurrentDate(new Date(now.setDate(diff)));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

  const formatDayOfWeek = (date) => {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return days[date.getDay()];
  };

  const formatTimeSlot = (time) => {
    return `${time}:00`;
  };

  const formatClassTime = (startTime, duration) => {
    const start = `${Math.floor(startTime)}:${(startTime % 1) * 60 || "00"}`;
    const end = `${Math.floor(startTime + duration)}:${
      ((startTime + duration) % 1) * 60 || "00"
    }`;
    return `${start} - ${end}`;
  };

  const openModal = (classItem, mode = "view") => {
    setSelectedClass(classItem);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  const handleAddNewClass = () => {
    openModal(null, "add");
  };

  return (
    <Section>
      <PageHeader>
        <SearchContainer $showMobile={showMobileSearch}>
          <SearchInput
            type="text"
            placeholder="Buscar atividades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button color="primary" onClick={() => setShowMobileSearch(false)}>
            <FaSearch />
          </Button>
        </SearchContainer>

        <MobileSearchButton
          color="secondary"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <FaSearch />
        </MobileSearchButton>

        <ButtonsContainer>
          <div className="mobile-select">
            <FormSelect
              value={activeInstructor}
              onChange={(e) => setActiveInstructor(e.target.value)}
            >
              <option value="all">Todos os Profissionais</option>
              {profissionais.map((prof) => (
                <option key={prof.id} value={prof.nome}>
                  {prof.nome}
                </option>
              ))}
            </FormSelect>
          </div>

          <div className="desktop-buttons">
            <Button
              color={activeInstructor === "all" ? "primary" : "secondary"}
              onClick={() => setActiveInstructor("all")}
            >
              Todos
            </Button>
            {profissionais.map((prof) => (
              <Button
                key={prof.id}
                color={activeInstructor === prof.nome ? "primary" : "secondary"}
                onClick={() => setActiveInstructor(prof.nome)}
              >
                {prof.nome}
              </Button>
            ))}
          </div>

          <AddButton color="primary" onClick={handleAddNewClass}>
            <FaPlus /> Nova Atividade
          </AddButton>
        </ButtonsContainer>
      </PageHeader>

      <CalendarNav>
        <CalendarTitle>{formatMonthYear(currentDate)}</CalendarTitle>
        <NavButtonsContainer>
          <SmallButton color="gray" onClick={navigateToPreviousWeek}>
            <FaChevronLeft />
            <span className="btn-text">Anterior</span>
          </SmallButton>
          <SmallButton color="primary" onClick={navigateToCurrentWeek}>
            Atual
          </SmallButton>
          <SmallButton color="gray" onClick={navigateToNextWeek}>
            <span className="btn-text">Próxima</span>
            <FaChevronRight />
          </SmallButton>
        </NavButtonsContainer>
      </CalendarNav>

      <DesktopScheduleView>
        <CalendarGrid>
          <CalendarHeader>
            <div></div> {/* Espaço vazio para o cabeçalho de horários */}
            {currentWeek.map((day, index) => (
              <CalendarDay key={index}>
                {formatDate(day)}
                <span>{formatDayOfWeek(day)}</span>
              </CalendarDay>
            ))}
          </CalendarHeader>

          {timeSlots.map((timeSlot) => (
            <React.Fragment key={timeSlot}>
              <TimeSlot>{formatTimeSlot(timeSlot)}</TimeSlot>
              {currentWeek.map((day, dayIndex) => {
                const dayOfWeek = day.getDay() === 0 ? 7 : day.getDay();
                return (
                  <CalendarCell key={dayIndex}>
                    {filteredClasses
                      .filter(
                        (classItem) =>
                          classItem.day === dayOfWeek &&
                          classItem.startTime <= timeSlot &&
                          classItem.startTime + classItem.duration > timeSlot
                      )
                      .map((classItem) => (
                        <ClassItem
                          key={classItem.id}
                          type={classItem.type}
                          start={classItem.startTime - timeSlot + 0.5}
                          duration={classItem.duration}
                          style={{
                            // Ajuste de estilo conforme necessário para que as classes apareçam corretamente
                            top: "0px",
                            height: `${Math.min(classItem.duration, 1) * 100}%`,
                          }}
                          onClick={() => openModal(classItem, "view")}
                        >
                          <ClassTitle>{classItem.title}</ClassTitle>
                          <ClassTime>
                            <FaClock />
                            {formatClassTime(
                              classItem.startTime,
                              classItem.duration
                            )}
                          </ClassTime>
                          <ClassInstructor>
                            <FaChalkboardTeacher />
                            {classItem.instructor}
                          </ClassInstructor>
                        </ClassItem>
                      ))}
                  </CalendarCell>
                );
              })}
            </React.Fragment>
          ))}
        </CalendarGrid>
      </DesktopScheduleView>

      {isModalOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <ModalContent
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                {modalMode === "add"
                  ? "Adicionar Nova Atividade"
                  : modalMode === "edit"
                  ? "Editar Atividade"
                  : `${selectedClass?.title}`}
              </ModalTitle>
              <button onClick={closeModal}>&times;</button>
            </ModalHeader>
            <ModalBody>
              {/* Detalhes da atividade para o modo de visualização */}
              {modalMode === "view" && selectedClass && (
                <div>
                  <h3>{selectedClass.title}</h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <FaChalkboardTeacher
                      style={{ marginRight: "0.5rem", color: "#2196f3" }}
                    />
                    <span>
                      <strong>Profissional:</strong> {selectedClass.instructor}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0.5rem 0",
                    }}
                  >
                    <FaClock
                      style={{ marginRight: "0.5rem", color: "#4caf50" }}
                    />
                    <span>
                      <strong>Horário:</strong>{" "}
                      {formatClassTime(
                        selectedClass.startTime,
                        selectedClass.duration
                      )}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0.5rem 0",
                    }}
                  >
                    <FaMapMarkerAlt
                      style={{ marginRight: "0.5rem", color: "#f44336" }}
                    />
                    <span>
                      <strong>Local:</strong> {selectedClass.room}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0.5rem 0",
                    }}
                  >
                    <FaUsers
                      style={{ marginRight: "0.5rem", color: "#ff9800" }}
                    />
                    <span>
                      <strong>Participantes:</strong>{" "}
                      {selectedClass.participants}/{selectedClass.capacity}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "1rem",
                      marginTop: "2rem",
                    }}
                  >
                    <Button
                      color="secondary"
                      onClick={() => setModalMode("edit")}
                    >
                      <FaEdit /> Editar
                    </Button>
                    <Button color="danger">
                      <FaTrash /> Excluir
                    </Button>
                  </div>
                </div>
              )}

              {/* Formulário para adicionar/editar atividade */}
              {(modalMode === "add" || modalMode === "edit") && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Formulário enviado");
                    closeModal();
                  }}
                >
                  <FormGroup>
                    <FormLabel htmlFor="title">Título</FormLabel>
                    <FormInput
                      id="title"
                      type="text"
                      required
                      placeholder="Ex: Treinamento Funcional"
                      defaultValue={selectedClass?.title || ""}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="instructor">Profissional</FormLabel>
                    <FormSelect
                      id="instructor"
                      required
                      defaultValue={selectedClass?.instructor || ""}
                    >
                      <option value="">Selecione o profissional</option>
                      {profissionais.map((prof) => (
                        <option key={prof.id} value={prof.nome}>
                          {prof.nome} - {prof.especialidade}
                        </option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <FormGroup>
                      <FormLabel htmlFor="day">Dia da Semana</FormLabel>
                      <FormSelect
                        id="day"
                        required
                        defaultValue={selectedClass?.day || ""}
                      >
                        <option value="">Selecione o dia</option>
                        <option value="1">Segunda-feira</option>
                        <option value="2">Terça-feira</option>
                        <option value="3">Quarta-feira</option>
                        <option value="4">Quinta-feira</option>
                        <option value="5">Sexta-feira</option>
                        <option value="6">Sábado</option>
                        <option value="0">Domingo</option>
                      </FormSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="type">Tipo</FormLabel>
                      <FormSelect
                        id="type"
                        required
                        defaultValue={selectedClass?.type || ""}
                      >
                        <option value="">Selecione o tipo</option>
                        <option value="funcional">Aula/Treinamento</option>
                        <option value="yoga">Yoga/Pilates</option>
                        <option value="consulta">Consulta</option>
                        <option value="avaliacao">Avaliação</option>
                      </FormSelect>
                    </FormGroup>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <FormGroup>
                      <FormLabel htmlFor="startTime">
                        Horário de Início
                      </FormLabel>
                      <FormSelect
                        id="startTime"
                        required
                        defaultValue={selectedClass?.startTime || ""}
                      >
                        <option value="">Selecione o horário</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {formatTimeSlot(time)}
                          </option>
                        ))}
                      </FormSelect>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="duration">Duração</FormLabel>
                      <FormSelect
                        id="duration"
                        required
                        defaultValue={selectedClass?.duration || ""}
                      >
                        <option value="">Selecione a duração</option>
                        <option value="0.5">30 minutos</option>
                        <option value="1">1 hora</option>
                        <option value="1.5">1 hora e 30 minutos</option>
                        <option value="2">2 horas</option>
                      </FormSelect>
                    </FormGroup>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <FormGroup>
                      <FormLabel htmlFor="room">Sala/Local</FormLabel>
                      <FormInput
                        id="room"
                        type="text"
                        required
                        placeholder="Ex: Sala 2"
                        defaultValue={selectedClass?.room || ""}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="capacity">Capacidade</FormLabel>
                      <FormInput
                        id="capacity"
                        type="number"
                        required
                        min="1"
                        placeholder="Ex: 15"
                        defaultValue={selectedClass?.capacity || ""}
                      />
                    </FormGroup>
                  </div>

                  <ModalFooter>
                    <Button
                      type="button"
                      color="secondary"
                      onClick={closeModal}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" color="primary">
                      {modalMode === "add" ? "Adicionar" : "Salvar Alterações"}
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      <MobileScheduleView>
        {currentWeek.map((day, index) => (
          <MobileDay key={index}>
            <MobileDayHeader>
              {formatDate(day)}
              <MobileDayOfWeek>{formatDayOfWeek(day)}</MobileDayOfWeek>
            </MobileDayHeader>
            <MobileClassList>
              {filteredClasses
                .filter(
                  (classItem) =>
                    classItem.day === (day.getDay() === 0 ? 7 : day.getDay())
                )
                .sort((a, b) => a.startTime - b.startTime)
                .map((classItem) => (
                  <MobileClassItem key={classItem.id}>
                    <MobileClassTime type={classItem.type}>
                      {formatTimeSlot(classItem.startTime)}
                    </MobileClassTime>
                    <MobileClassInfo>
                      <div className="title">{classItem.title}</div>
                      <div className="instructor">
                        <FaChalkboardTeacher />
                        {classItem.instructor}
                      </div>
                    </MobileClassInfo>
                    <MobileClassActions>
                      <Button
                        size="sm"
                        color="transparent"
                        onClick={() => openModal(classItem, "view")}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        size="sm"
                        color="transparent"
                        onClick={() => openModal(classItem, "edit")}
                      >
                        <FaEdit />
                      </Button>
                    </MobileClassActions>
                  </MobileClassItem>
                ))}
              {filteredClasses.filter(
                (classItem) =>
                  classItem.day === (day.getDay() === 0 ? 7 : day.getDay())
              ).length === 0 && (
                <MobileClassItem>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      padding: "1rem",
                      color: "#999",
                    }}
                  >
                    Sem aulas agendadas
                  </div>
                </MobileClassItem>
              )}
            </MobileClassList>
          </MobileDay>
        ))}
      </MobileScheduleView>

      {/* Botão flutuante para adicionar atividade em mobile */}
      <FloatingAddButton color="primary" onClick={handleAddNewClass}>
        <FaPlus />
      </FloatingAddButton>
    </Section>
  );
};

export default SchedulePage;
