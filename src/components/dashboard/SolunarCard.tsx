import { Moon, Sun, Clock, Circle } from "lucide-react";

interface SolunarPeriod {
  type: "major" | "minor";
  start: string;
  end: string;
  active: boolean;
}

interface SolunarCardProps {
  moonPhase: string;
  periods: SolunarPeriod[];
  nextPeakCountdown: string;
}

export function SolunarCard({ moonPhase, periods, nextPeakCountdown }: SolunarCardProps) {
  const majorPeriods = periods.filter(p => p.type === "major");
  const minorPeriods = periods.filter(p => p.type === "minor");
  const activePeriod = periods.find(p => p.active);

  return (
    <div className="apex-card-hover p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-1">
            Solunar Forecast
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Moon className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">{moonPhase}</span>
          </div>
        </div>
        {activePeriod && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-bold apex-data text-primary">ACTIVE</span>
          </div>
        )}
      </div>

      {nextPeakCountdown && !activePeriod && (
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Next Peak Window</p>
              <p className="text-xl font-bold apex-data text-primary">{nextPeakCountdown}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sun className="h-4 w-4 text-bite-peak" />
            <span className="text-sm font-semibold">Major Periods</span>
            <span className="text-xs apex-data text-muted-foreground">Peak Feeding</span>
          </div>
          <div className="space-y-2">
            {majorPeriods.map((period, idx) => (
              <div 
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  period.active 
                    ? "bg-primary/20 border border-primary/30 glow-green" 
                    : "bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  {period.active ? (
                    <div className="w-3 h-3 rounded-full bg-primary animate-bite-pulse" />
                  ) : (
                    <Circle className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className="apex-data font-semibold">{period.start}</span>
                </div>
                <span className="apex-data text-sm text-muted-foreground">{period.end}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Moon className="h-4 w-4 text-bite-moderate" />
            <span className="text-sm font-semibold">Minor Periods</span>
            <span className="text-xs apex-data text-muted-foreground">Moderate Activity</span>
          </div>
          <div className="space-y-2">
            {minorPeriods.map((period, idx) => (
              <div 
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  period.active 
                    ? "bg-accent/20 border border-accent/30" 
                    : "bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  {period.active ? (
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  ) : (
                    <Circle className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className="apex-data font-semibold">{period.start}</span>
                </div>
                <span className="apex-data text-sm text-muted-foreground">{period.end}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
        <p>Major periods = 60-90min peak activity. Minor periods = 30-45min moderate opportunities.</p>
      </div>
    </div>
  );
}