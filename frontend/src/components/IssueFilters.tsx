import { useEffect, useState } from "react";
import type { IssueFilters as IFilters } from "../types";

interface Props {
  filters: IFilters;
  onFiltersChange: (filters: IFilters) => void;
  onCreateClick: () => void;
  onExport: () => void;
}

const IssueFilters = ({
  filters,
  onFiltersChange,
  onCreateClick,
  onExport,
}: Props) => {
  const [searchInput, setSearchInput] = useState(filters.search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchInput, page: 1 });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, status: e.target.value, page: 1 });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, priority: e.target.value, page: 1 });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={filters.status || ""}
        onChange={handleStatusChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={filters.priority || ""}
        onChange={handlePriorityChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      {/* Export button */}
      <button
        onClick={onExport}
        title="Export filtered issues as CSV"
        className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-50 bg-white/80 whitespace-nowrap"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </button>

      <button
        onClick={onCreateClick}
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 whitespace-nowrap"
      >
        + New Issue
      </button>
    </div>
  );
};

export default IssueFilters;
