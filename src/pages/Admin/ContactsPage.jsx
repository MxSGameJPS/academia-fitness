import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTrash, FaCheck, FaPause, FaSpinner } from "react-icons/fa";
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

const ContactsTable = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  margin-bottom: 2rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1.5fr 1fr;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 1rem;
  font-weight: 600;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const ContactItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1.5fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1.5rem 1rem;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const ContactName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const ContactEmail = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const ContactDate = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &::before {
      content: "Data: ";
      font-weight: 500;
    }
  }
`;

const ContactSubject = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &::before {
      content: "Assunto: ";
      font-weight: 500;
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  color: white;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "novo":
        return theme.colors.primary;
      case "em andamento":
        return theme.colors.warning;
      case "resolvido":
        return theme.colors.success;
      default:
        return theme.colors.textSecondary;
    }
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-self: flex-start;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: ${({ color, theme }) => {
    switch (color) {
      case "danger":
        return theme.colors.error;
      case "success":
        return theme.colors.success;
      case "warning":
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const MessageModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    color: ${({ theme }) => theme.colors.darkAccent};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const MessageInfo = styled.div`
  margin-bottom: 1.5rem;

  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.textSecondary};

    strong {
      color: ${({ theme }) => theme.colors.textPrimary};
      margin-right: 0.5rem;
    }
  }
`;

const MessageContent = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.6;
  }
`;

const StatusActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const StatusButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "em andamento":
        return theme.colors.warning;
      case "resolvido":
        return theme.colors.success;
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    margin-bottom: 0;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.backgroundAlt};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.light : theme.colors.textPrimary};
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.border};
  }
`;

const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

const ContactsPage = () => {
  const contacts = useContactStore((state) => state.contacts);
  const updateContactStatus = useContactStore(
    (state) => state.updateContactStatus
  );
  const deleteContact = useContactStore((state) => state.deleteContact);
  const clearContacts = useContactStore((state) => state.clearContacts);

  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState("todos");

  const handleOpenMessage = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseMessage = () => {
    setSelectedContact(null);
  };

  const handleStatusChange = (id, newStatus) => {
    updateContactStatus(id, newStatus);

    if (selectedContact && selectedContact.id === id) {
      setSelectedContact({
        ...selectedContact,
        status: newStatus,
      });
    }
  };

  const handleDeleteContact = (id) => {
    deleteContact(id);

    if (selectedContact && selectedContact.id === id) {
      setSelectedContact(null);
    }
  };

  const handleClearContacts = () => {
    if (window.confirm("Tem certeza que deseja excluir todos os contatos?")) {
      clearContacts();
      setSelectedContact(null);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === "todos") return true;
    return contact.status === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Gerenciamento de Contatos</Title>
        <Subtitle>
          Visualize e gerencie as mensagens recebidas pelo formulário de contato
        </Subtitle>
      </PageHeader>

      <FilterContainer>
        <FilterButton
          $active={filter === "todos"}
          onClick={() => setFilter("todos")}
        >
          Todos ({contacts.length})
        </FilterButton>
        <FilterButton
          $active={filter === "novo"}
          onClick={() => setFilter("novo")}
        >
          Novos ({contacts.filter((c) => c.status === "novo").length})
        </FilterButton>
        <FilterButton
          $active={filter === "em andamento"}
          onClick={() => setFilter("em andamento")}
        >
          Em andamento (
          {contacts.filter((c) => c.status === "em andamento").length})
        </FilterButton>
        <FilterButton
          $active={filter === "resolvido"}
          onClick={() => setFilter("resolvido")}
        >
          Resolvidos ({contacts.filter((c) => c.status === "resolvido").length})
        </FilterButton>

        {contacts.length > 0 && (
          <ClearButton onClick={handleClearContacts}>Limpar Todos</ClearButton>
        )}
      </FilterContainer>

      <ContactsTable>
        <TableHeader>
          <div>Contato</div>
          <div>Assunto</div>
          <div>Status</div>
          <div>Data</div>
          <div>Ações</div>
        </TableHeader>

        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ContactInfo>
                <ContactName>{contact.name}</ContactName>
                <ContactEmail>{contact.email}</ContactEmail>
              </ContactInfo>

              <ContactSubject>{contact.subject}</ContactSubject>

              <StatusBadge status={contact.status}>
                {contact.status}
              </StatusBadge>

              <ContactDate>{formatDate(contact.date)}</ContactDate>

              <ActionButtons>
                <ActionButton
                  color="primary"
                  onClick={() => handleOpenMessage(contact)}
                  title="Ver mensagem"
                >
                  <FaCheck size={14} />
                </ActionButton>

                {contact.status === "novo" && (
                  <ActionButton
                    color="warning"
                    onClick={() =>
                      handleStatusChange(contact.id, "em andamento")
                    }
                    title="Marcar em andamento"
                  >
                    <FaSpinner size={14} />
                  </ActionButton>
                )}

                {contact.status === "em andamento" && (
                  <ActionButton
                    color="success"
                    onClick={() => handleStatusChange(contact.id, "resolvido")}
                    title="Marcar como resolvido"
                  >
                    <FaCheck size={14} />
                  </ActionButton>
                )}

                <ActionButton
                  color="danger"
                  onClick={() => handleDeleteContact(contact.id)}
                  title="Excluir contato"
                >
                  <FaTrash size={14} />
                </ActionButton>
              </ActionButtons>
            </ContactItem>
          ))
        ) : (
          <EmptyState>
            <h3>Nenhum contato encontrado</h3>
            <p>
              {filter === "todos"
                ? "Não há contatos registrados no sistema."
                : "Não há contatos com o status selecionado."}
            </p>
          </EmptyState>
        )}
      </ContactsTable>

      {selectedContact && (
        <MessageModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseMessage}
        >
          <ModalContent
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <h2>Detalhes do Contato</h2>
              <CloseButton onClick={handleCloseMessage}>×</CloseButton>
            </ModalHeader>

            <MessageInfo>
              <p>
                <strong>Nome:</strong> {selectedContact.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedContact.email}
              </p>
              <p>
                <strong>Telefone:</strong>{" "}
                {selectedContact.phone || "Não informado"}
              </p>
              <p>
                <strong>Assunto:</strong> {selectedContact.subject}
              </p>
              <p>
                <strong>Data:</strong> {formatDate(selectedContact.date)}
              </p>
              <p>
                <strong>Status:</strong>
                <StatusBadge
                  status={selectedContact.status}
                  style={{ marginLeft: "8px" }}
                >
                  {selectedContact.status}
                </StatusBadge>
              </p>
            </MessageInfo>

            <h3>Mensagem</h3>
            <MessageContent>
              <p>{selectedContact.message}</p>
            </MessageContent>

            <StatusActions>
              {selectedContact.status !== "em andamento" && (
                <StatusButton
                  status="em andamento"
                  onClick={() =>
                    handleStatusChange(selectedContact.id, "em andamento")
                  }
                >
                  <FaPause size={14} />
                  Marcar Em Andamento
                </StatusButton>
              )}

              {selectedContact.status !== "resolvido" && (
                <StatusButton
                  status="resolvido"
                  onClick={() =>
                    handleStatusChange(selectedContact.id, "resolvido")
                  }
                >
                  <FaCheck size={14} />
                  Marcar Resolvido
                </StatusButton>
              )}

              <StatusButton
                status="delete"
                onClick={() => {
                  handleDeleteContact(selectedContact.id);
                  handleCloseMessage();
                }}
                style={{ backgroundColor: "#dc3545" }}
              >
                <FaTrash size={14} />
                Excluir
              </StatusButton>
            </StatusActions>
          </ModalContent>
        </MessageModal>
      )}
    </PageContainer>
  );
};

export default ContactsPage;
