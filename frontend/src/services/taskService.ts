import type { CreateTaskData, Task, UpdateTaskData } from "@/types/task";
import api from "./api";

class TaskService {
  async getAllTasks(): Promise<Task[]> {
    const response = await api.get("/tasks");
    return response.data;
  }

  async getTaskById(taskId: number): Promise<Task> {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await api.post<Task>("/tasks", data);
    return response.data;
  }

  async updateTask(taskId: number, data: UpdateTaskData): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${taskId}`, data);
    return response.data;
  }

  async deleteTask(taskId: number): Promise<void> {
    await api.delete<void>(`/tasks/${taskId}`);
  }
}

export default new TaskService();
