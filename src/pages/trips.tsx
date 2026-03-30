import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  Clock,
  Fish,
  TrendingUp,
  Users,
  Plus,
  Target,
  Droplets,
  Wind,
  Gauge,
  CheckCircle2
} from "lucide-react";

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingTrips = [
    {
      id: "1",
      name: "Weekend Bass Assault",
      water: "Lake Travis",
      date: "2026-04-05",
      time: "05:30 AM",
      duration: "6 hours",
      targetSpecies: ["Largemouth Bass", "Smallmouth Bass"],
      forecast: { biteScore: 8.2, conditions: "Excellent" },
      companions: ["Mike R.", "Sarah K."],
      status: "confirmed",
    },
    {
      id: "2",
      name: "White Bass Spring Run",
      water: "Lake Georgetown",
      date: "2026-03-28",
      time: "06:00 AM",
      duration: "4 hours",
      targetSpecies: ["White Bass"],
      forecast: { biteScore: 9.1, conditions: "Prime" },
      companions: [],
      status: "planned",
    },
  ];

  const pastTrips = [
    {
      id: "3",
      name: "Morning Trophy Hunt",
      water: "Lake Travis",
      date: "2026-03-15",
      duration: "5 hours",
      catches: 8,
      species: 3,
      totalWeight: 24.5,
      biggestFish: 6.8,
      cpue: 1.6,
      conditions: { temp: 68, pressure: 30.12, wind: "SE 8mph" },
      success: "high",
    },
    {
      id: "4",
      name: "Striper Search",
      water: "Lake Georgetown",
      date: "2026-03-08",
      duration: "6 hours",
      catches: 4,
      species: 2,
      totalWeight: 48.2,
      biggestFish: 18.4,
      cpue: 0.67,
      conditions: { temp: 62, pressure: 29.98, wind: "N 12mph" },
      success: "moderate",
    },
  ];

  return (
    <>
      <SEO 
        title="Trip Manager - Apex" 
        description="Plan fishing trips with forecast integration and track detailed outing records"
      />
      <Layout>
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apex-heading mb-1">Trip Manager</h1>
              <p className="text-sm text-muted-foreground apex-data">
                Plan • Track • Analyze
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Plan Trip</span>
            </Button>
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="apex-card p-4">
              <Calendar className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold apex-data mb-1">24</p>
              <p className="text-xs text-muted-foreground">Total Trips</p>
            </Card>
            <Card className="apex-card p-4">
              <Fish className="h-5 w-5 text-success mb-2" />
              <p className="text-2xl font-bold apex-data mb-1">127</p>
              <p className="text-xs text-muted-foreground">Total Catches</p>
            </Card>
            <Card className="apex-card p-4">
              <Target className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold apex-data mb-1">2.4</p>
              <p className="text-xs text-muted-foreground">Avg CPUE</p>
            </Card>
            <Card className="apex-card p-4">
              <TrendingUp className="h-5 w-5 text-success mb-2" />
              <p className="text-2xl font-bold apex-data mb-1">+18%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </Card>
          </div>

          {/* Trip Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming" className="apex-data">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming ({upcomingTrips.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="apex-data">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Past ({pastTrips.length})
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Trips */}
            <TabsContent value="upcoming" className="mt-6 space-y-4">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id} className="apex-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{trip.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{trip.water}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`verification-badge ${
                          trip.status === "confirmed" 
                            ? "bg-success/20 text-success border-success/30" 
                            : "bg-warning/20 text-warning border-warning/30"
                        }`}>
                          {trip.status.toUpperCase()}
                        </div>
                        {trip.companions.length > 0 && (
                          <div className="px-3 py-1 rounded-full bg-muted/50 text-xs font-semibold apex-data flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {trip.companions.length}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold apex-data text-primary mb-1">
                        {trip.forecast.biteScore}
                      </div>
                      <p className="text-xs text-muted-foreground">Bite Score</p>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="intelligence-panel">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Schedule</p>
                      </div>
                      <p className="text-sm font-semibold apex-data">
                        {new Date(trip.date).toLocaleDateString()} • {trip.time}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Duration: {trip.duration}
                      </p>
                    </div>

                    <div className="intelligence-panel">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Forecast</p>
                      </div>
                      <p className="text-sm font-semibold text-success">
                        {trip.forecast.conditions}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Bite window analysis
                      </p>
                    </div>
                  </div>

                  {/* Target Species */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Target Species</p>
                    <div className="flex flex-wrap gap-2">
                      {trip.targetSpecies.map((species) => (
                        <span key={species} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold apex-data">
                          {species}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Companions */}
                  {trip.companions.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Fishing With</p>
                      <div className="flex flex-wrap gap-2">
                        {trip.companions.map((companion) => (
                          <span key={companion} className="px-3 py-1 rounded-full bg-muted/50 text-xs font-semibold apex-data">
                            {companion}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="flex-1 gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Start Trip
                    </Button>
                    <Button variant="outline" className="gap-2">
                      Edit Details
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Past Trips */}
            <TabsContent value="past" className="mt-6 space-y-4">
              {pastTrips.map((trip) => (
                <Card key={trip.id} className="apex-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{trip.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{trip.water}</span>
                        <span>•</span>
                        <span className="apex-data">{new Date(trip.date).toLocaleDateString()}</span>
                      </div>
                      <div className={`verification-badge ${
                        trip.success === "high" 
                          ? "bg-success/20 text-success border-success/30" 
                          : trip.success === "moderate"
                          ? "bg-warning/20 text-warning border-warning/30"
                          : "bg-destructive/20 text-destructive border-destructive/30"
                      }`}>
                        {trip.success.toUpperCase()} SUCCESS
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold apex-data text-primary mb-1">
                        {trip.cpue}
                      </div>
                      <p className="text-xs text-muted-foreground">CPUE</p>
                    </div>
                  </div>

                  {/* Trip Stats */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="intelligence-panel text-center">
                      <Fish className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-lg font-bold apex-data mb-1">{trip.catches}</p>
                      <p className="text-xs text-muted-foreground">Catches</p>
                    </div>
                    <div className="intelligence-panel text-center">
                      <Target className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-lg font-bold apex-data mb-1">{trip.species}</p>
                      <p className="text-xs text-muted-foreground">Species</p>
                    </div>
                    <div className="intelligence-panel text-center">
                      <TrendingUp className="h-5 w-5 text-success mx-auto mb-2" />
                      <p className="text-lg font-bold apex-data mb-1">{trip.totalWeight}</p>
                      <p className="text-xs text-muted-foreground">Total (lbs)</p>
                    </div>
                    <div className="intelligence-panel text-center">
                      <Fish className="h-5 w-5 text-warning mx-auto mb-2" />
                      <p className="text-lg font-bold apex-data mb-1">{trip.biggestFish}</p>
                      <p className="text-xs text-muted-foreground">Big (lbs)</p>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="intelligence-panel">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Conditions Logged</p>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-primary" />
                        <span className="apex-data">{trip.conditions.temp}°F</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-primary" />
                        <span className="apex-data">{trip.conditions.pressure}"</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-primary" />
                        <span className="apex-data">{trip.conditions.wind}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <Fish className="h-4 w-4" />
                    View Full Trip Report
                  </Button>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* FAB - Quick Trip Start */}
        <button className="fixed bottom-20 md:bottom-8 right-4 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl apex-glow transition-all active:scale-95 flex items-center justify-center z-40">
          <Plus className="h-6 w-6 text-apex-obsidian" />
        </button>
      </Layout>
    </>
  );
}