import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  FaTachometerAlt,
  FaEnvelope,
  FaUsers,
  FaDumbbell,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAdminStore } from "../store/adminStore";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: ${({ theme }) => theme.colors.darkAccent};
  color: white;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
    box-shadow: ${({ $isOpen, theme }) =>
      $isOpen ? theme.shadows.xl : "none"};
    width: 85%;
    max-width: 250px;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => "rgba(255, 255, 255, 0.1)"};
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  transition: margin 0.3s ease;
  overflow-x: hidden;
  max-width: 100vw;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    width: 100%;
    padding-bottom: 60px; /* Espaço para navegação fixa no rodapé em mobile */
  }
`;

const TopBar = styled.div`
  height: 70px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 0.5rem;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  padding: 0.5rem;
  border-radius: 50%;

  &:active {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

const Navigation = styled.nav`
  padding: 1.5rem 0;
`;

const NavHeader = styled.h3`
  padding: 0 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
`;

const NavItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.1rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
`;

const UserName = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.error}10`};
  }

  svg {
    margin-right: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    span {
      display: none;
    }

    svg {
      margin-right: 0;
    }
  }
`;

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const { logout, admin, isAuthenticated } = useAdminStore();

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isAuthenticated) {
    navigate("/admin/login");
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Obter a primeira letra do nome de usuário para o avatar
  const userInitial = admin ? admin.name.charAt(0) : "A";

  return (
    <LayoutContainer>
      {sidebarOpen && isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={closeSidebar}
        />
      )}

      <Sidebar $isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo>
            Power<span>Fit</span> Admin
          </Logo>
          <CloseButton onClick={closeSidebar}>
            <FaTimes />
          </CloseButton>
        </SidebarHeader>

        <Navigation>
          <NavHeader>Principal</NavHeader>
          <NavItems>
            <NavItem>
              <StyledNavLink to="/admin" end onClick={closeSidebar}>
                <FaTachometerAlt /> Dashboard
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/admin/clientes" onClick={closeSidebar}>
                <FaUsers /> Clientes
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/admin/produtos" onClick={closeSidebar}>
                <FaDumbbell /> Produtos
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/admin/planos" onClick={closeSidebar}>
                <FaMoneyBillWave /> Planos
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/admin/agenda" onClick={closeSidebar}>
                <FaCalendarAlt /> Agenda
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/admin/configuracoes" onClick={closeSidebar}>
                <FaCog /> Configurações
              </StyledNavLink>
            </NavItem>
          </NavItems>
        </Navigation>
      </Sidebar>

      <Content>
        <TopBar>
          <MobileMenuButton onClick={toggleSidebar}>
            <FaBars />
          </MobileMenuButton>

          <UserInfo>
            <UserAvatar>{userInitial}</UserAvatar>
            <UserName>{admin ? admin.name : "Admin"}</UserName>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Sair</span>
            </LogoutButton>
          </UserInfo>
        </TopBar>

        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default AdminLayout;
