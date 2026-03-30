import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { TrendingUp, Trophy, Calendar, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
  const topSpecies = [
    { name: "Largemouth Bass", count: 48, avg: "3.8 lbs", success: 85 },
    { name: "White Bass", count: 32, avg: "1.9 lbs", success: 78 },
    { name: "Catfish", count: 18, avg: "5.2 lbs", success: 92 },
  ];

  const topBaits = [
    { name: "Green Pumpkin Jig", catches: 28, species: "Bass" },
    { name: "Chrome Spoon", catches: 22, species: "White Bass" },
    { name: "Live Shad", catches: 16, species: "Catfish" },
  ];

  const insights = [
    {
      title: "Best Time Window",
      description: "Your highest success rate is 6-8 AM (89%)",
      icon: TrendingUp,
      color: "text-bite-strong",
    },
    {
      title: "Top Location",
      description: "Lake Travis - Point 7 (42 catches)",
      icon: Target,
      color: "text-primary",
    },
    {
      title: "Seasonal Peak",
      description: "Spring months show 2.3x better CPUE",
      icon: Calendar,
      color: "text-accent",
    },
  ];

  return (
    <>
      <SEO 
        title="Analytics - FishIQ"
        description="Personal fishing analytics and insights"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">Your fishing performance insights</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="tactical-card p-4 text-center">
              <div className="text-3xl font-heading font-bold text-primary">142</div>
              <div className="text-xs text-muted-foreground mt-1">Total Catches</div>
            </Card>
            <Card className="tactical-card p-4 text-center">
              <div className="text-3xl font-heading font-bold text-accent">28</div>
              <div className="text-xs text-muted-foreground mt-1">Trips</div>
            </Card>
            <Card className="tactical-card p-4 text-center">
              <div className="text-3xl font-heading font-bold text-bite-strong">5.1</div>
              <div className="text-xs text-muted-foreground mt-1">CPUE</div>
            </Card>
            <Card className="tactical-card p-4 text-center">
              <div className="text-3xl font-heading font-bold text-success">84%</div>
              <div className="text-xs text-muted-foreground mt-1">Success Rate</div>
            </Card>
          </div>

          {/* Smart Insights */}
          <Card className="tactical-card p-6 mb-6">
            <h2 className="text-xl font-heading font-semibold mb-4">Smart Insights</h2>
            <div className="space-y-4">
              {insights.map((insight, idx) => {
                const Icon = insight.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${insight.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Top Species Performance */}
          <Card className="tactical-card p-6 mb-6">
            <h2 className="text-xl font-heading font-semibold mb-4">Species Performance</h2>
            <div className="space-y-3">
              {topSpecies.map((species, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading font-semibold">{species.name}</h3>
                      <span className="text-sm text-muted-foreground">{species.count} catches</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Avg: <span className="text-foreground font-medium">{species.avg}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Success: <span className="text-success font-medium">{species.success}%</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Baits */}
          <Card className="tactical-card p-6 mb-6">
            <h2 className="text-xl font-heading font-semibold mb-4">Top Baits & Lures</h2>
            <div className="space-y-3">
              {topBaits.map((bait, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h3 className="font-heading font-semibold">{bait.name}</h3>
                    <p className="text-sm text-muted-foreground">Best for {bait.species}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-heading font-bold text-primary">{bait.catches}</div>
                    <div className="text-xs text-muted-foreground">catches</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Personal Bests */}
          <Card className="tactical-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-heading font-semibold">Personal Bests</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30">
                <div className="text-sm text-muted-foreground mb-1">Largemouth Bass</div>
                <div className="text-2xl font-heading font-bold text-accent">8.4 lbs</div>
                <div className="text-xs text-muted-foreground mt-1">Mar 15, 2026 • Lake Travis</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
                <div className="text-sm text-muted-foreground mb-1">Best Day</div>
                <div className="text-2xl font-heading font-bold text-primary">12 catches</div>
                <div className="text-xs text-muted-foreground mt-1">Mar 22, 2026 • Morning Trip</div>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}