import { useState } from "react";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await onAdd({
        title: title.trim(),
        description: description.trim(),
      });

      setTitle("");
      setDescription("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create task. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-slate-700/60 bg-slate-800/70 p-6 shadow-xl shadow-black/10"
    >
      <h2 className="mb-5 text-xl font-semibold text-white">Add New Task</h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="todo-title"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Task Title *
          </label>

          <input
            id="todo-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            maxLength={120}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="todo-description"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Description (Optional)
          </label>

          <textarea
            id="todo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:opacity-50"
        >
          {submitting ? "Adding..." : "+ Add Task"}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
