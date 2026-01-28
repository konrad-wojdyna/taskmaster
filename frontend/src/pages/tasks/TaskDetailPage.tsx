import { useState } from "react";
import { formatTaskDate } from "@/utils/dateFormatter";
import { useNavigate, useParams } from "react-router";
import { useTask, useTasks } from "@/hooks/useTasks";
import { SelectRow } from "@/components";
import type { TaskStatus } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AlertDialog } from "@/components";

const TAB_DETAIL_PAGE = [
  {
    id: "overview",
    title: "Overview",
  },
  {
    id: "subtasks",
    title: "Subtasks",
  },
  {
    id: "comments",
    title: "Comments",
  },
  {
    id: "activity",
    title: "Activity",
  },
] as const;

const STATUS_OPTIONS = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

const TaskDetailPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const id = taskId ? parseInt(taskId, 10) : undefined;
  const { data: task, isLoading, isError } = useTask(id);

  const { editTask, isEditing, deleteTask, isDeleting } = useTasks();

  const [activeTab, setActiveTab] = useState("overview");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading task...</div>
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">
          Task not found or something went wrong. Please try again!
        </div>
      </div>
    );
  }

  const { displayDate: createdAtDate } = formatTaskDate(task.createdAt);
  const { displayDate: updatedAtDate } = formatTaskDate(task.updatedAt);

  const handleStatusChange = async (newValue: string) => {
    await editTask({
      taskId: task.id,
      data: { status: newValue as TaskStatus },
    });
  };

  const handleEdit = () => {
    navigate(`/tasks/${task.id}/edit`);
  };

  const handleDelete = async () => {
    await deleteTask(task.id, {
      onSuccess: () => {
        navigate("/tasks");
      },
    });
  };

  return (
    <section className="mt-5 max-w-9xl mx-auto px-4">
      <header className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
            <div className="flex gap-4 text-sm text-gray-600">
              <p>Created at: {createdAtDate}</p>
              <p>•</p>
              <p>Updated at: {updatedAtDate}</p>
            </div>
          </div>

          <div className="max-w-xs">
            <SelectRow
              name="status"
              labelText="Status:"
              value={task.status}
              onChange={handleStatusChange}
              options={STATUS_OPTIONS}
            />
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <Button
            variant="outline"
            onClick={handleEdit}
            disabled={isEditing || isDeleting}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Pencil size={16} />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isEditing || isDeleting}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </header>

      <AlertDialog
        showDialog={showDeleteDialog}
        setShowDialog={setShowDeleteDialog}
        handleClick={handleDelete}
        title="Delete Task?"
        description="This action cannot be undone. This will permanently delete the task."
        confirmText="Delete"
        isLoading={isDeleting}
      />

      <div className="border-b">
        <div className="flex items-center gap-2">
          {TAB_DETAIL_PAGE.map((tab) => {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer px-4 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>

      <main className="mt-6">
        {activeTab === "overview" && (
          <div className="bg-white border shadow-sm p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {task.description || "No description provided."}
            </p>
          </div>
        )}

        {activeTab === "subtasks" && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <p className="text-yellow-800">
              <strong>Coming in Sprint 3:</strong> Subtasks functionality will
              be available soon.
            </p>
          </div>
        )}

        {activeTab === "comments" && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <p className="text-yellow-800">
              <strong>Coming in Sprint 3:</strong> Comments functionality will
              be available soon.
            </p>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <p className="text-yellow-800">
              <strong>Coming in Sprint 3:</strong> Activity log will be
              available soon.
            </p>
          </div>
        )}
      </main>
    </section>
  );
};
export default TaskDetailPage;
