import { useEffect, useState } from "react";
import api from "./assets/services/api";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">My TODO App</h1>

        {/* ************************ */}
        <TodoForm onAdd={handleAddTodo} />
        {/* ************************ */}
        {loading && <p>Loading tasks...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && todos.length === 0 && (
          <p>No tasks yet. Add your first TODO!</p>
        )}

        {/* <div className="space-y-3">
          {todos.map((todo) => (
            <div>
              <div key={todo._id} className="rounded-xl bg-white p-4 shadow-sm">
                <h2
                  className={`font-semibold ${
                    todo.done ? "text-slate-400 line-through" : "text-slate-800"
                  }`}
                >
                  {todo.title}
                </h2>

                {todo.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {todo.description}
                  </p>
                )}

                <span
                  className={`mt-2 inline-block text-xs ${
                    todo.done ? "text-green-600" : "text-orange-500"
                  }`}
                >
                  {todo.done ? "Completed" : "Pending"}
                </span>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleToggleTodo(todo._id)}
                    aria-label={`Mark ${todo.title} as ${
                      todo.done ? "not completed" : "completed"
                    }`}
                    className="mt-1 h-5 w-5 cursor-pointer accent-blue-600"
                  />

                  <div>
                    {todo.description && (
                      <p className="mt-1 text-sm text-slate-500">
                        {todo.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>



          ))}
        </div> */}

        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={handleToggleTodo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
