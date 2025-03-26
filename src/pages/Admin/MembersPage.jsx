import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaDownload,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaIdCard,
  FaWeight,
  FaRuler,
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

const MembersTable = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.lightGray};

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const TableBody = styled.tbody`
  tr {
    &:hover {
      background: ${({ theme }) => theme.colors.bgLight};
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  td {
    padding: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const MemberAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
`;

const MemberName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const MemberEmail = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;

  ${({ status, theme }) => {
    if (status === "active") {
      return `
        background-color: ${theme.colors.successLight};
        color: ${theme.colors.success};
      `;
    } else if (status === "pending") {
      return `
        background-color: ${theme.colors.warningLight};
        color: ${theme.colors.warning};
      `;
    } else {
      return `
        background-color: ${theme.colors.dangerLight};
        color: ${theme.colors.danger};
      `;
    }
  }}
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled(Button)`
  padding: 0.5rem;
  min-width: unset;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const PageInfo = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const PageSelector = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.textSecondary};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.border};
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.bgLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
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

const MembersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dados de exemplo de alunos da academia
  const members = [
    {
      id: 1,
      name: "Carlos Oliveira",
      username: "ALUNO123",
      password: "123ALUNO",
      email: "carlos.oliveira@gmail.com",
      phone: "(11) 98765-4321",
      birthDate: "15/05/1992",
      joinDate: "10/01/2023",
      status: "active",
      plan: "Premium Anual",
      expireDate: "10/01/2024",
      lastVisit: "15/11/2023",
      measures: {
        height: 178,
        weight: 83,
        bodyFat: 15,
        lastUpdate: "01/11/2023",
      },
      address: "Av. Paulista, 1500 - São Paulo, SP",
    },
    {
      id: 2,
      name: "Mariana Santos",
      username: "MARI456",
      password: "456MARI",
      email: "mariana.santos@hotmail.com",
      phone: "(11) 97654-3210",
      birthDate: "22/08/1995",
      joinDate: "05/02/2023",
      status: "active",
      plan: "Básico Mensal",
      expireDate: "05/12/2023",
      lastVisit: "12/11/2023",
      measures: {
        height: 165,
        weight: 58,
        bodyFat: 22,
        lastUpdate: "05/11/2023",
      },
      address: "Rua Augusta, 500 - São Paulo, SP",
    },
    {
      id: 3,
      name: "Paulo Mendes",
      username: "PAUL789",
      password: "789PAUL",
      email: "paulo.mendes@gmail.com",
      phone: "(11) 91234-5678",
      birthDate: "10/12/1988",
      joinDate: "15/09/2022",
      status: "inactive",
      plan: "Premium Trimestral",
      expireDate: "15/09/2023",
      lastVisit: "10/08/2023",
      measures: {
        height: 182,
        weight: 90,
        bodyFat: 18,
        lastUpdate: "15/07/2023",
      },
      address: "Rua Oscar Freire, 700 - São Paulo, SP",
    },
    {
      id: 4,
      name: "Fernanda Lima",
      username: "FERN101",
      password: "101FERN",
      email: "fernanda.lima@outlook.com",
      phone: "(11) 99876-5432",
      birthDate: "28/03/1990",
      joinDate: "20/03/2023",
      status: "pending",
      plan: "Básico Trimestral",
      expireDate: "20/12/2023",
      lastVisit: "10/11/2023",
      measures: {
        height: 170,
        weight: 65,
        bodyFat: 24,
        lastUpdate: "01/11/2023",
      },
      address: "Av. Rebouças, 900 - São Paulo, SP",
    },
    {
      id: 5,
      name: "Roberto Alves",
      username: "ROBI234",
      password: "234ROBI",
      email: "roberto.alves@gmail.com",
      phone: "(11) 98877-6655",
      birthDate: "15/07/1985",
      joinDate: "05/01/2023",
      status: "active",
      plan: "Premium Mensal",
      expireDate: "05/12/2023",
      lastVisit: "14/11/2023",
      measures: {
        height: 175,
        weight: 78,
        bodyFat: 16,
        lastUpdate: "10/11/2023",
      },
      address: "Rua Consolação, 1200 - São Paulo, SP",
    },
    {
      id: 6,
      name: "Juliana Costa",
      username: "JULI567",
      password: "567JULI",
      email: "juliana.costa@yahoo.com",
      phone: "(11) 95544-3322",
      birthDate: "02/11/1993",
      joinDate: "10/05/2023",
      status: "active",
      plan: "Básico Anual",
      expireDate: "10/05/2024",
      lastVisit: "13/11/2023",
      measures: {
        height: 168,
        weight: 62,
        bodyFat: 21,
        lastUpdate: "05/10/2023",
      },
      address: "Av. Brigadeiro Faria Lima, 1500 - São Paulo, SP",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const openModal = (member, mode = "view") => {
    setSelectedMember(member);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  // Filtrar membros com base na pesquisa e filtro de status
  const filteredMembers = members.filter((member) => {
    // Filtro de texto
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.plan.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro de status
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Paginação
  const membersPerPage = 5;
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + membersPerPage
  );

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "pending":
        return "Pendente";
      default:
        return "Desconhecido";
    }
  };

  const formatDate = (dateString) => {
    return dateString;
  };

  const daysToExpire = (expireDate) => {
    const today = new Date();
    const parts = expireDate.split("/");
    const expire = new Date(parts[2], parts[1] - 1, parts[0]);
    const diffTime = expire - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Section>
      <PageHeader>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar aluno..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button color="primary">
            <FaSearch />
          </Button>
        </SearchContainer>

        <ButtonsContainer>
          <Button
            color={statusFilter === "all" ? "primary" : "secondary"}
            onClick={() => setStatusFilter("all")}
          >
            Todos
          </Button>
          <Button
            color={statusFilter === "active" ? "primary" : "secondary"}
            onClick={() => setStatusFilter("active")}
          >
            Ativos
          </Button>
          <Button
            color={statusFilter === "pending" ? "primary" : "secondary"}
            onClick={() => setStatusFilter("pending")}
          >
            Pendentes
          </Button>
          <Button
            color={statusFilter === "inactive" ? "primary" : "secondary"}
            onClick={() => setStatusFilter("inactive")}
          >
            Inativos
          </Button>
          <Button color="primary" onClick={() => openModal(null, "add")}>
            <FaPlus /> Novo Aluno
          </Button>
        </ButtonsContainer>
      </PageHeader>

      <MembersTable>
        <Table>
          <TableHead>
            <tr>
              <th>Aluno</th>
              <th>Plano</th>
              <th>Status</th>
              <th>Vencimento</th>
              <th>Última Visita</th>
              <th>Ações</th>
            </tr>
          </TableHead>
          <TableBody>
            {paginatedMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <NameCell>
                    <MemberAvatar>{member.name.charAt(0)}</MemberAvatar>
                    <div>
                      <MemberName>{member.name}</MemberName>
                      <MemberEmail>{member.email}</MemberEmail>
                    </div>
                  </NameCell>
                </td>
                <td>{member.plan}</td>
                <td>
                  <StatusBadge status={member.status}>
                    {getStatusLabel(member.status)}
                  </StatusBadge>
                </td>
                <td>
                  {member.expireDate}
                  {member.status === "active" &&
                    daysToExpire(member.expireDate) <= 15 && (
                      <span
                        style={{
                          color: "red",
                          marginLeft: "5px",
                          fontSize: "0.8rem",
                        }}
                      >
                        ({daysToExpire(member.expireDate)} dias)
                      </span>
                    )}
                </td>
                <td>{member.lastVisit}</td>
                <td>
                  <ActionsCell>
                    <IconButton
                      title="Ver Detalhes"
                      color="secondary"
                      onClick={() => openModal(member, "view")}
                    >
                      <FaEye />
                    </IconButton>
                    <IconButton
                      title="Editar"
                      color="primary"
                      onClick={() => openModal(member, "edit")}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      title="Excluir"
                      color="danger"
                      onClick={() => console.log("Excluir", member.id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </ActionsCell>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PageInfo>
            Mostrando {startIndex + 1}-
            {Math.min(startIndex + membersPerPage, filteredMembers.length)} de{" "}
            {filteredMembers.length} alunos
          </PageInfo>
          <PageSelector>
            <PageButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </PageButton>
            {[...Array(totalPages)].map((_, index) => (
              <PageButton
                key={index}
                $active={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
            <PageButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </PageButton>
          </PageSelector>
        </Pagination>
      </MembersTable>

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
                  ? "Adicionar Novo Aluno"
                  : modalMode === "edit"
                  ? "Editar Aluno"
                  : "Detalhes do Aluno"}
              </ModalTitle>
              <button onClick={closeModal}>&times;</button>
            </ModalHeader>
            <ModalBody>
              {/* Vista de detalhes */}
              {selectedMember && modalMode === "view" && (
                <div>
                  <h3>{selectedMember.name}</h3>

                  <div style={{ marginBottom: "1rem" }}>
                    <p>
                      <FaIdCard /> Username: {selectedMember.username}
                    </p>
                    <p>
                      <FaEnvelope /> {selectedMember.email}
                    </p>
                    <p>
                      <FaPhone /> {selectedMember.phone}
                    </p>
                    <p>
                      <FaCalendarAlt /> Data de Nascimento:{" "}
                      {selectedMember.birthDate}
                    </p>
                  </div>

                  <hr />

                  <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                    <h4>Informações do Plano</h4>
                    <p>Plano: {selectedMember.plan}</p>
                    <p>Data de Adesão: {selectedMember.joinDate}</p>
                    <p>Data de Vencimento: {selectedMember.expireDate}</p>
                    <p>Status: {getStatusLabel(selectedMember.status)}</p>
                    <p>Última Visita: {selectedMember.lastVisit}</p>
                  </div>

                  <hr />

                  <div style={{ marginTop: "1rem" }}>
                    <h4>Medidas</h4>
                    <p>
                      <FaRuler /> Altura: {selectedMember.measures.height} cm
                    </p>
                    <p>
                      <FaWeight /> Peso: {selectedMember.measures.weight} kg
                    </p>
                    <p>
                      % Gordura Corporal: {selectedMember.measures.bodyFat}%
                    </p>
                    <p>
                      Última Atualização: {selectedMember.measures.lastUpdate}
                    </p>
                  </div>
                </div>
              )}

              {/* Formulário para adicionar ou editar aluno */}
              {(modalMode === "add" || modalMode === "edit") && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Formulário de aluno enviado");
                    closeModal();
                  }}
                >
                  <FormRow cols={2}>
                    <FormGroup>
                      <FormLabel htmlFor="name">Nome Completo</FormLabel>
                      <FormInput
                        id="name"
                        type="text"
                        required
                        placeholder="Ex: João Silva"
                        defaultValue={selectedMember?.name || ""}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <FormInput
                        id="username"
                        type="text"
                        required
                        placeholder="Ex: JOAO123"
                        defaultValue={selectedMember?.username || ""}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow cols={2}>
                    <FormGroup>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormInput
                        id="email"
                        type="email"
                        required
                        placeholder="Ex: joao.silva@email.com"
                        defaultValue={selectedMember?.email || ""}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="phone">Telefone</FormLabel>
                      <FormInput
                        id="phone"
                        type="text"
                        required
                        placeholder="Ex: (11) 98765-4321"
                        defaultValue={selectedMember?.phone || ""}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow cols={2}>
                    <FormGroup>
                      <FormLabel htmlFor="birthDate">
                        Data de Nascimento
                      </FormLabel>
                      <FormInput
                        id="birthDate"
                        type="text"
                        required
                        placeholder="Ex: 15/05/1990"
                        defaultValue={selectedMember?.birthDate || ""}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="joinDate">Data de Adesão</FormLabel>
                      <FormInput
                        id="joinDate"
                        type="text"
                        required
                        placeholder="Ex: 10/01/2023"
                        defaultValue={selectedMember?.joinDate || ""}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow cols={2}>
                    <FormGroup>
                      <FormLabel htmlFor="plan">Plano</FormLabel>
                      <FormSelect
                        id="plan"
                        required
                        defaultValue={selectedMember?.plan || ""}
                      >
                        <option value="">Selecione o plano</option>
                        <option value="Básico Mensal">Básico Mensal</option>
                        <option value="Básico Trimestral">
                          Básico Trimestral
                        </option>
                        <option value="Básico Anual">Básico Anual</option>
                        <option value="Premium Mensal">Premium Mensal</option>
                        <option value="Premium Trimestral">
                          Premium Trimestral
                        </option>
                        <option value="Premium Anual">Premium Anual</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="expireDate">
                        Data de Vencimento
                      </FormLabel>
                      <FormInput
                        id="expireDate"
                        type="text"
                        required
                        placeholder="Ex: 10/01/2024"
                        defaultValue={selectedMember?.expireDate || ""}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <FormSelect
                      id="status"
                      required
                      defaultValue={selectedMember?.status || "active"}
                    >
                      <option value="active">Ativo</option>
                      <option value="pending">Pendente</option>
                      <option value="inactive">Inativo</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="address">Endereço</FormLabel>
                    <FormInput
                      id="address"
                      type="text"
                      required
                      placeholder="Ex: Av. Paulista, 1500 - São Paulo, SP"
                      defaultValue={selectedMember?.address || ""}
                    />
                  </FormGroup>

                  <h4>Medidas</h4>
                  <FormRow cols={3}>
                    <FormGroup>
                      <FormLabel htmlFor="height">Altura (cm)</FormLabel>
                      <FormInput
                        id="height"
                        type="number"
                        placeholder="Ex: 175"
                        defaultValue={selectedMember?.measures?.height || ""}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="weight">Peso (kg)</FormLabel>
                      <FormInput
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 70.5"
                        defaultValue={selectedMember?.measures?.weight || ""}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="bodyFat">
                        % Gordura Corporal
                      </FormLabel>
                      <FormInput
                        id="bodyFat"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 15.5"
                        defaultValue={selectedMember?.measures?.bodyFat || ""}
                      />
                    </FormGroup>
                  </FormRow>

                  {modalMode === "add" && (
                    <FormRow cols={2}>
                      <FormGroup>
                        <FormLabel htmlFor="password">Senha</FormLabel>
                        <FormInput
                          id="password"
                          type="password"
                          required
                          placeholder="Digite a senha"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="confirmPassword">
                          Confirmar Senha
                        </FormLabel>
                        <FormInput
                          id="confirmPassword"
                          type="password"
                          required
                          placeholder="Confirme a senha"
                        />
                      </FormGroup>
                    </FormRow>
                  )}

                  <ModalFooter>
                    <Button
                      color="secondary"
                      type="button"
                      onClick={closeModal}
                    >
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      {modalMode === "add"
                        ? "Adicionar Aluno"
                        : "Salvar Alterações"}
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </Section>
  );
};

export default MembersPage;
