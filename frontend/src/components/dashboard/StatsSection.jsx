import {
  LayoutList,
  Clock,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  CalendarClock,
  TrendingUp,
  Flame,
} from "lucide-react";
import StatsCard from "./StatsCard.jsx";
import { SkeletonStats } from "../common/Skeleton.jsx";

const statsConfig = [
  { key: "total", label: "Total Tasks", icon: LayoutList, color: "blue" },
  { key: "pending", label: "Pending", icon: Clock, color: "amber" },
  { key: "inProgress", label: "In Progress", icon: Loader2, color: "indigo" },
  { key: "completed", label: "Completed", icon: CheckCircle2, color: "emerald" },
  { key: "highPriority", label: "High Priority", icon: Flame, color: "rose" },
  { key: "overdue", label: "Overdue", icon: AlertTriangle, color: "rose" },
  { key: "dueToday", label: "Due Today", icon: CalendarClock, color: "purple" },
  {
    key: "completionRate",
    label: "Completion Rate",
    icon: TrendingUp,
    color: "cyan",
    suffix: "%",
  },
];

export default function StatsSection({ stats, isLoading }) {
  if (isLoading) return <SkeletonStats />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {statsConfig.map(({ key, label, icon, color, suffix }) => (
        <StatsCard
          key={key}
          icon={icon}
          label={label}
          value={
            stats?.[key] != null
              ? `${stats[key]}${suffix || ""}`
              : "—"
          }
          color={color}
        />
      ))}
    </div>
  );
}
