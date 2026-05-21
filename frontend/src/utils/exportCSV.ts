import type { Issue } from "../types";

export const exportToCSV = (issues: Issue[]) => {
  if (issues.length === 0) return;

  const headers = [
    "Title",
    "Description",
    "Status",
    "Priority",
    "Severity",
    "Created By",
    "Created At",
    "Updated At",
  ];

  const rows = issues.map((issue) => [
    `"${issue.title.replace(/"/g, '""')}"`,
    `"${issue.description.replace(/"/g, '""')}"`,
    issue.status,
    issue.priority,
    issue.severity,
    issue.createdBy?.name || "Unknown",
    new Date(issue.createdAt).toLocaleDateString(),
    new Date(issue.updatedAt).toLocaleDateString(),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create a download link and trigger it
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `flagit-issues-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};
