import { useEffect, useState } from "react";
import api from "./assets/services/api";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.done).length;
  const pendingTasks = totalTasks - completedTasks;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get("/todos");
        setTodos(response.data);
      } catch (err) {
        setError("Failed to load TODOs. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Create
  const handleAddTodo = async (todoData) => {
    const response = await api.post("/todos", todoData);

    setTodos((prevTodos) => [response.data, ...prevTodos]);
  };

  //  Mark Done / Undone
  const handleToggleTodo = async (id) => {
    try {
      const response = await api.patch(`/todos/${id}/done`);

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo)),
      );
    } catch (error) {
      console.error("Error updating TODO:", error);
      alert("Failed to update task status. Please try again.");
    }
  };

  // Edit
  const handleUpdateTodo = async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === id ? response.data : todo)),
    );
  };
  //Delete
  const handleDeleteTodo = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/todos/${id}`);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting TODO:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] px-4 py-6 text-white lg:h-screen lg:overflow-hidden">
      <div className="mx-auto flex h-full max-w-7xl flex-col">
        {/* Header */}
        <header className="mb-6 my-20 shrink-0">
          <h1 className="text-5xl font-bold tracking-tight">TODO APP ✍️</h1>
        </header>

        {/* Main Dashboard */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
          {/* LEFT SIDE */}
          <section className="space-y-6 lg:col-span-2 lg:overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              {" "}
              {/* Total Tasks */}
              <div className="rounded-2xl border border-slate-700/60 bg-slate-800/70 p-5">
                <p className="text-sm text-slate-400">Total Tasks</p>
                <h2 className="mt-2 text-3xl font-bold text-blue-400">
                  {totalTasks}
                </h2>
              </div>
              {/* Pending Tasks */}
              <div className="rounded-2xl border border-slate-700/60 bg-slate-800/70 p-5">
                <p className="text-sm text-slate-400">Pending</p>
                <h2 className="mt-2 text-3xl font-bold text-amber-400">
                  {pendingTasks}
                </h2>
              </div>
              {/* Completed Tasks */}
              <div className="rounded-2xl border border-slate-700/60 bg-slate-800/70 p-5">
                <p className="text-sm text-slate-400">Completed</p>
                <h2 className="mt-2 text-3xl font-bold text-emerald-400">
                  {completedTasks}
                </h2>
              </div>
            </div>

            <TodoForm onAdd={handleAddTodo} />
          </section>

          {/* RIGHT SIDE */}
          <section className="flex min-h-0 flex-col rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5 lg:col-span-3">
            <div className="mb-5 flex shrink-0 items-center justify-between">
              <h2 className="text-xl font-semibold">My Tasks</h2>

              <span className="text-sm text-slate-400">{totalTasks} tasks</span>
            </div>

            <div className="min-h-0 flex-1 space-y-3 lg:overflow-y-auto lg:pr-2">
              {loading && <p className="text-slate-400">Loading tasks...</p>}

              {error && <p className="text-red-400">{error}</p>}

              {!loading && !error && todos.length === 0 && (
                <p className="text-slate-400">
                  No tasks yet. Add your first TODO!
                </p>
              )}

              {!loading &&
                !error &&
                todos.map((todo) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
