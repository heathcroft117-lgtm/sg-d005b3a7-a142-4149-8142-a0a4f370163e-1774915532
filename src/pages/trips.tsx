import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Plus, Calendar, MapPin, Clock, Fish, Camera, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TripsPage() {
  const activeTrip = {
    id: 1,
    name: "Morning Bass Session",
    location: "Lake Travis - Point 7",
    startTime: "6:15 AM",
    duration: "2h 45m",
    catches: 3,
    photos: 2,
    conditions: {
      temp: 68,
      wind: "5 mph NE",
      pressure: "30.12 inHg",
    },
  };

  const recentTrips = [
    {
      id: 2,
      name: "Evening Crappie Run",
      location: "Lake Travis - Dam Area",
      date: "Mar 28, 2026",
      duration: "3h 20m",
      catches: 8,
      species: ["Crappie", "White Bass"],
      photos: 5,
      success: "High",
    },
    {
      id: 3,
      name: "All-Day Tournament",
      location: "Lake Travis - Multiple Points",
      date: "Mar 24, 2026",
      duration: "8h 15m",
      catches: 12,
      species: ["Largemouth Bass", "Spotted Bass"],
      photos: 15,
      success: "Very High",
    },
    {
      id: 4,
      name: "Shore Fishing",
      location: "Town Lake Access",
      date: "Mar 20, 2026",
      duration: "1h 45m",
      catches: 2,
      species: ["Catfish"],
      photos: 1,
      success: "Moderate",
    },
  ];

  return (
    <>
      <SEO 
        title="Trips - FishIQ"
        description="Fishing trip tracker and history"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-1">Trips</h1>
              <p className="text-sm text-muted-foreground">28 trips • 142 catches • 85% success rate</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Start Trip</span>
            </Button>
          </div>

          {/* Active Trip Banner */}
          {activeTrip && (
            <Card className="tactical-card p-6 mb-6 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground animate-pulse">
                      Active Trip
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-1">{activeTrip.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{activeTrip.location}</span>
                  </div>
                </div>
                <Button size="sm" variant="destructive">
                  End Trip
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-card/50">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="font-heading font-bold text-lg">{activeTrip.duration}</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-card/50">
                  <Fish className="h-5 w-5 mx-auto mb-1 text-accent" />
                  <div className="font-heading font-bold text-lg">{activeTrip.catches}</div>
                  <div className="text-xs text-muted-foreground">Catches</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-card/50">
                  <Camera className="h-5 w-5 mx-auto mb-1 text-success" />
                  <div className="font-heading font-bold text-lg">{activeTrip.photos}</div>
                  <div className="text-xs text-muted-foreground">Photos</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Fish className="h-4 w-4" />
                  Log Catch
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Camera className="h-4 w-4" />
                  Add Photo
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <MapPin className="h-4 w-4" />
                  Mark Spot
                </Button>
              </div>
            </Card>
          )}

          {/* Monthly Summary */}
          <Card className="tactical-card p-6 mb-6">
            <h3 className="text-lg font-heading font-semibold mb-4">This Month</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-primary">8</div>
                <div className="text-xs text-muted-foreground mt-1">Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-accent">42</div>
                <div className="text-xs text-muted-foreground mt-1">Catches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-bite-strong">28h</div>
                <div className="text-xs text-muted-foreground mt-1">Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-success">89%</div>
                <div className="text-xs text-muted-foreground mt-1">Success</div>
              </div>
            </div>
          </Card>

          {/* Trip History */}
          <div className="mb-4">
            <h2 className="text-xl font-heading font-semibold mb-4">Recent Trips</h2>
          </div>

          <div className="space-y-4">
            {recentTrips.map((trip) => (
              <Card key={trip.id} className="tactical-card p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg mb-1">{trip.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{trip.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{trip.date}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{trip.duration}</span>
                    </div>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      trip.success === "Very High" 
                        ? "bg-success/20 text-success border-success/30" 
                        : trip.success === "High"
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "bg-muted/20 text-muted-foreground border-muted/30"
                    }
                  >
                    {trip.success}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Fish className="h-4 w-4 text-accent" />
                    <span className="font-semibold">{trip.catches}</span>
                    <span className="text-muted-foreground">catches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{trip.photos}</span>
                    <span className="text-muted-foreground">photos</span>
                  </div>
                </div>

                {trip.species.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {trip.species.map((species, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-full bg-muted/30 text-xs font-medium">
                        {species}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-6 text-center">
            <Button variant="outline">Load More Trips</Button>
          </div>

          {/* Stats Insight */}
          <Card className="tactical-card p-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold mb-1">Trip Insight</h3>
                <p className="text-sm text-muted-foreground">
                  Your most successful trips average 5.1 CPUE and last between 2-4 hours. 
                  Morning trips show 23% higher success rates than afternoon sessions.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* FAB for Quick Trip Start */}
        <button className="action-fab flex items-center justify-center">
          <Plus className="h-6 w-6" />
        </button>
      </Layout>
    </>
  );
}