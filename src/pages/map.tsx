import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapLayerControls } from "@/components/MapLayerControls";
import { Map, MapPin, Search, Layers, Navigation, Target, Crosshair, Lock, Zap, Fish } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MapPage() {
  const [layers, setLayers] = useState({
    satellite: true,
    bathymetry: true,
    catches: true,
    waypoints: false,
    access: true,
    regulations: false,
  });

  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);

  const structures = [
    { id: "1", type: "Drop-Off", depth: "15-25ft", location: "North Shore", confidence: 94 },
    { id: "2", type: "Weed Line", depth: "8-12ft", location: "East Bay", confidence: 88 },
    { id: "3", type: "Hump", depth: "18-22ft", location: "Main Lake", confidence: 91 },
    { id: "4", type: "Creek Channel", depth: "12-18ft", location: "South Arm", confidence: 85 },
  ];

  const waypoints = [
    { id: "1", name: "Secret Point", lat: 30.3922, lon: -97.8832, catches: 12, encrypted: true },
    { id: "2", name: "Rocky Ledge", lat: 30.3855, lon: -97.8795, catches: 8, encrypted: true },
    { id: "3", name: "Timber Patch", lat: 30.3978, lon: -97.8901, catches: 15, encrypted: true },
  ];

  const accessPoints = [
    { id: "1", name: "Travis Launch Ramp", type: "Boat Ramp", parking: "Available", status: "Open" },
    { id: "2", name: "Mansfield Dam Park", type: "Shore Access", parking: "Limited", status: "Open" },
    { id: "3", name: "Pace Bend Marina", type: "Marina", parking: "Paid", status: "Open" },
  ];

  const handleLayerToggle = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <>
      <SEO 
        title="Fishing Atlas - Apex" 
        description="Elite mapping with AI structure detection, encrypted waypoints, and tactical intelligence overlays"
      />
      <Layout>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apex-heading mb-1">Fishing Atlas</h1>
              <p className="text-sm text-muted-foreground apex-data">
                Lake Travis • 30.3922° N, 97.8832° W
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Crosshair className="h-4 w-4" />
              <span className="hidden sm:inline">Center GPS</span>
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search waters, coordinates, waypoints..."
              className="pl-10 apex-data bg-muted/30 border-border/50"
            />
          </div>

          {/* Map Container */}
          <Card className="apex-card aspect-video bg-gradient-to-br from-apex-obsidian to-muted relative overflow-hidden">
            <div className="absolute inset-0 tactical-grid opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto animate-pulse-glow">
                  <Map className="h-16 w-16 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold mb-2">Elite Mapping System</p>
                  <p className="text-sm text-muted-foreground">
                    Satellite imagery, bathymetry, and AI structure detection
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Layer Controls */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* AI Structure Detection */}
              <Card className="apex-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="apex-heading text-sm font-bold uppercase tracking-wider">
                    AI Structure Detection
                  </h3>
                  <div className="flex items-center gap-2 ml-auto px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                    <Zap className="h-3 w-3 text-primary animate-pulse" />
                    <span className="text-xs font-bold apex-data text-primary">ACTIVE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {structures.map((structure) => (
                    <button
                      key={structure.id}
                      onClick={() => setSelectedStructure(structure.id)}
                      className={`intelligence-panel text-left transition-all ${
                        selectedStructure === structure.id
                          ? "border-primary/50 bg-primary/10"
                          : "hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-sm mb-1">{structure.type}</p>
                          <p className="text-xs text-muted-foreground">{structure.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                          <div className="text-sm font-bold apex-data text-primary">{structure.confidence}%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Depth:</span>
                        <span className="font-bold apex-data">{structure.depth}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 ai-insight text-sm">
                  <p className="font-semibold mb-1">🎯 Tactical Insight</p>
                  <p className="text-muted-foreground">
                    Machine learning has identified 4 high-probability structures. Drop-offs show 94% confidence with recent pressure changes favoring deep-to-shallow transitions.
                  </p>
                </div>
              </Card>

              {/* Private Waypoints */}
              <Card className="apex-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="apex-heading text-sm font-bold uppercase tracking-wider">
                    Private Waypoints
                  </h3>
                  <Lock className="h-4 w-4 text-primary ml-auto" />
                </div>

                <div className="space-y-3">
                  {waypoints.map((waypoint) => (
                    <div key={waypoint.id} className="intelligence-panel">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-bold text-sm">{waypoint.name}</p>
                            <p className="text-xs text-muted-foreground apex-data">
                              {waypoint.lat.toFixed(4)}° N, {Math.abs(waypoint.lon).toFixed(4)}° W
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Fish className="h-3 w-3 text-success" />
                            <span className="text-sm font-bold apex-data text-success">{waypoint.catches}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">catches</div>
                        </div>
                      </div>
                      {waypoint.encrypted && (
                        <div className="flex items-center gap-2 text-xs text-primary mt-2">
                          <Lock className="h-3 w-3" />
                          <span className="font-semibold">End-to-End Encrypted</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Access Points */}
              <Card className="apex-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Navigation className="h-5 w-5 text-primary" />
                  <h3 className="apex-heading text-sm font-bold uppercase tracking-wider">
                    Access Points
                  </h3>
                </div>

                <div className="space-y-3">
                  {accessPoints.map((point) => (
                    <div key={point.id} className="intelligence-panel">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-sm mb-1">{point.name}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{point.type}</span>
                            <span>•</span>
                            <span>Parking: {point.parking}</span>
                          </div>
                        </div>
                        <div className="verification-badge bg-success/20 text-success border border-success/30">
                          {point.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div>
              <MapLayerControls layers={layers} onLayerToggle={handleLayerToggle} />
            </div>
          </div>
        </div>

        {/* FAB - Add Waypoint */}
        <button
          className="fixed bottom-20 md:bottom-8 right-4 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl glow-green transition-all active:scale-95 flex items-center justify-center z-40"
        >
          <MapPin className="h-6 w-6 text-apex-obsidian" />
        </button>
      </Layout>
    </>
  );
}