import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { BiteScoreCard } from "@/components/dashboard/BiteScoreCard";
import { SolunarCard } from "@/components/dashboard/SolunarCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { Droplets, Wind, Gauge } from "lucide-react";

export default function HomePage() {
  const mockSolunarPeriods = [
    { type: "major" as const, start: "6:15 AM", end: "8:15 AM", active: true },
    { type: "minor" as const, start: "12:30 PM", end: "1:30 PM", active: false },
    { type: "major" as const, start: "6:45 PM", end: "8:45 PM", active: false },
  ];
  
  return (
    <>
      <SEO 
        title="FishIQ - Elite Fishing Intelligence Platform"
        description="Premium fishing forecast, logbook, and analytics platform for serious anglers"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Good morning, Angler
            </h1>
            <p className="text-muted-foreground">
              Saturday, March 30, 2026 • Lake Travis, TX
            </p>
          </div>
          
          {/* Current Conditions Banner */}
          <div className="tactical-card p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/20">
                  <Droplets className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Water Temp</p>
                  <p className="text-xs text-muted-foreground">68°F</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-accent/20">
                  <Wind className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Wind</p>
                  <p className="text-xs text-muted-foreground">5 mph NE</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-success/20">
                  <Gauge className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">Pressure</p>
                  <p className="text-xs text-muted-foreground">30.12 inHg ↑</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bite Score - Spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <BiteScoreCard 
                score={82} 
                trend="up" 
                period="Next 3 hours"
              />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActionsCard />
            </div>
            
            {/* Solunar - Full width */}
            <div className="lg:col-span-3">
              <SolunarCard 
                periods={mockSolunarPeriods}
                moonPhase="Waxing Crescent"
                moonIllumination={32}
              />
            </div>
          </div>
          
          {/* Recent Activity Preview */}
          <div className="mt-6 tactical-card p-6">
            <h3 className="text-lg font-heading font-semibold mb-4">Recent Catches</h3>
            <div className="text-center py-8 text-muted-foreground">
              <p>No catches logged yet. Start your first trip!</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}