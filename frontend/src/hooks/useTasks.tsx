import { AxiosError } from "axios";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import taskService from "@/services/taskService";
import type { Task, CreateTaskData, UpdateTaskData } from "@/types/task";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const taskQuery = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => taskService.getAllTasks(),
    staleTime: 1000 * 60 * 5,
  });

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskData) => taskService.createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created succesfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || error.message;
      toast.error("Failed to create task: " + message);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: number; data: UpdateTaskData }) =>
      taskService.updateTask(taskId, data),
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.setQueryData(["tasks", updatedTask.id], updatedTask);
      toast.success("Task updated!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || error.message;
      toast.error("Failed to update task: " + message);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || error.message;
      toast.error("Failed to delete task: " + message);
    },
  });

  return {
    tasks: taskQuery.data ?? [],
    isLoading: taskQuery.isLoading,
    isError: taskQuery.isError,
    error: taskQuery.error,

    createTask: createTaskMutation.mutateAsync,
    isCreating: createTaskMutation.isPending,

    editTask: updateTaskMutation.mutateAsync,
    isEditing: updateTaskMutation.isPending,

    deleteTask: deleteTaskMutation.mutateAsync,
    isDeleting: deleteTaskMutation.isPending,
  };
};

export const useTask = (taskId?: number) => {
  return useQuery<Task>({
    queryKey: ["tasks", taskId],
    queryFn: () => taskService.getTaskById(taskId!),
    enabled: !!taskId,
  });
};
