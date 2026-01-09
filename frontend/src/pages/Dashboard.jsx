import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTasks(res.data);
    } catch {
      setError("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    if (user?.token) fetchTasks();
  }, [user]);

  // Add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTasks([res.data, ...tasks]);
      setTitle("");
      setDescription("");
    } catch {
      setError("Failed to add task");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch {
      setError("Failed to delete task");
    }
  };

  // Toggle task status
  const handleToggleStatus = async (task) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          status: task.status === "pending" ? "completed" : "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch {
      setError("Failed to update task");
    }
  };

  // Search + filter
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-rose-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-indigo-100 to-sky-100 p-5 rounded-2xl shadow">
          <h1 className="text-3xl font-bold text-slate-800">
            📋 Task Dashboard
          </h1>
          <button
            onClick={logout}
            className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-xl shadow transition"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <form
          onSubmit={handleAddTask}
          className="bg-white rounded-2xl shadow p-6 mb-6"
        >
          {error && <p className="text-rose-500 mb-3">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition shadow">
              Add Task
            </button>
          </div>
        </form>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            className="border p-3 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Tasks */}
        {filteredTasks.length === 0 && (
          <p className="text-center text-slate-400 mt-12">
            No tasks found — start by adding one
          </p>
        )}

        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className={`bg-white rounded-2xl p-5 shadow hover:shadow-md transition flex justify-between items-start border-l-4 ${
                task.status === "completed"
                  ? "border-green-400"
                  : "border-yellow-400"
              }`}
            >
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    task.status === "completed"
                      ? "line-through text-slate-400"
                      : "text-slate-800"
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-slate-500 text-sm">
                  {task.description}
                </p>

                <span
                  className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(task)}
                  className="text-sm px-3 py-1 border rounded-lg hover:bg-slate-50"
                >
                  {task.status === "pending" ? "Complete" : "Undo"}
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-sm px-3 py-1 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
