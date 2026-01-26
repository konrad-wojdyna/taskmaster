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
    },
  });

  return {
    tasks: taskQuery.data ?? [],
    isLoading: taskQuery.isLoading,
    isError: taskQuery.isError,
    error: taskQuery.error,
    createTask: createTaskMutation.mutate,
  };
};
