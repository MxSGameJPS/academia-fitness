import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.darkAccent};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => `${theme.space["2xl"]} 0 ${theme.space.lg}`};
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 250px;
  margin-bottom: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-basis: 50%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-basis: 100%;
  }
`;

const FooterLogo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.space.md};
  display: inline-block;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const FooterHeading = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.light};
  position: relative;
  padding-bottom: ${({ theme }) => theme.space.sm};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 30px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.space.sm};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
  }
`;

const FooterSocial = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.light};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.gray};

  svg {
    margin-right: ${({ theme }) => theme.space.sm};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    margin-top: 4px;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: ${({ theme }) => theme.space.md};
  text-align: center;
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo to="/">
            Power<span>Fit</span>
          </FooterLogo>
          <FooterDescription>
            Fornecemos serviços de fitness de alta qualidade e orientação
            personalizada para ajudar você a atingir seus objetivos de saúde e
            condicionamento físico.
          </FooterDescription>
          <FooterSocial>
            <SocialLink
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </SocialLink>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialLink>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialLink>
            <SocialLink
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </SocialLink>
          </FooterSocial>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Links Rápidos</FooterHeading>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/products">Produtos</FooterLink>
          <FooterLink to="/team">Nossa Equipe</FooterLink>
          <FooterLink to="/contact">Contato</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Serviços</FooterHeading>
          <FooterLink to="/">Treinamento Personalizado</FooterLink>
          <FooterLink to="/">Nutrição</FooterLink>
          <FooterLink to="/">Aulas em Grupo</FooterLink>
          <FooterLink to="/">Avaliação Física</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Contato</FooterHeading>
          <ContactItem>
            <FaMapMarkerAlt />
            <div>
              Av. Paulista, 1000
              <br />
              São Paulo, SP, Brasil
            </div>
          </ContactItem>
          <ContactItem>
            <FaPhone />
            <div>(11) 99999-9999</div>
          </ContactItem>
          <ContactItem>
            <FaEnvelope />
            <div>contato@powerfit.com.br</div>
          </ContactItem>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <p>
          &copy; {new Date().getFullYear()} PowerFit. Todos os direitos
          reservados.
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
