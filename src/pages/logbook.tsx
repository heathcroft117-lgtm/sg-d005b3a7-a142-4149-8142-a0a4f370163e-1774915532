import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Plus, Filter, Search, Calendar, Fish, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LogbookPage() {
  const recentCatches = [
    {
      id: 1,
      species: "Largemouth Bass",
      weight: "4.2 lbs",
      length: "18.5 in",
      location: "Lake Travis - Point 7",
      date: "Mar 29, 2026",
      time: "7:15 AM",
      bait: "Green pumpkin jig",
      photo: "/placeholder-fish.jpg",
    },
    {
      id: 2,
      species: "White Bass",
      weight: "1.8 lbs",
      length: "14 in",
      location: "Lake Travis - Dam Area",
      date: "Mar 28, 2026",
      time: "6:45 PM",
      bait: "Chrome spoon",
      photo: "/placeholder-fish.jpg",
    },
  ];

  const quickFilters = [
    { label: "Last 7 Days", active: true },
    { label: "Bass", active: false },
    { label: "Lake Travis", active: false },
    { label: "Topwater", active: false },
  ];

  return (
    <>
      <SEO 
        title="Logbook - FishIQ"
        description="Your personal fishing catch logbook and trip history"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-1">Logbook</h1>
              <p className="text-sm text-muted-foreground">142 catches • 28 trips • 12 species</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Log Catch</span>
            </Button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search catches..." 
                className="pl-10 bg-card border-border"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {quickFilters.map((filter, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter.active 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="tactical-card p-4 text-center">
              <div className="text-2xl font-heading font-bold text-primary">18</div>
              <div className="text-xs text-muted-foreground mt-1">This Month</div>
            </Card>
            <Card className="tactical-card p-4 text-center">
              <div className="text-2xl font-heading font-bold text-accent">6.8</div>
              <div className="text-xs text-muted-foreground mt-1">Avg Weight</div>
            </Card>
            <Card className="tactical-card p-4 text-center">
              <div className="text-2xl font-heading font-bold text-bite-strong">85%</div>
              <div className="text-xs text-muted-foreground mt-1">Success</div>
            </Card>
          </div>

          {/* Catch List */}
          <div className="space-y-4">
            {recentCatches.map((catch_entry) => (
              <Card key={catch_entry.id} className="tactical-card p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Fish className="h-8 w-8 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-heading font-semibold text-lg">{catch_entry.species}</h3>
                        <p className="text-sm text-muted-foreground">
                          {catch_entry.weight} • {catch_entry.length}
                        </p>
                      </div>
                      <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                        <div>{catch_entry.date}</div>
                        <div>{catch_entry.time}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{catch_entry.location}</span>
                      </div>
                      <div className="text-muted-foreground">
                        Bait: <span className="text-foreground font-medium">{catch_entry.bait}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-6 text-center">
            <Button variant="outline">Load More Catches</Button>
          </div>
        </div>

        {/* FAB for Quick Add */}
        <button className="action-fab flex items-center justify-center">
          <Plus className="h-6 w-6" />
        </button>
      </Layout>
    </>
  );
}