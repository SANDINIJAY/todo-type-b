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
          "Failed to create task. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Add New Task
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="todo-title"
            className="mb-1 block text-sm font-medium text-slate-700"
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
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="todo-description"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Description (Optional)
          </label>

          <textarea
            id="todo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
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
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Adding..." : "+ Add Task"}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;