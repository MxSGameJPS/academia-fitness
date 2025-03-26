import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import GlobalStyles from "./styles/globalStyles";
import theme from "./styles/theme";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

// Public Pages
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import ProductsPage from "./pages/Products/ProductsPage";
import TeamPage from "./pages/Team/TeamPage";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Cart/CheckoutPage";
import OrderConfirmationPage from "./pages/Cart/OrderConfirmationPage";

// Admin Pages
import AdminLoginPage from "./pages/Admin/LoginPage";
import AdminDashboardPage from "./pages/Admin/DashboardPage";
import CustomersPage from "./pages/Admin/CustomersPage";
import MembersPage from "./pages/Admin/MembersPage";
import AdminProductsPage from "./pages/Admin/ProductsPage";
import PlansPage from "./pages/Admin/PlansPage";
import SchedulePage from "./pages/Admin/SchedulePage";
import AdminSettingsPage from "./pages/Admin/SettingsPage";

// Student Pages
import StudentLoginPage from "./pages/Student/LoginPage";
import StudentDashboardPage from "./pages/Student/DashboardPage";
import StudentProfilePage from "./pages/Student/ProfilePage";
import StudentWorkoutsPage from "./pages/Student/WorkoutsPage";
import StudentMeasurementsPage from "./pages/Student/MeasurementsPage";

// Components
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Páginas públicas */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="sobre" element={<AboutPage />} />
            <Route path="contato" element={<ContactPage />} />
            <Route path="produtos" element={<ProductsPage />} />
            <Route path="equipe" element={<TeamPage />} />
            <Route path="carrinho" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route
              path="pedido-confirmado"
              element={<OrderConfirmationPage />}
            />
          </Route>

          {/* Páginas de login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/aluno/login" element={<StudentLoginPage />} />

          {/* Área do administrador */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredAuth="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="clientes" element={<CustomersPage />} />
            <Route path="produtos" element={<AdminProductsPage />} />
            <Route path="configuracoes" element={<AdminSettingsPage />} />
            <Route path="membros" element={<MembersPage />} />
            <Route path="planos" element={<PlansPage />} />
            <Route path="agenda" element={<SchedulePage />} />
          </Route>

          {/* Área do aluno */}
          <Route
            path="/aluno"
            element={
              <ProtectedRoute requiredAuth="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboardPage />} />
            <Route path="profile" element={<StudentProfilePage />} />
            <Route path="workouts" element={<StudentWorkoutsPage />} />
            <Route path="measurements" element={<StudentMeasurementsPage />} />
          </Route>

          {/* Página 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
