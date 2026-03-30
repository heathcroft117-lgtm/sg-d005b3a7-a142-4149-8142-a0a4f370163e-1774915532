import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  color?: string;
  subtitle?: string;
}

export function StatCard({ label, value, icon: Icon, trend, color = "text-primary", subtitle }: StatCardProps) {
  return (
    <div className="tactical-card p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <div className={`text-xs font-semibold ${trend.positive ? "text-success" : "text-danger"}`}>
            {trend.positive ? "+" : ""}{trend.value}%
          </div>
        )}
      </div>
      <div className="text-2xl font-heading font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {subtitle && (
        <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
      )}
    </div>
  );
}