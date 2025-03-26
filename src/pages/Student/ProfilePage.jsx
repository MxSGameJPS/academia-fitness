import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCreditCard,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useStudentStore } from "../../store/studentStore";
import { Button } from "../../components/ui/Button";

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  margin-bottom: 1.5rem;
  border: 5px solid ${({ theme }) => theme.colors.primary};
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const ProfilePlan = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ProfileInfo = styled.div`
  text-align: left;
  width: 100%;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 0.75rem;
    min-width: 16px;
  }
`;

const InfoLabel = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.25rem;
  display: block;
`;

const InfoValue = styled.div`
  font-weight: 500;
`;

const ProfileDetails = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.darkAccent};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  margin-bottom: 1.5rem;
`;

const HealthIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $status, theme }) =>
    $status === "good"
      ? theme.colors.success
      : $status === "medium"
      ? theme.colors.warning
      : theme.colors.danger};
  margin-right: 0.5rem;
`;

const ProfilePage = () => {
  const { student, updateStudent } = useStudentStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student?.name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    birthDate: student?.birthDate || "",
    address: student?.address || {
      street: "",
      number: "",
      complement: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: student?.name || "",
      email: student?.email || "",
      phone: student?.phone || "",
      birthDate: student?.birthDate || "",
      address: student?.address || {
        street: "",
        number: "",
        complement: "",
        city: "",
        state: "",
        zipCode: "",
      },
    });
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(formData);
    setEditing(false);
  };

  // Formatar data para exibição
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  return (
    <ProfileContainer>
      <ProfileSidebar
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ProfileAvatar src={student?.photo} />
        <ProfileName>{student?.name}</ProfileName>
        <ProfilePlan>Plano {student?.plan}</ProfilePlan>

        <ProfileInfo>
          <InfoItem>
            <FaEnvelope />
            <div>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{student?.email}</InfoValue>
            </div>
          </InfoItem>

          <InfoItem>
            <FaPhone />
            <div>
              <InfoLabel>Telefone</InfoLabel>
              <InfoValue>{student?.phone}</InfoValue>
            </div>
          </InfoItem>

          <InfoItem>
            <FaCalendarAlt />
            <div>
              <InfoLabel>Data de Nascimento</InfoLabel>
              <InfoValue>{formatDate(student?.birthDate)}</InfoValue>
            </div>
          </InfoItem>

          <InfoItem>
            <FaMapMarkerAlt />
            <div>
              <InfoLabel>Endereço</InfoLabel>
              <InfoValue>
                {student?.address?.street}, {student?.address?.number}
                <br />
                {student?.address?.city}, {student?.address?.state}
              </InfoValue>
            </div>
          </InfoItem>

          <InfoItem>
            <FaCreditCard />
            <div>
              <InfoLabel>Validade do Plano</InfoLabel>
              <InfoValue>Até {formatDate(student?.planEndDate)}</InfoValue>
            </div>
          </InfoItem>
        </ProfileInfo>
      </ProfileSidebar>

      <ProfileDetails
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ProfileSection>
          <SectionTitle>
            Informações Pessoais
            {!editing && (
              <EditButton onClick={handleEdit}>
                <FaEdit /> Editar
              </EditButton>
            )}
          </SectionTitle>

          {editing ? (
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <FormLabel htmlFor="name">Nome Completo</FormLabel>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="phone">Telefone</FormLabel>
                  <FormInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="birthDate">Data de Nascimento</FormLabel>
                  <FormInput
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={
                      formData.birthDate ? formData.birthDate.split("T")[0] : ""
                    }
                    onChange={handleChange}
                  />
                </FormGroup>
              </FormGrid>

              <SectionTitle>Endereço</SectionTitle>

              <FormGrid>
                <FormGroup>
                  <FormLabel htmlFor="address.street">Rua</FormLabel>
                  <FormInput
                    type="text"
                    id="address.street"
                    name="address.street"
                    value={formData.address?.street || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="address.number">Número</FormLabel>
                  <FormInput
                    type="text"
                    id="address.number"
                    name="address.number"
                    value={formData.address?.number || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="address.complement">
                    Complemento
                  </FormLabel>
                  <FormInput
                    type="text"
                    id="address.complement"
                    name="address.complement"
                    value={formData.address?.complement || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="address.city">Cidade</FormLabel>
                  <FormInput
                    type="text"
                    id="address.city"
                    name="address.city"
                    value={formData.address?.city || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="address.state">Estado</FormLabel>
                  <FormInput
                    type="text"
                    id="address.state"
                    name="address.state"
                    value={formData.address?.state || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="address.zipCode">CEP</FormLabel>
                  <FormInput
                    type="text"
                    id="address.zipCode"
                    name="address.zipCode"
                    value={formData.address?.zipCode || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </FormGrid>

              <ButtonGroup>
                <Button $color="secondary" type="button" onClick={handleCancel}>
                  <FaTimes /> Cancelar
                </Button>
                <Button type="submit">
                  <FaCheck /> Salvar
                </Button>
              </ButtonGroup>
            </form>
          ) : (
            <DetailGrid>
              <DetailItem>
                <InfoLabel>Nome Completo</InfoLabel>
                <InfoValue>{student?.name}</InfoValue>
              </DetailItem>

              <DetailItem>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{student?.email}</InfoValue>
              </DetailItem>

              <DetailItem>
                <InfoLabel>Telefone</InfoLabel>
                <InfoValue>{student?.phone}</InfoValue>
              </DetailItem>

              <DetailItem>
                <InfoLabel>Data de Nascimento</InfoLabel>
                <InfoValue>{formatDate(student?.birthDate)}</InfoValue>
              </DetailItem>

              <DetailItem>
                <InfoLabel>Endereço</InfoLabel>
                <InfoValue>
                  {student?.address?.street}, {student?.address?.number}
                  {student?.address?.complement &&
                    ` - ${student.address.complement}`}
                  <br />
                  {student?.address?.city}, {student?.address?.state}
                  <br />
                  CEP: {student?.address?.zipCode}
                </InfoValue>
              </DetailItem>

              <DetailItem>
                <InfoLabel>Plano Atual</InfoLabel>
                <InfoValue>{student?.plan}</InfoValue>
              </DetailItem>
            </DetailGrid>
          )}
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>Informações de Saúde</SectionTitle>

          <DetailGrid>
            <DetailItem>
              <InfoLabel>Peso Atual</InfoLabel>
              <InfoValue>{student?.currentWeight} kg</InfoValue>
            </DetailItem>

            <DetailItem>
              <InfoLabel>Altura</InfoLabel>
              <InfoValue>{student?.height} cm</InfoValue>
            </DetailItem>

            <DetailItem>
              <InfoLabel>IMC (Índice de Massa Corporal)</InfoLabel>
              <InfoValue>
                {(
                  student?.currentWeight / Math.pow(student?.height / 100, 2)
                ).toFixed(1)}
              </InfoValue>
              <HealthIndicator $status={
                student?.currentWeight / Math.pow(student?.height / 100, 2) <
                18.5
                  ? "medium"
                  : student?.currentWeight /
                      Math.pow(student?.height / 100, 2) <
                    25
                  ? "good"
                  : student?.currentWeight /
                      Math.pow(student?.height / 100, 2) <
                    30
                  ? "medium"
                  : "bad"
              }>
                <span></span>
                {student?.currentWeight / Math.pow(student?.height / 100, 2) <
                18.5
                  ? "Abaixo do peso"
                  : student?.currentWeight /
                      Math.pow(student?.height / 100, 2) <
                    25
                  ? "Normal"
                  : student?.currentWeight /
                      Math.pow(student?.height / 100, 2) <
                    30
                  ? "Sobrepeso"
                  : "Obeso"}
              </HealthIndicator>
            </DetailItem>

            <DetailItem>
              <InfoLabel>Pressão Arterial</InfoLabel>
              <InfoValue>{student?.bloodPressure || "120/80"}</InfoValue>
              <HealthIndicator $status="good">
                <span></span>
                Normal
              </HealthIndicator>
            </DetailItem>

            <DetailItem>
              <InfoLabel>Frequência Cardíaca de Repouso</InfoLabel>
              <InfoValue>{student?.restingHeartRate || "68"} BPM</InfoValue>
              <HealthIndicator $status="good">
                <span></span>
                Normal
              </HealthIndicator>
            </DetailItem>

            <DetailItem>
              <InfoLabel>Alergias</InfoLabel>
              <InfoValue>{student?.allergies || "Nenhuma"}</InfoValue>
            </DetailItem>
          </DetailGrid>
        </ProfileSection>
      </ProfileDetails>
    </ProfileContainer>
  );
};

export default ProfilePage;
