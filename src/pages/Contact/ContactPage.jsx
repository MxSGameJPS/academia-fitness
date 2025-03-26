import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { Section } from "../../components/ui/Section";
import ContactForm from "../../components/ui/ContactForm";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Corrigir o ícone do marcador
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
  shadowOffset: [0, 0],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Header
const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: ${({ theme }) => `${theme.space["3xl"]} 0`};
  text-align: center;
`;

const HeaderTitle = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const HeaderSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  max-width: 800px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.9;
`;

// Contact Info
const ContactInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ContactInfoItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const InfoTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.darkAccent};
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0;
  white-space: pre-line;
`;

// Content Layout
const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

// Map Container
const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  background-color: ${({ theme }) => theme.colors.lightGray};
  z-index: 1;

  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

// Animações
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Contact info data
const contactInfo = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Endereço",
    text: "Av. Paulista, 1000, São Paulo, SP, Brasil",
    color: "#FF4E50",
  },
  {
    icon: <FaPhone />,
    title: "Telefone",
    text: "(11) 99999-9999",
    color: "#FC913A",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    text: "contato@powerfit.com.br",
    color: "#F9D423",
  },
  {
    icon: <FaClock />,
    title: "Horário de Funcionamento",
    text: "Segunda a Sexta: 6h às 22h\nSábados e Domingos: 8h às 18h",
    color: "#36B1BF",
  },
];

const ContactPage = () => {
  const position = [-23.55052, -46.633308]; // Coordenadas da academia

  return (
    <>
      <PageHeader>
        <HeaderTitle
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Entre em Contato
        </HeaderTitle>
        <HeaderSubtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Fale conosco para tirar dúvidas, agendar uma visita ou saber mais
          sobre nossos serviços
        </HeaderSubtitle>
      </PageHeader>

      <Section bgColor={(theme) => theme.colors.background}>
        <ContactInfoContainer
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {contactInfo.map((info, index) => (
            <ContactInfoItem key={index} variants={fadeInUp}>
              <IconWrapper color={info.color}>{info.icon}</IconWrapper>
              <InfoTitle>{info.title}</InfoTitle>
              <InfoText>{info.text}</InfoText>
            </ContactInfoItem>
          ))}
        </ContactInfoContainer>

        <ContentLayout>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>Nossa Localização</h2>
            <p>
              Estamos localizados em uma região privilegiada e de fácil acesso.
              Venha nos fazer uma visita!
            </p>
            <MapWrapper>
              <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>PowerFit Academia</Popup>
                </Marker>
              </MapContainer>
            </MapWrapper>
          </motion.div>
        </ContentLayout>
      </Section>
    </>
  );
};

export default ContactPage;
