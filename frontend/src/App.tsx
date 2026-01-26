import { BrowserRouter, Routes, Route } from "react-router";
import {
  HomePage,
  ProtectedRoute,
  LoginPage,
  RegisterPage,
  TaskListPage,
  TaskDetailPage,
} from "./pages";

import Dashboard from "./pages/mockups/DashboardMockup";
import TaskListMockup from "./pages/mockups/TaskListMockup";
import TaskFormModalMockup from "./pages/mockups/TaskFormModalMockup";
import MainLayout from "./components/layout/MainLayout";
import TaskDetailPageMockup from "./pages/mockups/TaskDetailPageMockup";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks-list-mockup" element={<TaskListMockup />} />
          <Route
            path="/task-detail-page-mockup"
            element={<TaskDetailPageMockup />}
          />
          <Route
            path="/task-form-modal-mockup"
            element={<TaskFormModalMockup />}
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskListPage />} />
              <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export default App;
