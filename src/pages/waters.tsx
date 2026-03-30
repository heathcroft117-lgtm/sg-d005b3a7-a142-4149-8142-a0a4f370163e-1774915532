import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Search, MapPin, Star, TrendingUp, Fish, Navigation, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WatersPage() {
  const nearbyWaters = [
    {
      id: 1,
      name: "Lake Travis",
      distance: "2.4 mi",
      type: "Reservoir",
      size: "18,930 acres",
      favorited: true,
      catchCount: 89,
      species: ["Bass", "Catfish", "White Bass"],
      biteScore: 82,
      access: "Public Ramps Available",
    },
    {
      id: 2,
      name: "Lake Austin",
      distance: "8.7 mi",
      type: "Reservoir",
      size: "1,599 acres",
      favorited: false,
      catchCount: 24,
      species: ["Bass", "Sunfish"],
      biteScore: 68,
      access: "Limited Public Access",
    },
    {
      id: 3,
      name: "Lady Bird Lake",
      distance: "12.3 mi",
      type: "Urban Reservoir",
      size: "416 acres",
      favorited: true,
      catchCount: 15,
      species: ["Bass", "Catfish"],
      biteScore: 71,
      access: "Shore Fishing Available",
    },
  ];

  const topWaters = [
    { name: "Sam Rayburn Reservoir", state: "TX", rating: 4.8, catches: 1240 },
    { name: "Toledo Bend Reservoir", state: "TX/LA", rating: 4.7, catches: 1180 },
    { name: "Lake Fork", state: "TX", rating: 4.9, catches: 890 },
  ];

  return (
    <>
      <SEO 
        title="Waters - FishIQ"
        description="Discover and explore fishing waters"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold mb-2">Fishing Waters</h1>
            <p className="text-muted-foreground">Discover new spots and plan your next trip</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search lakes, rivers, reservoirs..." 
              className="pl-10 bg-card border-border h-12"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {["Nearby", "Favorites", "Bass Waters", "Public Access", "Boat Ramps"].map((filter, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  idx === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Nearby Waters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-semibold">Nearby Waters</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <Navigation className="h-4 w-4" />
                Use GPS
              </Button>
            </div>

            <div className="space-y-4">
              {nearbyWaters.map((water) => (
                <Card key={water.id} className="tactical-card p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-water-shallow to-water-deep flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-8 w-8 text-primary/80" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-heading font-semibold text-lg mb-1">{water.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{water.distance}</span>
                            <span>•</span>
                            <span>{water.type}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <Star className={`h-5 w-5 ${water.favorited ? "fill-accent text-accent" : ""}`} />
                        </Button>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Fish className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{water.species.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{water.access}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            water.biteScore >= 75 ? "bg-bite-strong/20" : "bg-bite-moderate/20"
                          }`}>
                            <span className={`text-sm font-heading font-bold ${
                              water.biteScore >= 75 ? "text-bite-strong" : "text-bite-moderate"
                            }`}>
                              {water.biteScore}
                            </span>
                          </div>
                          <div className="text-xs">
                            <div className="font-semibold">Bite Score</div>
                            <div className="text-muted-foreground">Today</div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">{water.catchCount}</span> catches logged
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Top-Rated Waters */}
          <Card className="tactical-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-heading font-semibold">Top-Rated Waters</h2>
            </div>
            <div className="space-y-3">
              {topWaters.map((water, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div>
                    <h3 className="font-heading font-semibold">{water.name}</h3>
                    <p className="text-sm text-muted-foreground">{water.state}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-semibold">{water.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{water.catches} catches</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}