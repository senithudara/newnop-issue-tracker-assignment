import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import useAuthStore from "../store/authStore";
import type { Issue, IssueFilters, PaginatedIssues, IssueStat } from "../types";
import StatsCards from "../components/StatsCards";
import IssueFiltersComponent from "../components/IssueFilters";
import IssueTable from "../components/IssueTable";
import IssueModal from "../components/IssueModal";
import StatusModal from "../components/StatusModal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";
import Toast from "../components/Toast";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<IssueFilters>({ page: 1 });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [deletingIssue, setDeletingIssue] = useState<Issue | null>(null);
  const [statusIssue, setStatusIssue] = useState<Issue | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  // Fetch issues
  const { data: issueData, isLoading } = useQuery<PaginatedIssues>({
    queryKey: ["issues", filters],
    queryFn: () => api.get("/issues", { params: filters }).then((r) => r.data),
  });

  // Fetch stats
  const { data: stats = [] } = useQuery<IssueStat[]>({
    queryKey: ["issueStats"],
    queryFn: () => api.get("/issues/stats").then((r) => r.data),
  });

  // Create issue
  const createMutation = useMutation({
    mutationFn: (data: Partial<Issue>) => api.post("/issues", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["issueStats"] });
      setShowCreateModal(false);
    },
  });

  // Update issue
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Issue> }) =>
      api.patch(`/issues/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["issueStats"] });
      setEditingIssue(null);
      setStatusIssue(null);
      setToast({ message: "Issue updated successfully", type: "success" });
    },
    onError: (error: any) => {
      setEditingIssue(null);
      setStatusIssue(null);
      setToast({
        message: error.response?.data?.message || "Failed to update issue",
        type: "error",
      });
    },
  });

  // Delete issue
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/issues/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["issueStats"] });
      setDeletingIssue(null);
      setToast({ message: "Issue deleted successfully", type: "success" });
    },
    onError: (error: any) => {
      setDeletingIssue(null);
      setToast({
        message: error.response?.data?.message || "Failed to delete issue",
        type: "error",
      });
    },
  });

  const handleStatusChange = (
    status: "open" | "in_progress" | "resolved" | "closed",
  ) => {
    if (!statusIssue) return;
    updateMutation.mutate({ id: statusIssue._id, data: { status } });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-clash font-semibold text-gray-800 text-2xl">
            Flagit
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <StatsCards stats={stats} />

        <IssueFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          onCreateClick={() => setShowCreateModal(true)}
        />

        {isLoading ? (
          <div className="text-center py-12 text-gray-400">
            Loading issues...
          </div>
        ) : (
          <>
            <IssueTable
              issues={issueData?.issues || []}
              onEdit={(issue) => setEditingIssue(issue)}
              onDelete={(issue) => setDeletingIssue(issue)}
              onStatusChange={(issue) => setStatusIssue(issue)}
            />
            <Pagination
              page={issueData?.page || 1}
              pages={issueData?.pages || 1}
              onPageChange={(p) => setFilters({ ...filters, page: p })}
            />
          </>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <IssueModal
          issue={null}
          onClose={() => setShowCreateModal(false)}
          onSubmit={(data) => createMutation.mutate(data)}
          loading={createMutation.isPending}
        />
      )}

      {editingIssue && (
        <IssueModal
          issue={editingIssue}
          onClose={() => setEditingIssue(null)}
          onSubmit={(data) =>
            updateMutation.mutate({ id: editingIssue._id, data })
          }
          loading={updateMutation.isPending}
        />
      )}

      {deletingIssue && (
        <DeleteModal
          issue={deletingIssue}
          onClose={() => setDeletingIssue(null)}
          onConfirm={() => deleteMutation.mutate(deletingIssue._id)}
          loading={deleteMutation.isPending}
        />
      )}

      {statusIssue && (
        <StatusModal
          issue={statusIssue}
          onClose={() => setStatusIssue(null)}
          onSubmit={handleStatusChange}
          loading={updateMutation.isPending}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
