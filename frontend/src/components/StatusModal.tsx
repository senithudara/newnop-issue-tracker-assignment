import type { Issue } from "../types";

interface Props {
  issue: Issue;
  onClose: () => void;
  onSubmit: (status: "open" | "in_progress" | "resolved" | "closed") => void;
  loading: boolean;
}

const StatusModal = ({ issue, onClose, onSubmit, loading }: Props) => {
  const statuses = [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" },
  ];

  const isDestructive = (status: string) =>
    status === "resolved" || status === "closed";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Change Status
        </h2>
        <p className="text-sm text-gray-500 mb-4">"{issue.title}"</p>

        <div className="space-y-2">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => onSubmit(s.value)}
              disabled={loading || issue.status === s.value}
              className={`w-full text-left px-4 py-2 rounded text-sm border transition
                ${
                  issue.status === s.value
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : isDestructive(s.value)
                      ? "border-red-200 text-red-600 hover:bg-red-50"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {s.label}
              {issue.status === s.value && (
                <span className="ml-2 text-xs text-gray-400">(current)</span>
              )}
              {isDestructive(s.value) && issue.status !== s.value && (
                <span className="ml-2 text-xs text-red-400">
                  requires confirmation
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
