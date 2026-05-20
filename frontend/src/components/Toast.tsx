import { useEffect } from "react";

interface Props {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, []);

  const colors =
    type === "error"
      ? "bg-red-50 border-red-300 text-red-700"
      : "bg-green-50 border-green-300 text-green-700";

  return (
    <div
      className={`fixed top-4 right-4 z-50 border px-4 py-3 rounded-lg shadow-md text-sm flex items-center gap-3 ${colors}`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="font-bold text-lg leading-none opacity-60 hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
