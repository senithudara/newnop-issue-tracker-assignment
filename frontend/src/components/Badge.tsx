interface Props {
  value: string;
  type: "status" | "priority" | "severity";
}

const statusColors: Record<string, string> = {
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

const priorityColors: Record<string, string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-orange-100 text-orange-600",
  high: "bg-red-100 text-red-600",
  critical: "bg-red-200 text-red-800",
};

const severityColors: Record<string, string> = {
  minor: "bg-slate-100 text-slate-600",
  major: "bg-orange-100 text-orange-600",
  critical: "bg-red-100 text-red-600",
  blocker: "bg-red-200 text-red-800",
};

const Badge = ({ value, type }: Props) => {
  const colorMap =
    type === "status"
      ? statusColors
      : type === "priority"
        ? priorityColors
        : severityColors;

  const colors = colorMap[value] || "bg-gray-100 text-gray-600";
  const label = value.replace("_", " ");

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${colors}`}
    >
      {label}
    </span>
  );
};

export default Badge;
