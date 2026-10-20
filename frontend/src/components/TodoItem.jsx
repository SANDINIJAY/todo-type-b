import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

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
    <div className="rounded-2xl border border-slate-700/60 bg-slate-800/70 p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:border-slate-600 hover:shadow-blue-950/20">
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            aria-label="Task title"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Task description"
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-600"
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
              className="
                            mt-1 h-6 w-6 shrink-0
                            cursor-pointer appearance-none rounded-full
                            border-2 border-slate-500 bg-slate-900
                            transition-all duration-200
                            hover:border-blue-400
                            checked:border-blue-500
                            checked:bg-blue-600
                            checked:bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%223%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M5 12l4 4L19 6%22/%3E%3C/svg%3E')]
                            checked:bg-center checked:bg-no-repeat
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-blue-400  
  "
            />

            <div className="min-w-0">
              <h3
                className={`break-words font-semibold ${
                  todo.done ? "text-slate-500 line-through" : "text-slate-100"
                }`}
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p className="mt-1 break-words text-sm text-slate-400">
                  {todo.description}
                </p>
              )}

              <span
                className={`mt-3 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                  todo.done
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                }`}
              >
                {todo.done ? "✓ Completed" : "● Pending"}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
            >
              <Pencil size={18} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(todo._id)}
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
