const DashboardMockup = () => {
  const stats = {
    total: 24,
    completed: 12,
    pending: 9,
    overdue: 3,
    completionRate: 50,
  };

  const tasksByCategory = [
    { name: "Work", count: 12, color: "#3B82F6" },
    { name: "Personal", count: 7, color: "#10B981" },
    { name: "Design", count: 3, color: "#EC4899" },
    { name: "Other", count: 2, color: "#8B5CF6" },
  ];

  const tasksByPriority = [
    { priority: "HIGH", count: 8, color: "#EF4444" },
    { priority: "MEDIUM", count: 11, color: "#F59E0B" },
    { priority: "LOW", count: 5, color: "#10B981" },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Write unit tests",
      dueDate: "2026-01-12",
      priority: "HIGH",
    },
    {
      id: 2,
      title: "Prepare presentation",
      dueDate: "2026-01-14",
      priority: "HIGH",
    },
    {
      id: 3,
      title: "Implement authentication",
      dueDate: "2026-01-15",
      priority: "HIGH",
    },
    {
      id: 4,
      title: "Design landing page",
      dueDate: "2026-01-20",
      priority: "MEDIUM",
    },
    {
      id: 5,
      title: "Code review session",
      dueDate: "2026-01-22",
      priority: "MEDIUM",
    },
  ];

  const completionTrend = [
    { day: "Mon", completed: 3 },
    { day: "Tue", completed: 5 },
    { day: "Wed", completed: 2 },
    { day: "Thu", completed: 4 },
    { day: "Fri", completed: 6 },
    { day: "Sat", completed: 1 },
    { day: "Sun", completed: 2 },
  ];

  const maxCompleted = Math.max(...completionTrend.map((d) => d.completed));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of your tasks and productivity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Total Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Total Tasks
              </span>
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-indigo-600"
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
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-xs text-green-600 mt-1">+2 this week</div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Completed
              </span>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.completed}
            </div>
            <div className="text-xs text-green-600 mt-1">+5 this week</div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Pending</span>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.pending}
            </div>
            <div className="text-xs text-gray-500 mt-1">In progress</div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Overdue</span>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.overdue}
            </div>
            <div className="text-xs text-red-600 mt-1">Needs attention</div>
          </div>

          {/* Completion Rate */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Completion Rate
              </span>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.completionRate}%
            </div>
            <div className="text-xs text-green-600 mt-1">
              +5% from last week
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tasks by Category - Pie Chart Simulation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Tasks by Category
            </h3>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90">
                  {tasksByCategory.map((cat, idx) => {
                    const total = tasksByCategory.reduce(
                      (sum, c) => sum + c.count,
                      0,
                    );
                    const percent = (cat.count / total) * 100;
                    const prevPercent = tasksByCategory
                      .slice(0, idx)
                      .reduce((sum, c) => sum + (c.count / total) * 100, 0);
                    const circumference = 2 * Math.PI * 70;
                    const offset =
                      circumference - (percent / 100) * circumference;
                    const rotation = (prevPercent / 100) * 360;

                    return (
                      <circle
                        key={idx}
                        cx="96"
                        cy="96"
                        r="70"
                        fill="none"
                        stroke={cat.color}
                        strokeWidth="30"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          transformOrigin: "center",
                        }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">24</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {tasksByCategory.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{cat.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {cat.count}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({Math.round((cat.count / stats.total) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks by Priority - Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Tasks by Priority
            </h3>

            <div className="space-y-6">
              {tasksByPriority.map((item, idx) => {
                const percentage = (item.count / stats.total) * 100;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {item.priority}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {item.count} tasks
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-8">
                      <div
                        className="h-8 rounded-full flex items-center justify-end pr-3 transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                        }}
                      >
                        <span className="text-xs font-medium text-white">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Completion Trend - Line Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Completion Trend (Last 7 Days)
            </h3>

            <div className="flex items-end justify-between h-48 space-x-2">
              {completionTrend.map((day, idx) => {
                const height = (day.completed / maxCompleted) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex-1 flex items-end justify-center">
                      <div
                        className="w-full bg-indigo-600 rounded-t-lg hover:bg-indigo-700 transition-all cursor-pointer relative group"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
                            {day.completed}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{day.day}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Upcoming Tasks
            </h3>

            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <svg
                        className="w-4 h-4 text-gray-400"
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
                      <span className="text-xs text-gray-500">
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      task.priority === "HIGH"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium py-2">
              View all tasks →
            </button>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>UI Mockup:</strong> This is your visual reference for
            Dashboard. Build your own components with real charts library (like
            Recharts or Chart.js).
          </p>
        </div>
      </div>
    </div>
  );
};
export default DashboardMockup;
