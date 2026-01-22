import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage, ProtectedRoute, LoginPage, RegisterPage } from "./pages";

import Dashboard from "./pages/mockups/DashboardMockup";
import TaskList from "./pages/mockups/TaskListMockup";
import TaskFormModalMockup from "./pages/mockups/TaskFormModalMockup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks-list"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task-form-modal"
          element={
            <ProtectedRoute>
              <TaskFormModalMockup />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
