import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuickCatchLogger } from "@/components/QuickCatchLogger";
import { Search, Filter, Plus, Fish, MapPin, Calendar, Ruler, Weight, Camera, TrendingUp } from "lucide-react";

export default function LogbookPage() {
  const [showLogger, setShowLogger] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filterChips = ["All Species", "Bass", "Crappie", "Catfish", "This Month", "PB Only"];
  const recentSpecies = ["Largemouth Bass", "Smallmouth Bass", "White Bass", "Crappie"];
  const recentBaits = ["Green Pumpkin Jig", "White Crankbait", "Ned Rig", "Drop Shot"];

  const catches = [
    {
      id: 1,
      species: "Largemouth Bass",
      weight: 5.2,
      length: 21,
      location: "Lake Travis - North Shore",
      date: "2026-03-28",
      time: "7:45 AM",
      bait: "Green Pumpkin Jig",
      photo: true,
      pb: true,
      conditions: { temp: 68, pressure: "29.95mb", wind: "5mph NE" },
    },
    {
      id: 2,
      species: "Smallmouth Bass",
      weight: 3.8,
      length: 18,
      location: "Lake Travis - Rocky Point",
      date: "2026-03-27",
      time: "6:30 PM",
      bait: "Ned Rig",
      photo: true,
      pb: false,
      conditions: { temp: 66, pressure: "30.02mb", wind: "3mph E" },
    },
    {
      id: 3,
      species: "White Bass",
      weight: 2.1,
      length: 14,
      location: "Lake Travis - Dam",
      date: "2026-03-26",
      time: "2:15 PM",
      bait: "White Crankbait",
      photo: false,
      pb: false,
      conditions: { temp: 70, pressure: "29.88mb", wind: "8mph S" },
    },
  ];

  const stats = {
    totalCatches: 127,
    species: 12,
    avgWeight: 3.8,
    personalBests: 5,
    thisMonth: 18,
  };

  return (
    <>
      <SEO 
        title="Logbook - Apex" 
        description="Smart catch logging with AI species detection, voice input, and intelligent pattern analysis"
      />
      <Layout>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apex-heading mb-1">Catch Logbook</h1>
              <p className="text-sm text-muted-foreground apex-data">
                {stats.totalCatches} Total • {stats.thisMonth} This Month
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="intelligence-panel text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</p>
              <p className="text-3xl font-bold apex-data">{stats.totalCatches}</p>
            </div>
            <div className="intelligence-panel text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Species</p>
              <p className="text-3xl font-bold apex-data text-primary">{stats.species}</p>
            </div>
            <div className="intelligence-panel text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Avg Weight</p>
              <p className="text-3xl font-bold apex-data">{stats.avgWeight}</p>
            </div>
            <div className="intelligence-panel text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">PBs</p>
              <p className="text-3xl font-bold apex-data text-bite-peak">{stats.personalBests}</p>
            </div>
            <div className="intelligence-panel text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">This Month</p>
              <p className="text-3xl font-bold apex-data text-accent">{stats.thisMonth}</p>
            </div>
          </div>

          {/* Quick Access */}
          <Card className="apex-card p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Recently Used Species</p>
                <div className="flex flex-wrap gap-2">
                  {recentSpecies.slice(0, 3).map((species) => (
                    <button
                      key={species}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors apex-data font-semibold"
                    >
                      {species.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Top Baits</p>
                <div className="flex flex-wrap gap-2">
                  {recentBaits.slice(0, 3).map((bait) => (
                    <button
                      key={bait}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors apex-data font-semibold"
                    >
                      {bait.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search species, location, bait..."
                className="pl-10 apex-data"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {filterChips.map((chip) => (
              <button
                key={chip}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-muted/30 hover:bg-primary/20 hover:text-primary transition-colors apex-data"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Catches List */}
          <div className="space-y-4">
            {catches.map((catch_) => (
              <Card key={catch_.id} className="apex-card-hover p-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-apex-obsidian to-muted flex items-center justify-center">
                    {catch_.photo ? (
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    ) : (
                      <Fish className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{catch_.species}</h3>
                          {catch_.pb && (
                            <span className="verification-badge bg-bite-peak/20 text-bite-peak border border-bite-peak/30">
                              <TrendingUp className="h-3 w-3" />
                              PB
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Weight className="h-3 w-3" />
                            <span className="apex-data font-semibold">{catch_.weight} lbs</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Ruler className="h-3 w-3" />
                            <span className="apex-data font-semibold">{catch_.length}"</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground apex-data">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>{catch_.date}</span>
                        </div>
                        <div>{catch_.time}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">{catch_.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Fish className="h-4 w-4" />
                        <span>{catch_.bait}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs apex-data">
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Temp:</span>
                          <span className="font-semibold">{catch_.conditions.temp}°F</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Press:</span>
                          <span className="font-semibold">{catch_.conditions.pressure}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Wind:</span>
                          <span className="font-semibold">{catch_.conditions.wind}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAB */}
        <button
          onClick={() => setShowLogger(true)}
          className="fixed bottom-20 md:bottom-8 right-4 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl glow-green transition-all active:scale-95 flex items-center justify-center z-40"
        >
          <Plus className="h-6 w-6 text-apex-obsidian" />
        </button>

        {showLogger && <QuickCatchLogger onClose={() => setShowLogger(false)} />}
      </Layout>
    </>
  );
}