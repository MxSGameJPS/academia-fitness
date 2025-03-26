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
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaUserCheck,
  FaCheck,
  FaTimes,
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

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PlanHeader = styled.div`
  background-color: ${({ theme, type }) => {
    switch (type) {
      case "básico":
        return theme.colors.info;
      case "padrão":
        return theme.colors.success;
      case "premium":
        return theme.colors.primary;
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  padding: 1.5rem;
  text-align: center;
`;

const PlanTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PlanDuration = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const PlanBody = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
`;

const PlanFeatureItem = styled.li`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ available, theme }) =>
      available ? theme.colors.success : theme.colors.danger};
  }
`;

const PlanStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled(Button)`
  flex: 1;
  min-width: 90px;
  padding: 0.5rem;
  font-size: 0.85rem;

  svg {
    margin-right: 4px;
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FormCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const FormCheckbox = styled.input`
  margin-right: 0.5rem;
`;

const FormCheckboxLabel = styled.label`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const IconButton = styled(Button)`
  padding: 0.5rem;
  min-width: unset;
`;

const PlansPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  // Dados de exemplo para os planos
  const planos = [
    {
      id: 1,
      name: "Plano Básico",
      type: "básico",
      price: "R$ 89,90",
      duration: "Mensal",
      description: "Ideal para quem está começando a treinar",
      activeMembers: 45,
      totalSold: 120,
      features: [
        {
          id: 1,
          name: "Acesso à academia em horário comercial",
          available: true,
        },
        { id: 2, name: "Uso de equipamentos de musculação", available: true },
        { id: 3, name: "Aulas coletivas", available: false },
        { id: 4, name: "Avaliação física", available: false },
        { id: 5, name: "Plano de treino personalizado", available: false },
        { id: 6, name: "Acesso ao espaço de bem-estar", available: false },
      ],
    },
    {
      id: 2,
      name: "Plano Padrão",
      type: "padrão",
      price: "R$ 129,90",
      duration: "Mensal",
      description: "Para quem busca serviços completos",
      activeMembers: 68,
      totalSold: 210,
      features: [
        {
          id: 1,
          name: "Acesso à academia em horário comercial",
          available: true,
        },
        { id: 2, name: "Uso de equipamentos de musculação", available: true },
        { id: 3, name: "Aulas coletivas", available: true },
        { id: 4, name: "Avaliação física", available: true },
        { id: 5, name: "Plano de treino personalizado", available: false },
        { id: 6, name: "Acesso ao espaço de bem-estar", available: false },
      ],
    },
    {
      id: 3,
      name: "Plano Premium",
      type: "premium",
      price: "R$ 189,90",
      duration: "Mensal",
      description: "Tenha acesso completo a todos os serviços",
      activeMembers: 32,
      totalSold: 85,
      features: [
        { id: 1, name: "Acesso à academia 24h", available: true },
        { id: 2, name: "Uso de equipamentos de musculação", available: true },
        { id: 3, name: "Aulas coletivas", available: true },
        { id: 4, name: "Avaliação física mensal", available: true },
        { id: 5, name: "Plano de treino personalizado", available: true },
        { id: 6, name: "Acesso ao espaço de bem-estar", available: true },
      ],
    },
    {
      id: 4,
      name: "Plano Básico Trimestral",
      type: "básico",
      price: "R$ 249,90",
      duration: "Trimestral",
      description: "Básico com desconto para 3 meses",
      activeMembers: 28,
      totalSold: 65,
      features: [
        {
          id: 1,
          name: "Acesso à academia em horário comercial",
          available: true,
        },
        { id: 2, name: "Uso de equipamentos de musculação", available: true },
        { id: 3, name: "Aulas coletivas", available: false },
        { id: 4, name: "Avaliação física", available: false },
        { id: 5, name: "Plano de treino personalizado", available: false },
        { id: 6, name: "Acesso ao espaço de bem-estar", available: false },
      ],
    },
    {
      id: 5,
      name: "Plano Premium Anual",
      type: "premium",
      price: "R$ 1.799,90",
      duration: "Anual",
      description: "Máximo desconto para pagamento anual",
      activeMembers: 15,
      totalSold: 25,
      features: [
        { id: 1, name: "Acesso à academia 24h", available: true },
        { id: 2, name: "Uso de equipamentos de musculação", available: true },
        { id: 3, name: "Aulas coletivas", available: true },
        { id: 4, name: "Avaliação física mensal", available: true },
        { id: 5, name: "Plano de treino personalizado", available: true },
        { id: 6, name: "Acesso ao espaço de bem-estar", available: true },
      ],
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (plan, mode = "view") => {
    setSelectedPlan(plan);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  // Filtrar planos com base na pesquisa
  const filteredPlans = planos.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.duration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section>
      <PageHeader>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar planos..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button color="primary">
            <FaSearch />
          </Button>
        </SearchContainer>

        <ButtonsContainer>
          <Button color="secondary">
            <FaDownload /> Exportar Relatório
          </Button>
          <Button color="primary" onClick={() => openModal(null, "add")}>
            <FaPlus /> Novo Plano
          </Button>
        </ButtonsContainer>
      </PageHeader>

      <PlansContainer>
        {filteredPlans.map((plan) => (
          <PlanCard key={plan.id}>
            <PlanHeader type={plan.type}>
              <PlanTitle>{plan.name}</PlanTitle>
              <PlanPrice>{plan.price}</PlanPrice>
              <PlanDuration>{plan.duration}</PlanDuration>
            </PlanHeader>

            <PlanBody>
              <PlanFeatures>
                {plan.features.map((feature) => (
                  <PlanFeatureItem
                    key={feature.id}
                    available={feature.available}
                  >
                    {feature.available ? <FaCheck /> : <FaTimes />}
                    {feature.name}
                  </PlanFeatureItem>
                ))}
              </PlanFeatures>

              <PlanStats>
                <StatItem>
                  <StatValue>{plan.activeMembers}</StatValue>
                  <StatLabel>Membros Ativos</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{plan.totalSold}</StatValue>
                  <StatLabel>Vendas Totais</StatLabel>
                </StatItem>
              </PlanStats>

              <ActionsContainer>
                <ActionButton
                  color="secondary"
                  onClick={() => openModal(plan, "view")}
                >
                  <FaEye /> DETALHES
                </ActionButton>
                <ActionButton
                  color="primary"
                  onClick={() => openModal(plan, "edit")}
                >
                  <FaEdit /> EDITAR
                </ActionButton>
                <ActionButton
                  color="danger"
                  onClick={() => console.log("Excluir", plan.id)}
                >
                  <FaTrash /> EXCLUIR
                </ActionButton>
              </ActionsContainer>
            </PlanBody>
          </PlanCard>
        ))}
      </PlansContainer>

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
                  ? "Adicionar Novo Plano"
                  : modalMode === "edit"
                  ? "Editar Plano"
                  : `${selectedPlan?.name}`}
              </ModalTitle>
              <button onClick={closeModal}>&times;</button>
            </ModalHeader>

            <div style={{ padding: "1.5rem" }}>
              {modalMode === "view" && selectedPlan && (
                <div>
                  <div style={{ marginBottom: "1rem" }}>
                    <h3>{selectedPlan.name}</h3>
                    <p>{selectedPlan.description}</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <strong>Tipo:</strong> {selectedPlan.type}
                    </div>
                    <div>
                      <strong>Preço:</strong> {selectedPlan.price}
                    </div>
                    <div>
                      <strong>Duração:</strong> {selectedPlan.duration}
                    </div>
                  </div>

                  <hr />

                  <div style={{ marginTop: "1rem" }}>
                    <h4>Recursos Inclusos</h4>
                    <PlanFeatures>
                      {selectedPlan.features.map((feature) => (
                        <PlanFeatureItem
                          key={feature.id}
                          available={feature.available}
                        >
                          {feature.available ? <FaCheck /> : <FaTimes />}
                          {feature.name}
                        </PlanFeatureItem>
                      ))}
                    </PlanFeatures>
                  </div>

                  <hr />

                  <div style={{ marginTop: "1rem" }}>
                    <h4>Estatísticas</h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.5rem",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FaUserCheck
                            style={{ marginRight: "0.5rem", color: "#4caf50" }}
                          />
                          <span>
                            Membros Ativos:{" "}
                            <strong>{selectedPlan.activeMembers}</strong>
                          </span>
                        </div>
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FaUsers
                            style={{ marginRight: "0.5rem", color: "#2196f3" }}
                          />
                          <span>
                            Vendas Totais:{" "}
                            <strong>{selectedPlan.totalSold}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(modalMode === "add" || modalMode === "edit") && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Formulário de plano enviado");
                    closeModal();
                  }}
                >
                  <FormRow $cols={2}>
                    <FormGroup>
                      <FormLabel htmlFor="name">Nome do Plano</FormLabel>
                      <FormInput
                        id="name"
                        type="text"
                        required
                        defaultValue={selectedPlan?.name || ""}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="type">Tipo</FormLabel>
                      <FormSelect
                        id="type"
                        required
                        defaultValue={selectedPlan?.type || ""}
                      >
                        <option value="">Selecione o tipo</option>
                        <option value="básico">Básico</option>
                        <option value="padrão">Padrão</option>
                        <option value="premium">Premium</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>

                  <FormRow $cols={2}>
                    <FormGroup>
                      <FormLabel htmlFor="price">Preço</FormLabel>
                      <FormInput
                        id="price"
                        type="text"
                        required
                        placeholder="Ex: R$ 99,90"
                        defaultValue={
                          selectedPlan?.price?.replace("R$ ", "") || ""
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="duration">Duração</FormLabel>
                      <FormSelect
                        id="duration"
                        required
                        defaultValue={selectedPlan?.duration || ""}
                      >
                        <option value="">Selecione a duração</option>
                        <option value="Mensal">Mensal</option>
                        <option value="Trimestral">Trimestral</option>
                        <option value="Semestral">Semestral</option>
                        <option value="Anual">Anual</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <FormLabel htmlFor="description">Descrição</FormLabel>
                    <FormTextarea
                      id="description"
                      required
                      defaultValue={selectedPlan?.description || ""}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Recursos</FormLabel>
                    <div>
                      <FormCheckboxContainer>
                        <FormCheckbox
                          type="checkbox"
                          id="feature1"
                          defaultChecked={
                            selectedPlan?.features?.find((f) => f.id === 1)
                              ?.available
                          }
                        />
                        <FormCheckboxLabel htmlFor="feature1">
                          Acesso à academia em horário comercial
                        </FormCheckboxLabel>
                      </FormCheckboxContainer>

                      <FormCheckboxContainer>
                        <FormCheckbox
                          type="checkbox"
                          id="feature2"
                          defaultChecked={
                            selectedPlan?.features?.find((f) => f.id === 2)
                              ?.available
                          }
                        />
                        <FormCheckboxLabel htmlFor="feature2">
                          Uso de equipamentos de musculação
                        </FormCheckboxLabel>
                      </FormCheckboxContainer>

                      <FormCheckboxContainer>
                        <FormCheckbox
                          type="checkbox"
                          id="feature3"
                          defaultChecked={
                            selectedPlan?.features?.find((f) => f.id === 3)
                              ?.available
                          }
                        />
                        <FormCheckboxLabel htmlFor="feature3">
                          Aulas coletivas
                        </FormCheckboxLabel>
                      </FormCheckboxContainer>

                      <FormCheckboxContainer>
                        <FormCheckbox
                          type="checkbox"
                          id="feature4"
                          defaultChecked={
                            selectedPlan?.features?.find((f) => f.id === 4)
                              ?.available
                          }
                        />
                        <FormCheckboxLabel htmlFor="feature4">
                          Avaliação física
                        </FormCheckboxLabel>
                      </FormCheckboxContainer>

                      <FormCheckboxContainer>
                        <FormCheckbox
                          type="checkbox"
                          id="feature5"
                          defaultChecked={
                            selectedPlan?.features?.find((f) => f.id === 5)
                              ?.available
                          }
                        />
                        <FormCheckboxLabel htmlFor="feature5">
                          Plano de treino personalizado
                        </FormCheckboxLabel>
                      </FormCheckboxContainer>

                      <FormCheckboxContainer>
                        <FormCheckbox
                          type="checkbox"
                          id="feature6"
                          defaultChecked={
                            selectedPlan?.features?.find((f) => f.id === 6)
                              ?.available
                          }
                        />
                        <FormCheckboxLabel htmlFor="feature6">
                          Acesso ao espaço de bem-estar
                        </FormCheckboxLabel>
                      </FormCheckboxContainer>
                    </div>
                  </FormGroup>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    <Button
                      type="button"
                      color="secondary"
                      onClick={closeModal}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" color="primary">
                      {modalMode === "add"
                        ? "Adicionar Plano"
                        : "Salvar Alterações"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Section>
  );
};

export default PlansPage;
