import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Fish, 
  Search, 
  TrendingUp, 
  Calendar, 
  Droplets, 
  Target,
  Ruler,
  Scale,
  Trophy,
  MapPin
} from "lucide-react";

export default function SpeciesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const species = [
    {
      name: "Largemouth Bass",
      scientific: "Micropterus salmoides",
      category: "Bass",
      avgWeight: "3-5 lbs",
      record: "18.18 lbs",
      season: "Best: Spring & Fall",
      habitat: "Shallow vegetation, docks, structure",
      baits: ["Green Pumpkin Jig", "Texas Rig", "Crankbait", "Spinnerbait"],
      techniques: ["Flipping", "Pitching", "Casting", "Cranking"],
      personalStats: { catches: 45, avgSize: 4.2, bestSize: 8.5 },
      waterTemp: "60-75°F",
      clarity: "Stained to clear",
      difficulty: "moderate",
      icon: Fish,
    },
    {
      name: "Smallmouth Bass",
      scientific: "Micropterus dolomieu",
      category: "Bass",
      avgWeight: "2-3 lbs",
      record: "11.15 lbs",
      season: "Best: Spring & Fall",
      habitat: "Rocky points, ledges, deep structure",
      baits: ["Ned Rig", "Drop Shot", "Jerkbait", "Tube"],
      techniques: ["Finesse", "Drop Shot", "Vertical", "Casting"],
      personalStats: { catches: 32, avgSize: 3.1, bestSize: 5.2 },
      waterTemp: "55-70°F",
      clarity: "Clear to slightly stained",
      difficulty: "moderate",
      icon: Fish,
    },
    {
      name: "White Bass",
      scientific: "Morone chrysops",
      category: "Temperate Bass",
      avgWeight: "1-2 lbs",
      record: "5.56 lbs",
      season: "Best: Spring run (March-May)",
      habitat: "Open water, schools, creek channels",
      baits: ["Slab", "White Crankbait", "Jig", "Live Shad"],
      techniques: ["Casting to schools", "Trolling", "Vertical"],
      personalStats: { catches: 28, avgSize: 1.8, bestSize: 2.9 },
      waterTemp: "58-68°F",
      clarity: "Stained to murky",
      difficulty: "easy",
      icon: Fish,
    },
    {
      name: "Striped Bass",
      scientific: "Morone saxatilis",
      category: "Temperate Bass",
      avgWeight: "5-15 lbs",
      record: "67.5 lbs",
      season: "Year-round, best in cooler months",
      habitat: "Deep open water, main lake points",
      baits: ["Live Shad", "Slab", "Alabama Rig", "Large Crankbait"],
      techniques: ["Trolling", "Live bait", "Casting to breaking fish"],
      personalStats: { catches: 8, avgSize: 12.4, bestSize: 22.0 },
      waterTemp: "50-70°F",
      clarity: "Open water, depth varies",
      difficulty: "advanced",
      icon: Fish,
    },
  ];

  const filteredSpecies = searchQuery
    ? species.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : species;

  return (
    <>
      <SEO 
        title="Species Database - Apex" 
        description="Comprehensive species identification with habitat intelligence and bait recommendations"
      />
      <Layout>
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold apex-heading mb-1">Species Database</h1>
            <p className="text-sm text-muted-foreground">
              Regional Species Guide • Habitat Intelligence • Technique Library
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search species, habitat, techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 apex-data bg-muted/30 border-border/50"
            />
          </div>

          {/* Species Grid */}
          <div className="space-y-4">
            {filteredSpecies.map((sp, idx) => {
              const Icon = sp.icon;
              return (
                <Card key={idx} className="apex-card p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-xl mb-1">{sp.name}</h3>
                          <p className="text-xs text-muted-foreground italic">{sp.scientific}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full border ${
                          sp.difficulty === "easy" 
                            ? "bg-success/20 border-success/30 text-success" 
                            : sp.difficulty === "moderate"
                            ? "bg-warning/20 border-warning/30 text-warning"
                            : "bg-destructive/20 border-destructive/30 text-destructive"
                        }`}>
                          <span className="text-xs font-bold uppercase">{sp.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{sp.category}</span>
                        <span>•</span>
                        <span>Avg: {sp.avgWeight}</span>
                        <span>•</span>
                        <span>Record: {sp.record}</span>
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="info" className="apex-data text-xs">Info</TabsTrigger>
                      <TabsTrigger value="tactics" className="apex-data text-xs">Tactics</TabsTrigger>
                      <TabsTrigger value="personal" className="apex-data text-xs">Your Data</TabsTrigger>
                    </TabsList>

                    <TabsContent value="info" className="mt-4 space-y-3">
                      <div className="intelligence-panel">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Best Season</p>
                        </div>
                        <p className="text-sm font-semibold">{sp.season}</p>
                      </div>

                      <div className="intelligence-panel">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Habitat</p>
                        </div>
                        <p className="text-sm">{sp.habitat}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="intelligence-panel">
                          <div className="flex items-center gap-2 mb-2">
                            <Droplets className="h-4 w-4 text-primary" />
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Water Temp</p>
                          </div>
                          <p className="text-sm font-bold apex-data">{sp.waterTemp}</p>
                        </div>
                        <div className="intelligence-panel">
                          <div className="flex items-center gap-2 mb-2">
                            <Droplets className="h-4 w-4 text-primary" />
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Clarity</p>
                          </div>
                          <p className="text-sm font-semibold">{sp.clarity}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="tactics" className="mt-4 space-y-3">
                      <div className="intelligence-panel">
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="h-4 w-4 text-primary" />
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Top Baits</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sp.baits.map((bait, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 rounded-full bg-muted/50 text-xs font-semibold"
                            >
                              {bait}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="intelligence-panel">
                        <div className="flex items-center gap-2 mb-3">
                          <Fish className="h-4 w-4 text-primary" />
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Techniques</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sp.techniques.map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="personal" className="mt-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="intelligence-panel text-center">
                          <Fish className="h-5 w-5 text-primary mx-auto mb-2" />
                          <p className="text-2xl font-bold apex-data mb-1">{sp.personalStats.catches}</p>
                          <p className="text-xs text-muted-foreground">Total Catches</p>
                        </div>
                        <div className="intelligence-panel text-center">
                          <Scale className="h-5 w-5 text-primary mx-auto mb-2" />
                          <p className="text-2xl font-bold apex-data mb-1">{sp.personalStats.avgSize}</p>
                          <p className="text-xs text-muted-foreground">Avg Size (lbs)</p>
                        </div>
                        <div className="intelligence-panel text-center">
                          <Trophy className="h-5 w-5 text-warning mx-auto mb-2" />
                          <p className="text-2xl font-bold apex-data mb-1">{sp.personalStats.bestSize}</p>
                          <p className="text-xs text-muted-foreground">Personal Best</p>
                        </div>
                      </div>

                      <div className="mt-4 ai-insight text-sm">
                        <p className="font-semibold mb-1">🎯 Pattern Intelligence</p>
                        <p className="text-muted-foreground">
                          Your {sp.name} success peaks in {sp.season.toLowerCase()}. 
                          Top producing bait: {sp.baits[0]}. 
                          Continue targeting {sp.habitat.toLowerCase()} during optimal conditions.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              );
            })}
          </div>

          {filteredSpecies.length === 0 && (
            <Card className="apex-card p-12 text-center">
              <Fish className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold mb-2">No species found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search terms
              </p>
            </Card>
          )}
        </div>
      </Layout>
    </>
  );
}