import type { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskCardContainerProps {
  tasks: Task[];
}

const TaskCardContainer = ({ tasks }: TaskCardContainerProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <ul className="space-y-4">
        {tasks?.map((task) => {
          return <TaskCard key={task.id} {...task} />;
        })}
      </ul>
    </div>
  );
};
export default TaskCardContainer;
