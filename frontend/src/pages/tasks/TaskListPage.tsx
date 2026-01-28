import { Filters, TaskCardContainer } from "@/components";
import { useTasks } from "@/hooks/useTasks";

const TaskListPage = () => {
  const { tasks, isLoading, isError, error } = useTasks();

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <section>
      <Filters />
      <TaskCardContainer tasks={tasks} />
    </section>
  );
};
export default TaskListPage;
