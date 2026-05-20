import { useNavigate } from "react-router-dom";
import type { Issue } from "../types";
import Badge from "./Badge";

interface Props {
  issues: Issue[];
  onEdit: (issue: Issue) => void;
  onDelete: (issue: Issue) => void;
  onStatusChange: (issue: Issue) => void;
}

const IssueTable = ({ issues, onEdit, onDelete, onStatusChange }: Props) => {
  const navigate = useNavigate();

  if (issues.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center text-gray-400">
        No issues found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">
              Title
            </th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">
              Status
            </th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">
              Priority
            </th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">
              Severity
            </th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">
              Created
            </th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {issues.map((issue) => (
            <tr key={issue._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <button
                  onClick={() => navigate(`/issues/${issue._id}`)}
                  className="font-medium text-gray-800 hover:text-blue-600 text-left"
                >
                  {issue.title}
                </button>
              </td>
              <td className="px-4 py-3">
                <Badge value={issue.status} type="status" />
              </td>
              <td className="px-4 py-3">
                <Badge value={issue.priority} type="priority" />
              </td>
              <td className="px-4 py-3">
                <Badge value={issue.severity} type="severity" />
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(issue.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onStatusChange(issue)}
                    className="text-xs text-yellow-600 hover:underline"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => onEdit(issue)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(issue)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTable;
