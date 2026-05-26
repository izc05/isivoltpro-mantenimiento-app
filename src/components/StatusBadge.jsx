import { classNames } from "../utils/classNames";
import { getStatusTone } from "../utils/status";

export default function StatusBadge({ status, className = "" }) {
  const tone = getStatusTone(status);
  const styles = {
    success: "bg-accentSoft text-green-800",
    info: "bg-blue-100 text-blue-700",
    warning: "bg-orange-100 text-orange-700",
    danger: "bg-red-100 text-red-700",
    neutral: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={classNames("inline-flex items-center rounded-xl px-3 py-1 text-sm font-black", styles[tone], className)}>
      {status}
    </span>
  );
}
