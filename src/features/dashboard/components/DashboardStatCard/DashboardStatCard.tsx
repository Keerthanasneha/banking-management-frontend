import type { LucideIcon } from "lucide-react";

import "./DashboardStatCard.css";

interface DashboardStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger";
}

export function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "default",
}: DashboardStatCardProps) {
  return (
    <article className={`dashboard-stat-card dashboard-stat-card--${variant}`}>
      <div className="dashboard-stat-card__top">
        <span className="dashboard-stat-card__title">{title}</span>

        <div className="dashboard-stat-card__icon">
          <Icon size={18} />
        </div>
      </div>

      <div className="dashboard-stat-card__value">{value}</div>

      <div className="dashboard-stat-card__description">{description}</div>
    </article>
  );
}
