import { useEffect, useState } from "react";
import type { IssueFilters as IFilters } from "../types";

interface Props {
  filters: IFilters;
  onFiltersChange: (filters: IFilters) => void;
  onCreateClick: () => void;
}

const IssueFilters = ({ filters, onFiltersChange, onCreateClick }: Props) => {
  const [searchInput, setSearchInput] = useState(filters.search || "");

  // Debounce search — waits 400ms after user stops typing before firing
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
