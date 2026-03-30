import { useState } from "react";
import { Search, TrendingUp, MapPin, Fish, BookOpen, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface SearchResult {
  type: "water" | "species" | "catch" | "trip" | "achievement";
  title: string;
  subtitle: string;
  url: string;
}

export function SmartSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const recentSearches = [
    { type: "water" as const, title: "Lake Travis", subtitle: "Reservoir • 2.4 mi", url: "/waters" },
    { type: "species" as const, title: "Largemouth Bass", subtitle: "Black Bass Family", url: "/species" },
  ];

  const quickActions = [
    { label: "Log Catch", icon: Fish, url: "/logbook" },
    { label: "View Map", icon: MapPin, url: "/map" },
    { label: "Check Forecast", icon: TrendingUp, url: "/forecast" },
  ];

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "water": return MapPin;
      case "species": return Fish;
      case "catch": return Fish;
      case "trip": return BookOpen;
      case "achievement": return Trophy;
      default: return Search;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search waters, species, catches..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="pl-10 h-12 bg-card border-border"
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full mt-2 w-full tactical-card p-2 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          {query.length === 0 ? (
            <div className="p-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                Quick Actions
              </div>
              <div className="space-y-1">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <a
                      key={idx}
                      href={action.url}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </a>
                  );
                })}
              </div>

              {recentSearches.length > 0 && (
                <>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2 mt-4">
                    Recent
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((result, idx) => {
                      const Icon = getIcon(result.type);
                      return (
                        <a
                          key={idx}
                          href={result.url}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{result.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{result.subtitle}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="p-2">
              <div className="text-sm text-muted-foreground text-center py-8">
                Search results for "{query}"
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}