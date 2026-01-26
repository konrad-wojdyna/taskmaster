import { Link } from "react-router";
import type { Task } from "@/types/task";

const TaskCard = ({
  id,
  title,
  description,
  status,
  createdAt,
  updatedAt,
  userId,
}: Task) => {
  return (
    <Link to={`/tasks/${id}`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </Link>
  );
};
export default TaskCard;
