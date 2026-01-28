import { ArrowLeft, Save, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTask } from "@/hooks/useTasks";
import { EditTaskForm } from "@/components";

const TAB_EDIT_PAGE = [
  {
    id: "details",
    title: "Details",
  },
  {
    id: "subtasks",
    title: "Subtasks",
  },
  {
    id: "tags",
    title: "Tags",
  },
] as const;

type TabId = (typeof TAB_EDIT_PAGE)[number]["id"];

const EditTaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const id = taskId ? parseInt(taskId, 10) : undefined;
  const { data: task, isLoading, isError } = useTask(id);

  const [activeTab, setActiveTab] = useState<TabId>("details");

  const navigate = useNavigate();

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

  return (
    <section>
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/tasks/${task.id}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Task</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">Edit Task</h1>
          </div>
        </div>
      </div>
      <div className="border-b">
        <div className="flex items-center gap-2">
          {TAB_EDIT_PAGE.map((tab) => {
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
        {activeTab === "details" && <EditTaskForm key={task.id} task={task} />}

        {activeTab === "subtasks" && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <p className="text-yellow-800">
              <strong>Coming in Sprint 3:</strong> Subtasks functionality will
              be available soon.
            </p>
          </div>
        )}

        {activeTab === "tags" && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <p className="text-yellow-800">
              <strong>Coming in Sprint 3:</strong> Tags functionality will be
              available soon.
            </p>
          </div>
        )}
      </main>
    </section>
  );
};
export default EditTaskPage;
