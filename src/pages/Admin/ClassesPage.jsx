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
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaMapMarkerAlt,
  FaFilter,
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
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1;
  max-width: 500px;
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
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  span {
    margin: 0 1rem;
    font-weight: 500;
  }
`;

const DateButton = styled(Button)`
  padding: 0.5rem;
  min-width: unset;
`;

const ClassesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ClassCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ClassHeader = styled.div`
  background-color: ${({ theme, type }) => {
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
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClassTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ClassTime = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ClassBody = styled.div`
  padding: 1rem;
`;

const ClassInfo = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;

  svg {
    margin-right: 0.5rem;
    margin-top: 0.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ClassInstructor = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ClassLocation = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ParticipantsList = styled.div`
  margin-top: 1.5rem;
`;

const ParticipantsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  
  h4 {
    margin: 0;
    font-size: 1rem;
  }
`;

const ParticipantItem = styled.div`
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.bgLight};
  }
`;

const ParticipantAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.75rem;
  font-size: 0.8rem;
`;

const ParticipantName = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.9rem;
`;

const ActionsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
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
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const ClassesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  
  // Dados de exemplo para as aulas
  const aulasDoDia = [
    {
      id: 1,
      title: "Musculação Iniciante",
      type: "musculação",
      time: "08:00 - 09:30",
      instructor: "Pedro Oliveira",
      instructorId: 3,
      location: "Sala de Musculação Principal",
      participants: [
        { id: 2, name: "Maria Santos" },
        { id: 4, name: "Fernanda Lima" },
        { id: 5, name: "Roberto Alves" }
      ],
      maxParticipants: 8
    },
    {
      id: 2,
      title: "Funcional Avançado",
      type: "funcional",
      time: "10:00 - 11:00",
      instructor: "Ana Costa",
      instructorId: 1,
      location: "Área Externa",
      participants: [
        { id: 1, name: "Carlos Oliveira" },
        { id: 3, name: "Paulo Mendes" },
        { id: 6, name: "Juliana Costa" }
      ],
      maxParticipants: 12
    },
    {
      id: 3,
      title: "Yoga",
      type: "yoga",
      time: "12:00 - 13:00",
      instructor: "Marina Silva",
      instructorId: 4,
      location: "Sala de Yoga",
      participants: [
        { id: 2, name: "Maria Santos" },
        { id: 4, name: "Fernanda Lima" }
      ],
      maxParticipants: 15
    },
    {
      id: 4,
      title: "Spinning",
      type: "spinning",
      time: "17:30 - 18:30",
      instructor: "Rodrigo Almeida",
      instructorId: 2,
      location: "Sala de Spinning",
      participants: [
        { id: 1, name: "Carlos Oliveira" },
        { id: 5, name: "Roberto Alves" },
        { id: 6, name: "Juliana Costa" }
      ],
      maxParticipants: 10
    },
    {
      id: 5,
      title: "Musculação Avançada",
      type: "musculação",
      time: "19:00 - 20:30",
      instructor: "Pedro Oliveira",
      instructorId: 3,
      location: "Sala de Musculação Principal",
      participants: [
        { id: 3, name: "Paulo Mendes" },
        { id: 1, name: "Carlos Oliveira" }
      ],
      maxParticipants: 8
    }
  ];
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  
  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
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
  
  // Filtrar aulas com base na pesquisa
  const filteredClasses = aulasDoDia.filter(
    (classItem) =>
      classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Section>
      <PageHeader>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar aulas..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button color="primary">
            <FaSearch />
          </Button>
        </SearchContainer>
        
        <ButtonsContainer>
          <Button color="primary" onClick={() => openModal(null, "add")}>
            <FaPlus /> Nova Aula
          </Button>
        </ButtonsContainer>
      </PageHeader>
      
      <DateSelector>
        <DateButton color="secondary" onClick={goToPreviousDay}>
          &lt;
        </DateButton>
        <span>{formatDate(currentDate)}</span>
        <DateButton color="secondary" onClick={goToNextDay}>
          &gt;
        </DateButton>
        <Button color="primary" onClick={goToToday} style={{ marginLeft: '1rem' }}>
          Hoje
        </Button>
      </DateSelector>
      
      {filteredClasses.length > 0 ? (
        <ClassesContainer>
          {filteredClasses.map((classItem) => (
            <ClassCard key={classItem.id}>
              <ClassHeader type={classItem.type}>
                <ClassTitle>{classItem.title}</ClassTitle>
                <ClassTime>
                  <FaClock /> {classItem.time}
                </ClassTime>
              </ClassHeader>
              
              <ClassBody>
                <ClassInfo>
                  <FaChalkboardTeacher />
                  <div>
                    <ClassInstructor>{classItem.instructor}</ClassInstructor>
                  </div>
                </ClassInfo>
                
                <ClassInfo>
                  <FaMapMarkerAlt />
                  <ClassLocation>{classItem.location}</ClassLocation>
                </ClassInfo>
                
                <ParticipantsList>
                  <ParticipantsHeader>
                    <FaUsers />
                    <h4>Alunos ({classItem.participants.length}/{classItem.maxParticipants})</h4>
                  </ParticipantsHeader>
                  
                  {classItem.participants.slice(0, 3).map((participant) => (
                    <ParticipantItem key={participant.id}>
                      <ParticipantAvatar>
                        {participant.name.charAt(0)}
                      </ParticipantAvatar>
                      <ParticipantName>{participant.name}</ParticipantName>
                    </ParticipantItem>
                  ))}
                  
                  {classItem.participants.length > 3 && (
                    <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                      <Button 
                        color="secondary" 
                        onClick={() => openModal(classItem, "view")}
                        style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                      >
                        + {classItem.participants.length - 3} alunos
                      </Button>
                    </div>
                  )}
                </ParticipantsList>
                
                <ActionsContainer>
                  <Button 
                    color="secondary" 
                    onClick={() => openModal(classItem, "view")}
                  >
                    <FaEye /> Detalhes
                  </Button>
                  <Button 
                    color="primary" 
                    onClick={() => openModal(classItem, "edit")}
                  >
                    <FaEdit /> Editar
                  </Button>
                </ActionsContainer>
              </ClassBody>
            </ClassCard>
          ))}
        </ClassesContainer>
      ) : (
        <EmptyState>
          <FaCalendarAlt />
          <h3>Nenhuma aula encontrada</h3>
          <p>Não há aulas agendadas para esta data ou sua busca não retornou resultados.</p>
          <Button color="primary" onClick={() => openModal(null, "add")}>
            <FaPlus /> Adicionar Nova Aula
          </Button>
        </EmptyState>
      )}
      
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
                  ? "Adicionar Nova Aula"
                  : modalMode === "edit"
                  ? "Editar Aula"
                  : `Detalhes da Aula: ${selectedClass?.title}`}
              </ModalTitle>
              <button onClick={closeModal}>&times;</button>
            </ModalHeader>
            <div style={{ padding: "1.5rem" }}>
              {selectedClass && modalMode === "view" && (
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0' }}>{selectedClass.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <FaClock style={{ marginRight: '0.5rem' }} />
                      {selectedClass.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <FaChalkboardTeacher style={{ marginRight: '0.5rem' }} />
                      {selectedClass.instructor}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
                      {selectedClass.location}
                    </div>
                  </div>
                  
                  <hr />
                  
                  <div style={{ marginTop: '1rem' }}>
                    <h4>Lista de Participantes ({selectedClass.participants.length}/{selectedClass.maxParticipants})</h4>
                    {selectedClass.participants.map((participant) => (
                      <ParticipantItem key={participant.id}>
                        <ParticipantAvatar>
                          {participant.name.charAt(0)}
                        </ParticipantAvatar>
                        <ParticipantName>{participant.name}</ParticipantName>
                      </ParticipantItem>
                    ))}
                    
                    {selectedClass.participants.length === 0 && (
                      <p>Nenhum aluno inscrito nesta aula.</p>
                    )}
                    
                    {selectedClass.participants.length < selectedClass.maxParticipants && (
                      <div style={{ marginTop: '1rem' }}>
                        <Button color="primary">
                          <FaPlus /> Adicionar Aluno
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Section>
  );
};

export default ClassesPage; 