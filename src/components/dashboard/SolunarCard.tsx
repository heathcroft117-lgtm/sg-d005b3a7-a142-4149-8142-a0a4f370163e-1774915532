import { Moon, Sun, Clock } from "lucide-react";

interface SolunarPeriod {
  type: "major" | "minor";
  start: string;
  end: string;
  active: boolean;
}

interface SolunarCardProps {
  periods: SolunarPeriod[];
  moonPhase: string;
  moonIllumination: number;
}

export function SolunarCard({ periods, moonPhase, moonIllumination }: SolunarCardProps) {
  return (
    <div className="tactical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold">Solunar Activity</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Moon className="h-4 w-4" />
          <span>{moonPhase}</span>
          <span className="text-xs">({moonIllumination}%)</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {periods.map((period, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              period.active 
                ? "bg-primary/10 border-primary/30" 
                : "bg-muted/30 border-border/50"
            }`}
          >
            <div className={`p-2 rounded-full ${
              period.type === "major" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
            }`}>
              {period.type === "major" ? <Sun className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-semibold capitalize">
                {period.type} Period
                {period.active && <span className="ml-2 text-xs text-primary">● Active</span>}
              </p>
              <p className="text-xs text-muted-foreground">{period.start} - {period.end}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
        <p>Peak feeding activity expected during major periods. Minor periods offer moderate opportunities.</p>
      </div>
    </div>
  );
}