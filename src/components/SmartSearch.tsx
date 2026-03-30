import { useState } from "react";
import { Search, TrendingUp, MapPin, Fish, BookOpen, Trophy, Clock, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function SmartSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    { icon: Fish, label: "Log Catch", href: "/logbook", color: "text-primary" },
    { icon: MapPin, label: "Open Atlas", href: "/map", color: "text-accent" },
    { icon: TrendingUp, label: "Check Forecast", href: "/forecast", color: "text-success" },
    { icon: Trophy, label: "View Tournaments", href: "/tournaments", color: "text-warning" },
  ];

  const recentSearches = [
    { label: "Largemouth Bass regulations", type: "regulation", icon: BookOpen },
    { label: "Lake Travis access points", type: "location", icon: MapPin },
    { label: "Best bait for crappie", type: "intelligence", icon: Brain },
  ];

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search waters, species, regulations..."
          className="pl-10 apex-data bg-muted/30 border-border/50 focus:border-primary/50"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 apex-card border-border/50 z-50 max-h-96 overflow-y-auto">
          {query.length === 0 ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <a
                        key={idx}
                        href={action.href}
                        className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <Icon className={`h-4 w-4 ${action.color}`} />
                        <span className="text-sm font-semibold">{action.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Recent
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, idx) => {
                      const Icon = search.icon;
                      return (
                        <button
                          key={idx}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors text-left"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{search.label}</p>
                            <p className="text-xs text-muted-foreground">{search.type}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  AI Intelligence
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Searching for "{query}" across waters, species, regulations, and catch history...
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}