import { Calendar, FilePenLine, Trash2 } from "lucide-react";
import { Link } from "react-router";
import type { Task } from "@/types/task";
import { formatTaskDate } from "@/utils/dateFormatter";
import { Button } from "../ui/button";

const TaskCard = ({
  id,
  title,
  description,
  status,
  createdAt,
  updatedAt,
  userId,
}: Task) => {
  //TODO Sprint 3: Replace createdAt with dueDate
  const { displayDate, isOverdue } = formatTaskDate(createdAt);

  return (
    <li
      className="flex justify-between  gap-4 bg-white p-2 rounded-md border border-gray-200
    shadow-sm"
    >
      <div className="flex gap-4">
        <input
          type="checkbox"
          className="w-5 h-5 mt-2"
          checked={status === "COMPLETED"}
          disabled
          title="Coming in Sprint 3: Mark as completed"
        />
        <Link to={`/tasks/${id}`}>
          <h2 className="font-bold text-lg">{title}</h2>
          <p>
            {description && description.length > 50
              ? `${description.slice(0, 50)}...`
              : description || "No description"}
          </p>
          <footer className="flex gap-4 items-center mt-2">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded 
              ${
                status === "COMPLETED"
                  ? "bg-green-100 text-green-800"
                  : status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
            <span className="flex gap-1 items-center text-sm text-gray-500">
              <Calendar size={15} className="text-red-700" />
              {displayDate}
            </span>
            {isOverdue && (
              <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded uppercase">
                Overdue
              </span>
            )}
          </footer>
        </Link>
      </div>
      <div className="flex">
        <Button
          variant="outline"
          className="border-none shadow-none 
          hover:bg-transparent cursor-pointer
          transition-all
          hover:text-black"
          onClick={() => alert(`TODO Task 11: Edit task ${id}`)}
        >
          <FilePenLine size={20} className="text-gray-500" />
        </Button>
        <Button
          variant="outline"
          className="border-none shadow-none 
          hover:bg-transparent cursor-pointer
          transition-all
          hover:text-black"
          onClick={() => alert(`TODO Task 12: Delete task ${id}`)}
        >
          <Trash2 size={20} className="text-gray-500" />
        </Button>
      </div>
    </li>
  );
};
export default TaskCard;
