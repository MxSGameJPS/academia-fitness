import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaDumbbell,
  FaWeightHanging,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronLeft,
} from "react-icons/fa";
import { useStudentStore } from "../store/studentStore";

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: ${({ theme }) => theme.colors.darkAccent};
  color: white;
  padding-top: 2rem;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
  transition: transform 0.3s ease;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(-100%)"};
    box-shadow: ${({ $isOpen }) =>
      $isOpen ? "0 0 20px rgba(0,0,0,0.3)" : "none"};
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 280px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    width: 100%;
  }
`;

const StudentInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  margin: 0 auto 1rem;
  border: 4px solid ${({ theme }) => theme.colors.primary};
`;

const StudentName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  color: white;
`;

const StudentPlan = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0;
  font-weight: 600;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;

  a {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s;
    border-left: 3px solid transparent;

    &:hover,
    &.active {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border-left-color: ${({ theme }) => theme.colors.primary};
    }

    svg {
      margin-right: 1rem;
      font-size: 1.25rem;
    }
  }
`;

const MobileToggle = styled.button`
  position: fixed;
  display: none;
  z-index: 101;
  top: 1rem;
  left: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

const BackButton = styled(Link)`
  margin: 1rem;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-weight: 500;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  text-align: left;
  border-left: 3px solid transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border-left-color: ${({ theme }) => theme.colors.error};
  }

  svg {
    margin-right: 1rem;
    font-size: 1.25rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.darkAccent};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { student, logout } = useStudentStore();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/aluno/login");
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/aluno") return "Dashboard";
    if (path === "/aluno/profile") return "Meu Perfil";
    if (path === "/aluno/workouts") return "Meus Treinos";
    if (path === "/aluno/measurements") return "Medidas e Progresso";
    return "";
  };

  return (
    <PageContainer>
      <MobileToggle onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </MobileToggle>

      <Sidebar $isOpen={sidebarOpen}>
        <BackButton to="/" onClick={closeSidebar}>
          <FaChevronLeft /> Voltar ao site
        </BackButton>

        <StudentInfo>
          <Avatar src={student?.photo} />
          <StudentName>{student?.name}</StudentName>
          <StudentPlan>Plano {student?.plan}</StudentPlan>
        </StudentInfo>

        <NavMenu>
          <NavItem>
            <Link
              to="/aluno"
              className={location.pathname === "/aluno" ? "active" : ""}
              onClick={closeSidebar}
            >
              <FaHome /> Dashboard
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/aluno/profile"
              className={location.pathname === "/aluno/profile" ? "active" : ""}
              onClick={closeSidebar}
            >
              <FaUser /> Meu Perfil
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/aluno/workouts"
              className={
                location.pathname === "/aluno/workouts" ? "active" : ""
              }
              onClick={closeSidebar}
            >
              <FaDumbbell /> Meus Treinos
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/aluno/measurements"
              className={
                location.pathname === "/aluno/measurements" ? "active" : ""
              }
              onClick={closeSidebar}
            >
              <FaWeightHanging /> Medidas e Progresso
            </Link>
          </NavItem>
        </NavMenu>

        <div style={{ marginTop: "3rem" }}>
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt /> Sair
          </LogoutButton>
        </div>
      </Sidebar>

      <MainContent>
        <PageHeader>
          <h1>{getPageTitle()}</h1>
          <p>Bem-vindo à sua área de aluno, {student?.name}</p>
        </PageHeader>

        <Outlet />
      </MainContent>
    </PageContainer>
  );
};

export default StudentLayout;
