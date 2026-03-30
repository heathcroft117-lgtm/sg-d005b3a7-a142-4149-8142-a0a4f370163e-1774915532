import { Plus, MapPin, Camera, Search, BookOpen, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActionsCard() {
  const actions = [
    { icon: Camera, label: "Quick Log", href: "/logbook", color: "text-primary" },
    { icon: MapPin, label: "Atlas", href: "/map", color: "text-accent" },
    { icon: Scale, label: "Regulations", href: "/regulations", color: "text-warning" },
    { icon: Search, label: "Species ID", href: "/species", color: "text-info" },
  ];

  return (
    <div className="apex-card p-4">
      <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Button
              key={idx}
              variant="outline"
              className="h-24 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all group"
              asChild
            >
              <a href={action.href}>
                <Icon className={`h-6 w-6 ${action.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-semibold">{action.label}</span>
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
}