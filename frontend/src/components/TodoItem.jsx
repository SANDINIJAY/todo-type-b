import { useState } from "react";

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await onUpdate(todo._id, {
        title: title.trim(),
        description: description.trim(),
      });

      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setError("");
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            aria-label="Task title"
            className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Task description"
            rows={3}
            className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
          />

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => onToggle(todo._id)}
              aria-label={`Toggle completion for ${todo.title}`}
              className="mt-1 h-5 w-5 cursor-pointer accent-blue-600"
            />

            <div className="min-w-0">
              <h3
                className={`break-words font-semibold ${
                  todo.done ? "text-slate-400 line-through" : "text-slate-800"
                }`}
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p className="mt-1 break-words text-sm text-slate-500">
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
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(todo._id)}
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
