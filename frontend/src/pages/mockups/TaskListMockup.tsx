import React, { useState } from "react";

const TaskListMockup = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const mockTasks = [
    {
      id: 1,
      title: "Implement user authentication",
      description: "Add JWT-based authentication to the backend API",
      status: "IN_PROGRESS",
      priority: "HIGH",
      category: { name: "Work", color: "#3B82F6" },
      dueDate: "2026-01-15",
      tags: ["Backend", "Security"],
      subtaskCount: 3,
    },
    {
      id: 2,
      title: "Design landing page",
      description: "Create mockups for the new landing page",
      status: "TODO",
      priority: "MEDIUM",
      category: { name: "Design", color: "#EC4899" },
      dueDate: "2026-01-20",
      tags: ["UI/UX", "Frontend"],
      subtaskCount: 0,
    },
    {
      id: 3,
      title: "Write unit tests",
      description: "Achieve 80% test coverage for core services",
      status: "TODO",
      priority: "HIGH",
      category: { name: "Work", color: "#3B82F6" },
      dueDate: "2026-01-12",
      tags: ["Testing", "Backend"],
      subtaskCount: 5,
    },
    {
      id: 4,
      title: "Buy groceries",
      description: "Milk, bread, eggs, vegetables",
      status: "COMPLETED",
      priority: "LOW",
      category: { name: "Personal", color: "#10B981" },
      dueDate: "2026-01-10",
      tags: ["Shopping"],
      subtaskCount: 0,
    },
    {
      id: 5,
      title: "Prepare presentation",
      description: "Q4 results presentation for stakeholders",
      status: "IN_PROGRESS",
      priority: "HIGH",
      category: { name: "Work", color: "#3B82F6" },
      dueDate: "2026-01-14",
      tags: ["Meeting", "Business"],
      subtaskCount: 2,
    },
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      HIGH: "bg-red-100 text-red-800 border-red-200",
      MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-200",
      LOW: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[priority];
  };

  const getStatusColor = (status) => {
    const colors = {
      TODO: "bg-gray-100 text-gray-800 border-gray-200",
      IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
      COMPLETED: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[status];
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && dueDate !== null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                TaskMaster
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">JD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-600 mt-1">Manage and organize your tasks</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 flex items-center space-x-2 transition-all transform hover:scale-105"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>New Task</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setShowFilters(!showFilters)}
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="font-medium text-gray-700">Filters</span>
              <span className="text-sm text-gray-500">(3 active)</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${showFilters ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option>All Status</option>
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option>All Categories</option>
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option>Due Date</option>
                    <option>Priority</option>
                    <option>Created Date</option>
                    <option>Title</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                  Clear All
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {mockTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Checkbox */}
                    <div className="mt-1">
                      <input
                        type="checkbox"
                        checked={task.status === "COMPLETED"}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                        onChange={() => {}}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3
                          className={`text-lg font-semibold ${task.status === "COMPLETED" ? "line-through text-gray-500" : "text-gray-900"}`}
                        >
                          {task.title}
                        </h3>

                        {/* Category Badge */}
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: task.category.color }}
                        >
                          {task.category.name}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3">{task.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {task.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 text-sm">
                        {/* Status */}
                        <span
                          className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(task.status)}`}
                        >
                          {task.status.replace("_", " ")}
                        </span>

                        {/* Priority */}
                        <span
                          className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </span>

                        {/* Due Date */}
                        <div
                          className={`flex items-center space-x-1 ${isOverdue(task.dueDate) && task.status !== "COMPLETED" ? "text-red-600" : "text-gray-500"}`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-xs font-medium">
                            {task.dueDate}
                          </span>
                          {isOverdue(task.dueDate) &&
                            task.status !== "COMPLETED" && (
                              <span className="text-xs font-bold">
                                (OVERDUE)
                              </span>
                            )}
                        </div>

                        {/* Subtasks */}
                        {task.subtaskCount > 0 && (
                          <div className="flex items-center space-x-1 text-gray-500">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                              />
                            </svg>
                            <span className="text-xs">
                              {task.subtaskCount} subtasks
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1-5</span> of{" "}
            <span className="font-medium">24</span> tasks
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>UI Mockup:</strong> This is your visual reference for
            TaskList. Build your own components with similar layout and
            interactions.
          </p>
        </div>
      </div>
    </div>
  );
};
export default TaskListMockup;
