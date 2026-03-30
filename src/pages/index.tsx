import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { BiteScoreCard } from "@/components/dashboard/BiteScoreCard";
import { SolunarCard } from "@/components/dashboard/SolunarCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { Fish, TrendingUp, Clock, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  const userName = "Captain";
  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? "Morning" : currentHour < 18 ? "Afternoon" : "Evening";

  const biteScoreData = {
    score: 8.2,
    trend: "rising" as const,
    conditions: {
      pressure: "29.95 mb ↑",
      waterTemp: "68°F",
      windSpeed: "5-8 mph NE",
    },
  };

  const solunarData = {
    moonPhase: "Waxing Gibbous (82%)",
    nextPeakCountdown: "in 2h 14m",
    periods: [
      { type: "major" as const, start: "06:15", end: "07:45", active: false },
      { type: "minor" as const, start: "12:30", end: "13:15", active: false },
      { type: "major" as const, start: "18:45", end: "20:15", active: true },
      { type: "minor" as const, start: "00:45", end: "01:30", active: false },
    ],
  };

  const recentCatches = [
    {
      id: 1,
      species: "Largemouth Bass",
      weight: "4.8 lbs",
      location: "Lake Travis - North Shore",
      time: "2 hours ago",
      image: "🐟",
    },
    {
      id: 2,
      species: "White Bass",
      weight: "2.1 lbs",
      location: "Lake Travis - Main Lake",
      time: "5 hours ago",
      image: "🐟",
    },
  ];

  const activeAlerts = [
    {
      id: 1,
      type: "peak",
      message: "Major solunar period active - Prime feeding window",
      icon: TrendingUp,
      color: "text-bite-peak",
    },
  ];

  return (
    <>
      <SEO 
        title="Apex | Intelligent Fishing Co-Pilot"
        description="Precision fishing intelligence powered by real-time data and AI insights"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-24">
          {/* Contextual Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold apex-heading mb-2">
              {timeGreeting}, {userName}
            </h1>
            <p className="text-muted-foreground">
              Pressure is <span className="text-success font-semibold">rising</span>, Largemouth activity is <span className="text-primary font-semibold">peaking</span> at Lake Travis North Shore
            </p>
          </div>

          {/* Active Alerts */}
          {activeAlerts.length > 0 && (
            <div className="mb-6 space-y-3">
              {activeAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div 
                    key={alert.id}
                    className="p-4 rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-l-4 border-primary glow-green"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${alert.color}`} />
                      <p className="font-semibold">{alert.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <BiteScoreCard {...biteScoreData} />
            <SolunarCard {...solunarData} />
          </div>

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <QuickActionsCard />

            {/* Current Conditions */}
            <Card className="apex-card p-6">
              <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Current Conditions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Lake Travis</p>
                      <p className="text-xs text-muted-foreground">2.4 miles away</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    View
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="intelligence-panel text-center">
                    <p className="text-xs text-muted-foreground mb-1">Air Temp</p>
                    <p className="text-xl font-bold apex-data">72°F</p>
                  </div>
                  <div className="intelligence-panel text-center">
                    <p className="text-xs text-muted-foreground mb-1">Cloud Cover</p>
                    <p className="text-xl font-bold apex-data">35%</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Catches */}
          <Card className="apex-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground">
                Recent Catches
              </h3>
              <Link href="/logbook" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                View All
              </Link>
            </div>

            {recentCatches.length > 0 ? (
              <div className="space-y-3">
                {recentCatches.map((catch_) => (
                  <Link
                    key={catch_.id}
                    href={`/logbook/${catch_.id}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                      {catch_.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{catch_.species}</h4>
                      <p className="text-sm text-muted-foreground">{catch_.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold apex-data text-primary">{catch_.weight}</p>
                      <p className="text-xs text-muted-foreground">{catch_.time}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Fish className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No catches logged yet</p>
                <Button className="gap-2">
                  <Camera className="h-4 w-4" />
                  Log Your First Catch
                </Button>
              </div>
            )}
          </Card>

          {/* Floating Action Button */}
          <button
            className="fixed bottom-20 md:bottom-8 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl glow-green-strong flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-30"
            aria-label="Quick log catch"
          >
            <Camera className="h-6 w-6 text-apex-obsidian" />
          </button>
        </div>
      </Layout>
    </>
  );
}