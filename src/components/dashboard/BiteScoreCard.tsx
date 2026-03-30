import { TrendingUp, TrendingDown, Minus, Zap, Droplets, Wind } from "lucide-react";

interface BiteScoreCardProps {
  score: number;
  trend: "rising" | "falling" | "stable";
  conditions: {
    pressure: string;
    waterTemp: string;
    windSpeed: string;
  };
}

export function BiteScoreCard({ score, trend, conditions }: BiteScoreCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "rising": return <TrendingUp className="h-5 w-5 text-success" />;
      case "falling": return <TrendingDown className="h-5 w-5 text-danger" />;
      default: return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getTrendText = () => {
    switch (trend) {
      case "rising": return "Improving";
      case "falling": return "Declining";
      default: return "Stable";
    }
  };

  const getScoreColor = () => {
    if (score >= 8) return "text-bite-peak";
    if (score >= 6) return "text-bite-strong";
    if (score >= 4) return "text-bite-moderate";
    return "text-bite-weak";
  };

  const getScoreGlow = () => {
    if (score >= 8) return "glow-green-strong";
    if (score >= 6) return "glow-green";
    return "";
  };

  const getRingGradient = () => {
    if (score >= 8) return "from-bite-peak via-bite-strong to-bite-moderate";
    if (score >= 6) return "from-bite-strong via-bite-moderate to-bite-weak";
    return "from-bite-moderate via-bite-weak to-muted";
  };

  const percentage = (score / 10) * 100;

  return (
    <div className="apex-card-hover p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-1">
            Apex Bite Score
          </h3>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className="text-sm font-semibold">{getTrendText()}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs apex-data text-muted-foreground">
          <Zap className="h-3 w-3" />
          <span>LIVE</span>
        </div>
      </div>

      <div className="flex items-center gap-8 mb-6">
        <div className="relative">
          <svg className="w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
              opacity="0.2"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#biteGradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${percentage * 3.52} 352`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="biteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`stop-${score >= 8 ? 'bite-peak' : score >= 6 ? 'bite-strong' : 'bite-moderate'}`} />
                <stop offset="100%" className={`stop-${score >= 6 ? 'bite-strong' : 'bite-moderate'}`} />
              </linearGradient>
            </defs>
          </svg>
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${getScoreGlow()}`}>
            <div className={`text-5xl font-bold apex-data ${getScoreColor()}`}>
              {score.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground apex-data">/ 10.0</div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="intelligence-panel space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Pressure</span>
              </div>
              <span className="apex-data font-semibold">{conditions.pressure}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Water Temp</span>
              </div>
              <span className="apex-data font-semibold">{conditions.waterTemp}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-info" />
                <span className="text-muted-foreground">Wind</span>
              </div>
              <span className="apex-data font-semibold">{conditions.windSpeed}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-insight text-sm">
        <p className="font-semibold mb-1">🎯 Tactical Insight</p>
        <p className="text-muted-foreground">
          {score >= 8 
            ? "Prime feeding window active. Structure edges and transition zones highly productive."
            : score >= 6
            ? "Favorable conditions. Target active feeding zones with natural presentations."
            : score >= 4
            ? "Moderate activity. Slow methodical approaches recommended."
            : "Low activity period. Focus on proven patterns and high-percentage locations."}
        </p>
      </div>
    </div>
  );
}