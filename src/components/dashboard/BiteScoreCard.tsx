import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface BiteScoreCardProps {
  score: number;
  trend: "up" | "down" | "stable";
  period: string;
}

export function BiteScoreCard({ score, trend, period }: BiteScoreCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  
  const scoreColor = score >= 75 ? "text-bite-strong" : score >= 50 ? "text-bite-moderate" : "text-bite-weak";
  
  return (
    <div className="tactical-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground font-medium">Current Bite Score</p>
          <p className="text-xs text-muted-foreground mt-1">{period}</p>
        </div>
        <TrendIcon className={`h-5 w-5 ${trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"}`} />
      </div>
      
      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-5xl font-heading font-bold ${scoreColor}`}>{score}</span>
        <span className="text-xl text-muted-foreground font-medium">/100</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Conditions</span>
          <span className="font-medium">Optimal</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Pressure</span>
          <span className="font-medium">Rising</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Moon Phase</span>
          <span className="font-medium">Waxing Crescent</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-foreground">
          <span className="font-semibold text-primary">Strong bite window</span> expected 6:00-8:30 AM. 
          Water temp rising, stable pressure trend.
        </p>
      </div>
    </div>
  );
}