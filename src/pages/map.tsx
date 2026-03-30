import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Layers, MapPin, Bookmark, Search, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MapPage() {
  const savedSpots = [
    { name: "Point 7 - Brush Pile", lat: "30.3922", lon: "-97.9183", catches: 12 },
    { name: "Dam Area - Drop Off", lat: "30.3850", lon: "-97.9100", catches: 8 },
    { name: "Cove 4 - Grass Line", lat: "30.3980", lon: "-97.9220", catches: 15 },
  ];

  const mapLayers = [
    { name: "Satellite", active: true },
    { name: "Bathymetry", active: true },
    { name: "Public Access", active: false },
    { name: "My Catches", active: true },
    { name: "Regulations", active: false },
  ];

  return (
    <>
      <SEO 
        title="Map - FishIQ"
        description="Interactive fishing map with waypoints and structure"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-1">Fishing Map</h1>
              <p className="text-sm text-muted-foreground">Lake Travis, TX</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Navigation className="h-4 w-4" />
              <span className="hidden sm:inline">Center GPS</span>
            </Button>
          </div>

          {/* Map Container (Placeholder) */}
          <Card className="tactical-card p-0 mb-6 overflow-hidden">
            <div className="relative aspect-[16/10] bg-gradient-to-br from-water-deep to-water-shallow flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary/50 mx-auto mb-4" />
                <p className="text-lg font-heading font-semibold text-foreground/90">Interactive Map</p>
                <p className="text-sm text-foreground/60 mt-1">Satellite imagery + bathymetry layers</p>
              </div>

              {/* Map Controls Overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="icon" variant="secondary" className="bg-card/95 backdrop-blur">
                  <Layers className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="bg-card/95 backdrop-blur">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Layer Toggle Pills */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                {mapLayers.map((layer, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      layer.active
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-card/95 backdrop-blur text-muted-foreground hover:bg-card"
                    }`}
                  >
                    {layer.name}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Saved Waypoints */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-semibold">My Waypoints</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="h-3 w-3" />
                Save Location
              </Button>
            </div>

            <div className="grid gap-3">
              {savedSpots.map((spot, idx) => (
                <Card key={idx} className="tactical-card p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold mb-1">{spot.name}</h3>
                        <p className="text-xs text-muted-foreground font-mono">
                          {spot.lat}, {spot.lon}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-heading font-bold text-primary">{spot.catches}</div>
                      <div className="text-xs text-muted-foreground">catches</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Map Legend */}
          <Card className="tactical-card p-4">
            <h3 className="text-sm font-heading font-semibold mb-3">Map Legend</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">My Waypoints</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-muted-foreground">Recent Catches</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-muted-foreground">Public Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-muted-foreground">Restricted</span>
              </div>
            </div>
          </Card>
        </div>

        {/* FAB for Quick Waypoint */}
        <button className="action-fab flex items-center justify-center">
          <MapPin className="h-6 w-6" />
        </button>
      </Layout>
    </>
  );
}