import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { Issue } from "../types";
import Badge from "../components/Badge";

const IssueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: issue, isLoading } = useQuery<Issue>({
    queryKey: ["issue", id],
    queryFn: () => api.get(`/issues/${id}`).then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-400">
        Issue not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-blue-600 hover:underline mb-6 block"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {issue.title}
          </h1>

          <div className="flex gap-2 mb-6">
            <Badge value={issue.status} type="status" />
            <Badge value={issue.priority} type="priority" />
            <Badge value={issue.severity} type="severity" />
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 mb-1">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {issue.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 border-t pt-4">
            <div>
              <span className="font-medium">Created by: </span>
              {issue.createdBy?.name}
            </div>
            <div>
              <span className="font-medium">Created: </span>
              {new Date(issue.createdAt).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Last updated: </span>
              {new Date(issue.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPage;
