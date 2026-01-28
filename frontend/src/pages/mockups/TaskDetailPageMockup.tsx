import React, { useState } from "react";

const TaskDetailPageMockup = () => {
  const task = {
    id: 1,
    title: "Implement user authentication system",
    description:
      "Build a complete authentication system with JWT tokens, refresh tokens, role-based access control, and email verification. This includes both frontend and backend implementation with proper security measures.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    category: { name: "Work", color: "#3B82F6" },
    dueDate: "2026-01-15",
    createdAt: "2026-01-08",
    updatedAt: "2026-01-11",
    tags: ["Backend", "Security", "API"],
    subtasks: [
      { id: 1, title: "Research authentication libraries", completed: true },
      { id: 2, title: "Implement JWT service", completed: true },
      { id: 3, title: "Add login/register endpoints", completed: false },
      { id: 4, title: "Implement refresh token logic", completed: false },
      { id: 5, title: "Add email verification", completed: false },
    ],
  };

  const [activeTab, setActiveTab] = useState("overview");
  const [comment, setComment] = useState("");

  const comments = [
    {
      id: 1,
      author: "John Doe",
      avatar: "JD",
      content: "Started working on this. JWT implementation looks good so far.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Jane Smith",
      avatar: "JS",
      content: "Make sure to implement proper token rotation for security.",
      timestamp: "1 day ago",
    },
  ];

  const activityLog = [
    {
      id: 1,
      action: "Changed status",
      from: "TODO",
      to: "IN_PROGRESS",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      action: "Completed subtask",
      detail: "Implement JWT service",
      timestamp: "3 hours ago",
    },
    { id: 3, action: "Added tag", detail: "Security", timestamp: "1 day ago" },
    { id: 4, action: "Created task", timestamp: "3 days ago" },
  ];

  const completedSubtasks = task.subtasks.filter((st) => st.completed).length;
  const progressPercentage = (completedSubtasks / task.subtasks.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
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
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {task.title}
                </h1>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: task.category.color }}
                >
                  {task.category.name}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Created {task.createdAt}</span>
                <span>•</span>
                <span>Updated {task.updatedAt}</span>
                <span>•</span>
                <span>Task #{task.id}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center space-x-2">
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
                <span>Edit</span>
              </button>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center space-x-2">
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
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select
                value={task.status}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Priority:
              </span>
              <select
                value={task.priority}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-400"
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
              <span className="text-sm font-medium text-gray-700">Due:</span>
              <span className="text-sm text-red-600 font-medium">
                {task.dueDate} (4 days left)
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-3 px-2 font-medium border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("subtasks")}
              className={`py-3 px-2 font-medium border-b-2 transition-colors ${
                activeTab === "subtasks"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Subtasks ({task.subtasks.length})
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`py-3 px-2 font-medium border-b-2 transition-colors ${
                activeTab === "comments"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Comments ({comments.length})
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`py-3 px-2 font-medium border-b-2 transition-colors ${
                activeTab === "activity"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Activity
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Description */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {/* Progress */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Progress
                    </h3>
                    <span className="text-sm font-bold text-indigo-600">
                      {completedSubtasks}/{task.subtasks.length} subtasks
                      completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      className="bg-indigo-600 h-4 rounded-full transition-all flex items-center justify-center"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      {progressPercentage > 10 && (
                        <span className="text-xs font-bold text-white">
                          {Math.round(progressPercentage)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Subtasks Preview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Subtasks
                    </h3>
                    <button
                      onClick={() => setActiveTab("subtasks")}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      View all →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {task.subtasks.slice(0, 3).map((subtask) => (
                      <div
                        key={subtask.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition"
                      >
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                          onChange={() => {}}
                        />
                        <span
                          className={
                            subtask.completed
                              ? "line-through text-gray-500"
                              : "text-gray-900"
                          }
                        >
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "subtasks" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  All Subtasks
                </h3>
                <div className="space-y-3">
                  {task.subtasks.map((subtask) => (
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

                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add a new subtask..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    Add
                  </button>
                </div>
              </div>
            )}

            {activeTab === "comments" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Comments
                  </h3>

                  {/* Add Comment */}
                  <div className="mb-6">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      placeholder="Add a comment..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        Post Comment
                      </button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-gray-700">
                            {comment.avatar}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">
                                {comment.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Activity Log
                </h3>
                <div className="space-y-4">
                  {activityLog.map((log) => (
                    <div key={log.id} className="flex space-x-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-gray-900">
                          <span className="font-medium">{log.action}</span>
                          {log.from && log.to && (
                            <>
                              {" "}
                              from{" "}
                              <span className="font-medium">
                                {log.from}
                              </span> to{" "}
                              <span className="font-medium">{log.to}</span>
                            </>
                          )}
                          {log.detail && (
                            <>
                              : <span className="italic">{log.detail}</span>
                            </>
                          )}
                        </p>
                        <span className="text-xs text-gray-500">
                          {log.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
                <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-600 text-sm rounded-full hover:border-indigo-600 hover:text-indigo-600 transition">
                  + Add tag
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtasks</span>
                  <span className="text-sm font-medium text-gray-900">
                    {completedSubtasks}/{task.subtasks.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Comments</span>
                  <span className="text-sm font-medium text-gray-900">
                    {comments.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Activity</span>
                  <span className="text-sm font-medium text-gray-900">
                    {activityLog.length} events
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center space-x-2">
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Duplicate task</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center space-x-2">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span>Share task</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center space-x-2">
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span>Export task</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>UI Mockup:</strong> This is your visual reference for
            TaskDetail page. Build your own with similar layout and tabs.
          </p>
        </div>
      </div>
    </div>
  );
};
export default TaskDetailPageMockup;
