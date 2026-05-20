import type { IssueStat } from "../types";

interface Props {
  stats: IssueStat[];
}

const statConfig: Record<string, { label: string; color: string }> = {
  open: { label: "Open", color: "border-blue-400" },
  in_progress: { label: "In Progress", color: "border-yellow-400" },
  resolved: { label: "Resolved", color: "border-green-400" },
  closed: { label: "Closed", color: "border-gray-400" },
};

const StatsCards = ({ stats }: Props) => {
  const allStatuses = ["open", "in_progress", "resolved", "closed"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {allStatuses.map((status) => {
        const stat = stats.find((s) => s._id === status);
        const config = statConfig[status];
        return (
          <div
            key={status}
            className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${config.color}`}
          >
            <p className="text-sm text-gray-500">{config.label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {stat?.count ?? 0}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
