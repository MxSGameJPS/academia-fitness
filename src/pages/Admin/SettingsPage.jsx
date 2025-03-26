import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUser,
  FaUserPlus,
  FaUsersCog,
  FaUserTimes,
  FaCog,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaPlus,
  FaUserCheck,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  border-bottom: 2px solid
    ${({ active, theme }) => (active ? theme.colors.primary : "transparent")};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const ContentPanel = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
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
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.lightGray};

  th {
    padding: 0.75rem 1rem;
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
    padding: 0.75rem 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
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
  padding: 0.4rem;
  min-width: unset;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
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
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$cols || 1}, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  // Dados de exemplo de profissionais
  const staffData = [
    {
      id: 1,
      name: "Pedro Oliveira",
      role: "Instrutor",
      specialty: "Musculação",
      status: "active",
      email: "pedro.oliveira@academia.com",
      phone: "(11) 98765-4321",
    },
    {
      id: 2,
      name: "Ana Costa",
      role: "Instrutora",
      specialty: "Funcional",
      status: "active",
      email: "ana.costa@academia.com",
      phone: "(11) 97654-3210",
    },
    {
      id: 3,
      name: "Marina Silva",
      role: "Instrutora",
      specialty: "Yoga",
      status: "active",
      email: "marina.silva@academia.com",
      phone: "(11) 96543-2109",
    },
    {
      id: 4,
      name: "Carlos Santos",
      role: "Instrutor",
      specialty: "Spinning",
      status: "pending",
      email: "carlos.santos@academia.com",
      phone: "(11) 95432-1098",
    },
  ];

  // Dados de exemplo de alunos inadimplentes
  const delinquentStudents = [
    {
      id: 1,
      name: "Marcos Pereira",
      plan: "Premium Mensal",
      daysOverdue: 15,
      amount: "R$ 189,90",
      status: "inactive",
      email: "marcos@email.com",
      phone: "(11) 99876-5432",
    },
    {
      id: 2,
      name: "Carla Oliveira",
      plan: "Básico Trimestral",
      daysOverdue: 30,
      amount: "R$ 249,90",
      status: "inactive",
      email: "carla@email.com",
      phone: "(11) 98765-4321",
    },
    {
      id: 3,
      name: "Roberto Almeida",
      plan: "Padrão Mensal",
      daysOverdue: 5,
      amount: "R$ 129,90",
      status: "inactive",
      email: "roberto@email.com",
      phone: "(11) 97654-3210",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (item, mode = "view") => {
    setSelectedItem(item);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDelinquents = delinquentStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section>
      <PageHeader>
        <h2>Configurações</h2>
      </PageHeader>

      <TabsContainer>
        <Tab
          active={activeTab === "staff"}
          onClick={() => setActiveTab("staff")}
        >
          <FaChalkboardTeacher /> Profissionais
        </Tab>
        <Tab
          active={activeTab === "delinquent"}
          onClick={() => setActiveTab("delinquent")}
        >
          <FaUserTimes /> Inadimplentes
        </Tab>
        <Tab
          active={activeTab === "newStaff"}
          onClick={() => setActiveTab("newStaff")}
        >
          <FaUserPlus /> Cadastrar Profissional
        </Tab>
        <Tab
          active={activeTab === "newStudent"}
          onClick={() => setActiveTab("newStudent")}
        >
          <FaUserPlus /> Cadastrar Aluno
        </Tab>
      </TabsContainer>

      <ContentPanel>
        {activeTab === "staff" && (
          <>
            <SectionTitle>
              <FaChalkboardTeacher /> Gerenciar Profissionais
            </SectionTitle>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Buscar profissionais..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button color="primary">
                <FaSearch />
              </Button>
              <Button color="primary" onClick={() => setActiveTab("newStaff")}>
                <FaPlus /> Novo Profissional
              </Button>
            </SearchContainer>

            <Table>
              <TableHead>
                <tr>
                  <th>Nome</th>
                  <th>Função</th>
                  <th>Especialidade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </TableHead>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <tr key={staff.id}>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.specialty}</td>
                    <td>
                      <StatusBadge status={staff.status}>
                        {getStatusLabel(staff.status)}
                      </StatusBadge>
                    </td>
                    <td>
                      <ActionsCell>
                        <IconButton
                          title="Ver Detalhes"
                          color="secondary"
                          onClick={() => openModal(staff, "view")}
                        >
                          <FaEye />
                        </IconButton>
                        <IconButton
                          title="Editar"
                          color="primary"
                          onClick={() => openModal(staff, "edit")}
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          title="Desativar"
                          color="danger"
                          onClick={() => console.log("Desativar", staff.id)}
                        >
                          <FaUserTimes />
                        </IconButton>
                      </ActionsCell>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        {activeTab === "delinquent" && (
          <>
            <SectionTitle>
              <FaUserTimes /> Alunos Inadimplentes
            </SectionTitle>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Buscar alunos inadimplentes..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button color="primary">
                <FaSearch />
              </Button>
            </SearchContainer>

            <Table>
              <TableHead>
                <tr>
                  <th>Nome</th>
                  <th>Plano</th>
                  <th>Dias em Atraso</th>
                  <th>Valor Pendente</th>
                  <th>Ações</th>
                </tr>
              </TableHead>
              <TableBody>
                {filteredDelinquents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.plan}</td>
                    <td>{student.daysOverdue}</td>
                    <td>{student.amount}</td>
                    <td>
                      <ActionsCell>
                        <IconButton
                          title="Ver Detalhes"
                          color="secondary"
                          onClick={() => openModal(student, "view")}
                        >
                          <FaEye />
                        </IconButton>
                        <IconButton
                          title="Marcar como Pago"
                          color="success"
                          onClick={() =>
                            console.log("Marcar como pago", student.id)
                          }
                        >
                          <FaUserCheck />
                        </IconButton>
                      </ActionsCell>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        {activeTab === "newStaff" && (
          <>
            <SectionTitle>
              <FaUserPlus /> Cadastrar Novo Profissional
            </SectionTitle>
            <FormContainer>
              <FormRow $cols={2}>
                <FormGroup>
                  <FormLabel htmlFor="name">Nome Completo</FormLabel>
                  <FormInput id="name" type="text" />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput id="email" type="email" />
                </FormGroup>
              </FormRow>

              <FormRow $cols={2}>
                <FormGroup>
                  <FormLabel htmlFor="phone">Telefone</FormLabel>
                  <FormInput id="phone" type="tel" />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="role">Função</FormLabel>
                  <FormSelect id="role">
                    <option value="">Selecione a função</option>
                    <option value="Instrutor">Instrutor</option>
                    <option value="Nutricionista">Nutricionista</option>
                    <option value="Fisioterapeuta">Fisioterapeuta</option>
                    <option value="Recepcionista">Recepcionista</option>
                    <option value="Gerente">Gerente</option>
                  </FormSelect>
                </FormGroup>
              </FormRow>

              <FormRow $cols={2}>
                <FormGroup>
                  <FormLabel htmlFor="specialty">Especialidade</FormLabel>
                  <FormSelect id="specialty">
                    <option value="">Selecione a especialidade</option>
                    <option value="Musculação">Musculação</option>
                    <option value="Funcional">Funcional</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Spinning">Spinning</option>
                    <option value="Pilates">Pilates</option>
                    <option value="Nutrição">Nutrição</option>
                    <option value="Fisioterapia">Fisioterapia</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <FormSelect id="status">
                    <option value="active">Ativo</option>
                    <option value="pending">Pendente</option>
                    <option value="inactive">Inativo</option>
                  </FormSelect>
                </FormGroup>
              </FormRow>

              <FormRow $cols={2}>
                <FormGroup>
                  <FormLabel htmlFor="username">Nome de Usuário</FormLabel>
                  <FormInput id="username" type="text" />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <FormInput id="password" type="password" />
                </FormGroup>
              </FormRow>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <Button color="secondary" onClick={() => setActiveTab("staff")}>
                  Cancelar
                </Button>
                <Button color="primary">Cadastrar Profissional</Button>
              </div>
            </FormContainer>
          </>
        )}

        {activeTab === "newStudent" && (
          <>
            <SectionTitle>
              <FaUserPlus /> Cadastrar Novo Aluno
            </SectionTitle>
            <FormContainer>
              <FormRow $cols={2}>
                <FormGroup>
                  <FormLabel htmlFor="name">Nome Completo</FormLabel>
                  <FormInput id="name" type="text" />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput id="email" type="email" />
                </FormGroup>
              </FormRow>

              <FormRow $cols={2}>
                <FormGroup>
                  <FormLabel htmlFor="phone">Telefone</FormLabel>
                  <FormInput id="phone" type="tel" />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="birthDate">Data de Nascimento</FormLabel>
                  <FormInput id="birthDate" type="date" />
                </FormGroup>
              </FormRow>

              <FormRow $cols={2}>
                <FormGroup>
                  <FormLabel htmlFor="plan">Plano</FormLabel>
                  <FormSelect id="plan">
                    <option value="">Selecione o plano</option>
                    <option value="Básico Mensal">Básico Mensal</option>
                    <option value="Básico Trimestral">Básico Trimestral</option>
                    <option value="Básico Anual">Básico Anual</option>
                    <option value="Padrão Mensal">Padrão Mensal</option>
                    <option value="Padrão Trimestral">Padrão Trimestral</option>
                    <option value="Padrão Anual">Padrão Anual</option>
                    <option value="Premium Mensal">Premium Mensal</option>
                    <option value="Premium Trimestral">
                      Premium Trimestral
                    </option>
                    <option value="Premium Anual">Premium Anual</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="joinDate">Data de Ingresso</FormLabel>
                  <FormInput id="joinDate" type="date" />
                </FormGroup>
              </FormRow>

              <FormRow $cols={2}>
                <FormGroup>
                  <FormLabel htmlFor="username">Nome de Usuário</FormLabel>
                  <FormInput id="username" type="text" />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <FormInput id="password" type="password" />
                </FormGroup>
              </FormRow>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <Button
                  color="secondary"
                  onClick={() => setActiveTab("delinquent")}
                >
                  Cancelar
                </Button>
                <Button color="primary">Cadastrar Aluno</Button>
              </div>
            </FormContainer>
          </>
        )}
      </ContentPanel>

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
                {modalMode === "view" ? selectedItem?.name : "Editar"}
              </ModalTitle>
              <button onClick={closeModal}>&times;</button>
            </ModalHeader>
            <div style={{ padding: "1.5rem" }}>
              {selectedItem && (
                <>
                  {activeTab === "staff" ? (
                    <div>
                      <p>
                        <strong>Nome:</strong> {selectedItem.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedItem.email}
                      </p>
                      <p>
                        <strong>Telefone:</strong> {selectedItem.phone}
                      </p>
                      <p>
                        <strong>Função:</strong> {selectedItem.role}
                      </p>
                      <p>
                        <strong>Especialidade:</strong> {selectedItem.specialty}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {getStatusLabel(selectedItem.status)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <strong>Nome:</strong> {selectedItem.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedItem.email}
                      </p>
                      <p>
                        <strong>Telefone:</strong> {selectedItem.phone}
                      </p>
                      <p>
                        <strong>Plano:</strong> {selectedItem.plan}
                      </p>
                      <p>
                        <strong>Dias em Atraso:</strong>{" "}
                        {selectedItem.daysOverdue}
                      </p>
                      <p>
                        <strong>Valor Pendente:</strong> {selectedItem.amount}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Section>
  );
};

export default SettingsPage;
