import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatCard({ label, value, subtitle, icon: Icon, trend, trendValue }: StatCardProps) {
  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-danger";
    return "text-muted-foreground";
  };

  return (
    <div className="intelligence-panel">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-primary" />}
      </div>
      
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold apex-data">{value}</p>
        {trendValue && (
          <span className={`text-sm font-semibold ${getTrendColor()}`}>
            {trend === "up" && "↑"}{trend === "down" && "↓"} {trendValue}
          </span>
        )}
      </div>
      
      {subtitle && (
        <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
      )}
    </div>
  );
}