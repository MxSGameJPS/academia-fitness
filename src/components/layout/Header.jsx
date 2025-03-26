import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Button from "../ui/Button";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  transition: ${({ theme }) => theme.transitions.default};
  background-color: ${({ theme, scrolled }) =>
    scrolled ? theme.colors.light : "transparent"};
  padding: ${({ theme, scrolled }) =>
    scrolled ? `${theme.space.sm} 0` : `${theme.space.md} 0`};
  box-shadow: ${({ theme, scrolled }) =>
    scrolled ? theme.shadows.md : "none"};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme, scrolled }) =>
    scrolled ? theme.colors.primary : theme.colors.light};
  text-decoration: none;
  position: relative;
  z-index: 1001;
  transition: ${({ theme }) => theme.transitions.default};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavbarLinks = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  margin: 0 ${({ theme }) => theme.space.md};
  color: ${({ theme, scrolled }) =>
    scrolled ? theme.colors.textPrimary : theme.colors.light};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme, scrolled }) =>
    scrolled ? theme.colors.textPrimary : theme.colors.light};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileMenuContent = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobileNavItem = styled(NavLink)`
  margin: ${({ theme }) => theme.space.md} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  position: relative;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderWrapper>
        <Logo to="/" scrolled={scrolled}>
          Power<span>Fit</span>
        </Logo>

        <NavbarLinks>
          <NavItem to="/" scrolled={scrolled}>
            Home
          </NavItem>
          <NavItem to="/products" scrolled={scrolled}>
            Produtos
          </NavItem>
          <NavItem to="/team" scrolled={scrolled}>
            Equipe
          </NavItem>
          <NavItem to="/contact" scrolled={scrolled}>
            Contato
          </NavItem>
        </NavbarLinks>

        <ButtonsContainer>
          <Button
            variant="accent"
            size="sm"
            as={Link}
            to="/admin/login"
            icon={<FaUserCircle />}
          >
            Admin
          </Button>
        </ButtonsContainer>

        <MobileMenuToggle onClick={toggleMobileMenu} scrolled={scrolled}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuToggle>

        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenuOverlay
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMobileMenu}
            >
              <MobileMenuContent
                variants={contentVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <MobileNavItem to="/" onClick={closeMobileMenu}>
                  Home
                </MobileNavItem>
                <MobileNavItem to="/products" onClick={closeMobileMenu}>
                  Produtos
                </MobileNavItem>
                <MobileNavItem to="/team" onClick={closeMobileMenu}>
                  Equipe
                </MobileNavItem>
                <MobileNavItem to="/contact" onClick={closeMobileMenu}>
                  Contato
                </MobileNavItem>

                <Button
                  variant="accent"
                  size="md"
                  as={Link}
                  to="/admin/login"
                  style={{ marginTop: "1rem" }}
                  onClick={closeMobileMenu}
                  icon={<FaUserCircle />}
                >
                  Admin
                </Button>
              </MobileMenuContent>
            </MobileMenuOverlay>
          )}
        </AnimatePresence>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
