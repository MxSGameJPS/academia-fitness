import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: ${({ $scrolled, theme }) =>
    $scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.7)"};
  box-shadow: ${({ $scrolled, theme }) =>
    $scrolled ? theme.shadows.md : "none"};
`;

const TopBar = styled.div`
  background-color: ${({ theme }) => theme.colors.darkAccent};
  color: white;
  padding: 0.5rem 0;
  font-size: 0.9rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SocialLink = styled.a`
  color: white;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.primary : "white"};
  text-decoration: none;
  z-index: 1001;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  text-shadow: ${({ $scrolled }) =>
    $scrolled ? "none" : "0 2px 4px rgba(0, 0, 0, 0.5)"};

  span {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: ${({ $scrolled }) =>
      $scrolled ? "none" : "0 2px 4px rgba(0, 0, 0, 0.5)"};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileMenuContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.light};
  z-index: 1002;
  padding: 5rem 2rem 2rem;
  box-shadow: ${({ theme }) => theme.shadows.xl};

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const NavItem = styled(NavLink)`
  color: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.textPrimary : "white"};
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  font-weight: 600;
  transition: color 0.3s;
  margin: 0 0.8rem;
  text-shadow: ${({ $scrolled }) =>
    $scrolled ? "none" : "0 2px 4px rgba(0, 0, 0, 0.5)"};

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  &.active::after,
  &:hover::after {
    transform: scaleX(1);
  }
`;

const MobileNavItem = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.75rem 0;
  display: block;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.textPrimary : "white"};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  transition: color 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  cursor: pointer;
`;

const CallToAction = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  svg {
    margin-left: 0.5rem;
  }
`;

const Main = styled.main`
  min-height: 100vh;
  padding-top: 120px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 70px;
  }
`;

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.darkAccent};
  color: white;
  padding: 4rem 0 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FooterTitle = styled.h3`
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;

  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const FooterContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  svg {
    margin-right: 1rem;
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterContactText = styled.div`
  color: rgba(255, 255, 255, 0.7);
`;

const FooterSocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const FooterSocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 1.5rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const AdminLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.primaryDark || theme.colors.darkAccent};
  }
`;

const MainLayout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detecta quando a página é rolada para baixo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <HeaderContainer $scrolled={scrolled}>
        <TopBar>
          <TopBarContent>
            <ContactInfo>
              <ContactItem>
                <FaPhone />
                (11) 99999-9999
              </ContactItem>
              <ContactItem>
                <FaEnvelope />
                contato@powerfit.com.br
              </ContactItem>
            </ContactInfo>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <FaFacebookF />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="#" aria-label="YouTube">
                <FaYoutube />
              </SocialLink>
              <AdminLink to="/admin/login">Admin</AdminLink>
              <AdminLink to="/aluno/login">Aluno</AdminLink>
            </SocialLinks>
          </TopBarContent>
        </TopBar>

        <Nav>
          <Logo to="/" $scrolled={scrolled}>
            Power<span>Fit</span>
          </Logo>

          <NavLinks>
            <NavItem to="/" $scrolled={scrolled}>
              Home
            </NavItem>
            <NavItem to="/produtos" $scrolled={scrolled}>
              Produtos
            </NavItem>
            <NavItem to="/equipe" $scrolled={scrolled}>
              Equipe
            </NavItem>
            <NavItem to="/contato" $scrolled={scrolled}>
              Contato
            </NavItem>
            <NavItem to="/carrinho" $scrolled={scrolled}>
              Carrinho
            </NavItem>
            <CallToAction to="/contato">
              Começar Agora <FaArrowRight />
            </CallToAction>
          </NavLinks>

          <MobileMenuButton
            $scrolled={scrolled}
            onClick={toggleMobileMenu}
            aria-label="Abrir menu"
          >
            <FaBars />
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileMenuContainer
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
            >
              <CloseButton
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <FaTimes />
              </CloseButton>

              <MobileNavLinks>
                <MobileNavItem to="/">Home</MobileNavItem>
                <MobileNavItem to="/produtos">Produtos</MobileNavItem>
                <MobileNavItem to="/equipe">Equipe</MobileNavItem>
                <MobileNavItem to="/contato">Contato</MobileNavItem>
                <MobileNavItem to="/carrinho">Carrinho</MobileNavItem>
                <MobileNavItem to="/admin/login">
                  Área Administrativa
                </MobileNavItem>
                <MobileNavItem to="/aluno/login">
                  Área do Aluno
                </MobileNavItem>
              </MobileNavLinks>
            </MobileMenuContainer>
          </>
        )}
      </AnimatePresence>

      <Main>
        <Outlet />
      </Main>

      <FooterContainer>
        <FooterContent>
          <FooterColumn>
            <FooterLogo>PowerFit</FooterLogo>
            <FooterText>
              Academia completa com equipamentos modernos, equipe qualificada e
              ambiente motivador para ajudar você a alcançar seus objetivos de
              fitness.
            </FooterText>
            <FooterSocialLinks>
              <FooterSocialLink href="#" aria-label="Facebook">
                <FaFacebookF />
              </FooterSocialLink>
              <FooterSocialLink href="#" aria-label="Instagram">
                <FaInstagram />
              </FooterSocialLink>
              <FooterSocialLink href="#" aria-label="Twitter">
                <FaTwitter />
              </FooterSocialLink>
              <FooterSocialLink href="#" aria-label="YouTube">
                <FaYoutube />
              </FooterSocialLink>
            </FooterSocialLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Links Rápidos</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <Link to="/">Home</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/produtos">Produtos</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/equipe">Nossa Equipe</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/contato">Contato</Link>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Horários</FooterTitle>
            <FooterText>
              <strong>Segunda à Sexta</strong>
              <br />
              6:00 - 22:00
              <br />
              <br />
              <strong>Sábados</strong>
              <br />
              8:00 - 18:00
              <br />
              <br />
              <strong>Domingos e Feriados</strong>
              <br />
              8:00 - 14:00
            </FooterText>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Contato</FooterTitle>
            <FooterContactItem>
              <FaMapMarkerAlt />
              <FooterContactText>
                Av. Paulista, 1000
                <br />
                São Paulo, SP, Brasil
              </FooterContactText>
            </FooterContactItem>
            <FooterContactItem>
              <FaPhone />
              <FooterContactText>(11) 99999-9999</FooterContactText>
            </FooterContactItem>
            <FooterContactItem>
              <FaEnvelope />
              <FooterContactText>contato@powerfit.com.br</FooterContactText>
            </FooterContactItem>
          </FooterColumn>
        </FooterContent>

        <Copyright>
          &copy; {new Date().getFullYear()} PowerFit. Todos os direitos
          reservados.
        </Copyright>
      </FooterContainer>
    </>
  );
};

export default MainLayout;
