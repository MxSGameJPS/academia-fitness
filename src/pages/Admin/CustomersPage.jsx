import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaDownload,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
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

const CustomerTable = styled.div`
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

const CustomerAvatar = styled.div`
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

const CustomerName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CustomerEmail = styled.div`
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
    } else if (status === "inactive") {
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

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textTertiary};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
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
  grid-template-columns: repeat(${(props) => props.$cols || 1}, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  // Dados de exemplo de clientes que compraram produtos pelo site
  const clientes = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@gmail.com",
      phone: "(11) 98765-4321",
      status: "active",
      orders: 5,
      totalSpent: "R$ 789,50",
      lastPurchase: "15/11/2023",
      address: "Rua dos Ipês, 123 - São Paulo, SP",
    },
    {
      id: 2,
      name: "João Oliveira",
      email: "joao.oliveira@hotmail.com",
      phone: "(21) 97654-3210",
      status: "active",
      orders: 3,
      totalSpent: "R$ 455,80",
      lastPurchase: "22/10/2023",
      address: "Av. Atlântica, 500 - Rio de Janeiro, RJ",
    },
    {
      id: 3,
      name: "Ana Santos",
      email: "ana.santos@gmail.com",
      phone: "(31) 98877-6655",
      status: "inactive",
      orders: 1,
      totalSpent: "R$ 129,90",
      lastPurchase: "05/08/2023",
      address: "Rua das Flores, 45 - Belo Horizonte, MG",
    },
    {
      id: 4,
      name: "Carlos Ferreira",
      email: "carlos.ferreira@yahoo.com",
      phone: "(41) 99988-7766",
      status: "active",
      orders: 8,
      totalSpent: "R$ 1.245,30",
      lastPurchase: "28/10/2023",
      address: "Rua XV de Novembro, 1001 - Curitiba, PR",
    },
    {
      id: 5,
      name: "Patrícia Mendes",
      email: "patricia.mendes@gmail.com",
      phone: "(51) 98765-0099",
      status: "active",
      orders: 2,
      totalSpent: "R$ 359,80",
      lastPurchase: "12/11/2023",
      address: "Av. Ipiranga, 700 - Porto Alegre, RS",
    },
    {
      id: 6,
      name: "Rafael Costa",
      email: "rafael.costa@outlook.com",
      phone: "(85) 99887-6655",
      status: "inactive",
      orders: 4,
      totalSpent: "R$ 599,70",
      lastPurchase: "30/09/2023",
      address: "Av. Beira Mar, 300 - Fortaleza, CE",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const openModal = (customer, mode = "view") => {
    setSelectedCustomer(customer);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  // Filtrar clientes com base na pesquisa
  const filteredCustomers = clientes.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  // Paginação
  const customersPerPage = 5;
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const startIndex = (currentPage - 1) * customersPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + customersPerPage
  );

  return (
    <Section>
      <PageHeader>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button color="primary">
            <FaSearch />
          </Button>
        </SearchContainer>

        <ButtonsContainer>
          <Button color="secondary">
            <FaDownload /> Exportar
          </Button>
          <Button color="primary" onClick={() => openModal(null, "add")}>
            <FaPlus /> Novo Cliente
          </Button>
        </ButtonsContainer>
      </PageHeader>

      <CustomerTable>
        <Table>
          <TableHead>
            <tr>
              <th>Cliente</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Pedidos</th>
              <th>Total Gasto</th>
              <th>Última Compra</th>
              <th>Ações</th>
            </tr>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <NameCell>
                    <CustomerAvatar>{customer.name.charAt(0)}</CustomerAvatar>
                    <div>
                      <CustomerName>{customer.name}</CustomerName>
                      <CustomerEmail>{customer.email}</CustomerEmail>
                    </div>
                  </NameCell>
                </td>
                <td>{customer.phone}</td>
                <td>
                  <StatusBadge status={customer.status}>
                    {customer.status === "active" ? "Ativo" : "Inativo"}
                  </StatusBadge>
                </td>
                <td>{customer.orders}</td>
                <td>{customer.totalSpent}</td>
                <td>{customer.lastPurchase}</td>
                <td>
                  <ActionsCell>
                    <IconButton
                      title="Ver Detalhes"
                      color="secondary"
                      onClick={() => openModal(customer, "view")}
                    >
                      <FaEye />
                    </IconButton>
                    <IconButton
                      title="Editar"
                      color="primary"
                      onClick={() => openModal(customer, "edit")}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      title="Excluir"
                      color="danger"
                      onClick={() => console.log("Excluir", customer.id)}
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
            {Math.min(startIndex + customersPerPage, filteredCustomers.length)}{" "}
            de {filteredCustomers.length} clientes
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
      </CustomerTable>

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
                  ? "Adicionar Novo Cliente"
                  : modalMode === "edit"
                  ? "Editar Cliente"
                  : "Detalhes do Cliente"}
              </ModalTitle>
              <button onClick={closeModal}>&times;</button>
            </ModalHeader>
            <div style={{ padding: "1.5rem" }}>
              {selectedCustomer && modalMode === "view" && (
                <div>
                  <h3>{selectedCustomer.name}</h3>
                  <p>
                    <FaEnvelope /> {selectedCustomer.email}
                  </p>
                  <p>
                    <FaPhone /> {selectedCustomer.phone}
                  </p>
                  <p>
                    <FaMapMarkerAlt /> {selectedCustomer.address}
                  </p>
                  <hr />
                  <h4>Histórico de Compras</h4>
                  <p>Total de pedidos: {selectedCustomer.orders}</p>
                  <p>Total gasto: {selectedCustomer.totalSpent}</p>
                  <p>Última compra: {selectedCustomer.lastPurchase}</p>
                </div>
              )}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Section>
  );
};

export default CustomersPage;
