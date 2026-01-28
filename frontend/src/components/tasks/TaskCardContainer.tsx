import { Plus } from "lucide-react";
import type { Task } from "@/types/task";
import { Button } from "../ui/button";
import { CreateTaskForm, TaskCard } from "@/components";
import { useState } from "react";

interface TaskCardContainerProps {
  tasks: Task[];
}

const TaskCardContainer = ({ tasks }: TaskCardContainerProps) => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-6 md:flex justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
          <p className="text-gray-600 mt-1">Manage and organize your tasks</p>
        </div>
        <Button
          className="mt-4 px-4 py-2 bg-blue-700 text-white
           hover:bg-blue-800 transition-colors
             cursor-pointer
             "
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          <span>
            <Plus size={20} />
          </span>{" "}
          New Task
        </Button>
      </div>
      <CreateTaskForm
        isOpen={isCreateTaskModalOpen}
        setIsOpen={() => setIsCreateTaskModalOpen(!isCreateTaskModalOpen)}
      />
      {tasks.length === 0 ? (
        <div>No tasks yet. Create your first task!</div>
      ) : (
        <ul
          className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))]
      gap-4"
        >
          {tasks?.map((task) => {
            return <TaskCard key={task.id} {...task} />;
          })}
        </ul>
      )}
    </div>
  );
};
export default TaskCardContainer;
