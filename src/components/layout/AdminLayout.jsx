import React, { useState } from "react";
import styled from "styled-components";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ $isOpen }) => ($isOpen ? "250px" : "0")};
  background-color: ${({ theme }) => theme.colors.darkAccent};
  color: white;
  transition: width 0.3s ease;
  z-index: 1000;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ $isOpen }) => ($isOpen ? "100%" : "0")};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SidebarLogo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SidebarNav = styled.nav`
  padding: ${({ theme }) => theme.space.md} 0;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};

  svg {
    margin-right: ${({ theme }) => theme.space.md};
    font-size: 1.2rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme.colors.light};
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.primary};
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: ${({ theme }) => theme.space.md} 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  svg {
    margin-right: ${({ theme }) => theme.space.md};
    font-size: 1.2rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme.colors.light};
  }
`;

const MainContent = styled.main`
  margin-left: ${({ $isOpen }) => ($isOpen ? "250px" : "0")};
  padding: 2rem;
  transition: margin-left 0.3s ease;
  min-height: 100vh;
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 1.5rem;
    margin-right: ${({ theme }) => theme.space.sm};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    navigate("/");
  };

  return (
    <AdminContainer>
      <Sidebar $isOpen={sidebarOpen}>
        <SidebarHeader>
          <SidebarLogo>
            Power<span>Fit</span> Admin
          </SidebarLogo>
        </SidebarHeader>

        <SidebarNav>
          <SidebarLink to="/admin">
            <FaHome />
            Dashboard
          </SidebarLink>
          <SidebarLink to="/admin/contacts">
            <FaClipboardList />
            Contatos
          </SidebarLink>
        </SidebarNav>

        <SidebarFooter>
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt />
            Sair
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <MainContent $isOpen={sidebarOpen}>
        <TopBar>
          <MenuToggle onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </MenuToggle>

          <UserInfo>
            <FaUserCircle />
            <span>Administrador</span>
          </UserInfo>
        </TopBar>

        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
    </AdminContainer>
  );
};

export default AdminLayout;
