import React, { useState } from "react";

const TaskFormModalMockup = () => {
  const [showModal, setShowModal] = useState(true);
  const [activeTab, setActiveTab] = useState("details"); // details, subtasks, tags

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    categoryId: "",
    dueDate: "",
    tags: [],
  });

  const [subtasks, setSubtasks] = useState([
    { id: 1, title: "Research authentication libraries", completed: true },
    { id: 2, title: "Implement JWT service", completed: false },
    { id: 3, title: "Add login/register endpoints", completed: false },
  ]);

  const categories = [
    { id: 1, name: "Work", color: "#3B82F6" },
    { id: 2, name: "Personal", color: "#10B981" },
    { id: 3, name: "Design", color: "#EC4899" },
  ];

  const availableTags = [
    "Frontend",
    "Backend",
    "UI/UX",
    "Testing",
    "Security",
    "API",
    "Database",
  ];

  if (!showModal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
        >
          Open Task Form
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      {/* Modal Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900 bg-opacity-50"
        onClick={() => setShowModal(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Create New Task</h2>
              <p className="text-indigo-100 mt-1">Fill in the details below</p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === "details"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("subtasks")}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === "subtasks"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Subtasks (3)
            </button>
            <button
              onClick={() => setActiveTab("tags")}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === "tags"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Tags
            </button>
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="Enter task title..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Min. 3 characters, max. 200 characters
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Describe your task in detail..."
                />
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
              </div>

              {/* Status & Due Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Quick Actions
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
                    📅 Set for Today
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
                    📆 Set for Tomorrow
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
                    🔥 Mark as High Priority
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "subtasks" && (
            <div className="space-y-4">
              {/* Subtask List */}
              <div className="space-y-2">
                {subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                      onChange={() => {}}
                    />
                    <span
                      className={`flex-1 ${subtask.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                    >
                      {subtask.title}
                    </span>
                    <button className="text-gray-400 hover:text-red-600 transition">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Subtask Form */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add a subtask..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    Add
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-indigo-900">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-indigo-900">
                    1/3 completed
                  </span>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: "33%" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tags" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Select Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        formData.tags.includes(tag)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        if (formData.tags.includes(tag)) {
                          setFormData({
                            ...formData,
                            tags: formData.tags.filter((t) => t !== tag),
                          });
                        } else {
                          setFormData({
                            ...formData,
                            tags: [...formData.tags, tag],
                          });
                        }
                      }}
                    >
                      {formData.tags.includes(tag) && "✓ "}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Create New Tag */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Create New Tag
                </h4>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Tag name..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    Create
                  </button>
                </div>
              </div>

              {/* Selected Tags Preview */}
              {formData.tags.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-900 mb-2">
                    Selected Tags ({formData.tags.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Cancel
            </button>
            <div className="flex space-x-3">
              <button className="px-6 py-2.5 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium">
                Save as Draft
              </button>
              <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                Create Task
              </button>
            </div>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mx-6 mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>UI Mockup:</strong> This is your visual reference for
            TaskForm modal. Build your own with similar tabs and interactions.
          </p>
        </div>
      </div>
    </div>
  );
};
export default TaskFormModalMockup;
