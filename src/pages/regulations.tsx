import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  MapPin, 
  Fish, 
  Calendar, 
  Ruler, 
  Scale, 
  Download,
  Target,
  Lock,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function RegulationsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const currentLocation = {
    water: "Lake Travis",
    county: "Travis County",
    state: "Texas",
    coordinates: "30.3922° N, 97.8832° W",
  };

  const regulations = [
    {
      species: "Largemouth Bass",
      minSize: 14,
      maxSize: null,
      dailyLimit: 5,
      season: "Year-Round",
      status: "open",
      notes: "Only 1 bass over 24 inches may be retained",
      icon: Fish,
    },
    {
      species: "Smallmouth Bass",
      minSize: 14,
      maxSize: null,
      dailyLimit: 5,
      season: "Year-Round",
      status: "open",
      notes: "Included in 5-bass aggregate daily limit",
      icon: Fish,
    },
    {
      species: "White Bass",
      minSize: 10,
      maxSize: null,
      dailyLimit: 25,
      season: "Year-Round",
      status: "open",
      notes: "No slot limit restrictions",
      icon: Fish,
    },
    {
      species: "Striped Bass",
      minSize: 18,
      maxSize: null,
      dailyLimit: 5,
      season: "Year-Round",
      status: "open",
      notes: "Only 1 striped bass over 33 inches may be retained",
      icon: Fish,
    },
    {
      species: "Catfish (Channel/Blue)",
      minSize: 12,
      maxSize: null,
      dailyLimit: 25,
      season: "Year-Round",
      status: "open",
      notes: "Aggregate limit for all catfish species",
      icon: Fish,
    },
  ];

  const protectedSpecies = [
    {
      species: "Guadalupe Bass",
      status: "Protected",
      reason: "State Fish of Texas - Catch & Release Only",
      penalty: "$500-$2000 fine per violation",
    },
  ];

  const specialZones = [
    {
      zone: "Windy Point Park Area",
      restriction: "No-Wake Zone",
      details: "200 yards from shore. Trolling motors only.",
      coordinates: "30.3955° N, 97.8765° W",
    },
    {
      zone: "Dam Safety Zone",
      restriction: "Fishing Prohibited",
      details: "500ft radius from Mansfield Dam structure. Safety regulation.",
      coordinates: "30.3885° N, 97.8811° W",
    },
  ];

  const generalRules = [
    "Valid Texas fishing license required for ages 17+",
    "All fish must be measured with mouth closed, tail fully extended",
    "Fish kept on stringers must be identifiable by species",
    "Tournament organizers must obtain special event permit",
    "Live baitfish must be purchased from licensed dealers",
    "Trotlines, jugs, and bank poles prohibited in no-wake zones",
  ];

  return (
    <>
      <SEO 
        title="Regulation Engine - Apex" 
        description="GPS-based compliance advisor with instant bag limits and plain-language regulations"
      />
      <Layout>
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apex-heading mb-1">Regulation Engine</h1>
              <p className="text-sm text-muted-foreground">
                Compliance Advisor • GPS-Based Rules
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Offline Mode</span>
            </Button>
          </div>

          {/* Current Location Card */}
          <Card className="apex-card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg">{currentLocation.water}</h3>
                  <div className="px-2 py-0.5 rounded-full bg-success/20 border border-success/30 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-success" />
                    <span className="text-xs font-bold text-success">GPS LOCKED</span>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{currentLocation.county}, {currentLocation.state}</p>
                  <p className="apex-data">{currentLocation.coordinates}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Change Location
              </Button>
            </div>
          </Card>

          {/* Search */}
          <div className="relative">
            <Fish className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search species, regulations, zones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 apex-data bg-muted/30 border-border/50"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="limits" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="limits" className="apex-data">
                <Fish className="h-4 w-4 mr-2" />
                Bag Limits
              </TabsTrigger>
              <TabsTrigger value="zones" className="apex-data">
                <Target className="h-4 w-4 mr-2" />
                Special Zones
              </TabsTrigger>
              <TabsTrigger value="general" className="apex-data">
                <AlertTriangle className="h-4 w-4 mr-2" />
                General Rules
              </TabsTrigger>
            </TabsList>

            {/* Bag Limits Tab */}
            <TabsContent value="limits" className="mt-6 space-y-6">
              {/* Protected Species Alert */}
              {protectedSpecies.length > 0 && (
                <Card className="apex-card p-6 border-destructive/30 bg-destructive/5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Protected Species in This Water</h3>
                      <div className="space-y-3">
                        {protectedSpecies.map((species, idx) => (
                          <div key={idx} className="intelligence-panel border-destructive/20">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-bold">{species.species}</p>
                                <p className="text-sm text-muted-foreground mt-1">{species.reason}</p>
                              </div>
                              <div className="px-3 py-1 rounded-full bg-destructive/20 border border-destructive/30">
                                <span className="text-xs font-bold text-destructive">PROTECTED</span>
                              </div>
                            </div>
                            <div className="text-xs text-destructive font-semibold mt-2">
                              ⚠️ {species.penalty}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Species Regulations */}
              <Card className="apex-card p-6">
                <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Species Bag Limits & Size Restrictions
                </h3>
                <div className="space-y-3">
                  {regulations.map((reg, idx) => {
                    const Icon = reg.icon;
                    return (
                      <div key={idx} className="intelligence-panel">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-bold text-lg">{reg.species}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Calendar className="h-3 w-3" />
                                <span>{reg.season}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full border ${
                            reg.status === "open" 
                              ? "bg-success/20 border-success/30" 
                              : "bg-destructive/20 border-destructive/30"
                          }`}>
                            <span className={`text-xs font-bold ${
                              reg.status === "open" ? "text-success" : "text-destructive"
                            }`}>
                              {reg.status === "open" ? "OPEN" : "CLOSED"}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="text-center p-3 rounded-lg bg-muted/30">
                            <Ruler className="h-4 w-4 text-primary mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground mb-1">Min Size</p>
                            <p className="font-bold apex-data">
                              {reg.minSize ? `${reg.minSize}"` : "None"}
                            </p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-muted/30">
                            <Ruler className="h-4 w-4 text-primary mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground mb-1">Max Size</p>
                            <p className="font-bold apex-data">
                              {reg.maxSize ? `${reg.maxSize}"` : "None"}
                            </p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-muted/30">
                            <Scale className="h-4 w-4 text-primary mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground mb-1">Daily Limit</p>
                            <p className="font-bold apex-data">{reg.dailyLimit}</p>
                          </div>
                        </div>

                        {reg.notes && (
                          <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded">
                            <strong>Note:</strong> {reg.notes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Plain Language Summary */}
              <Card className="apex-card p-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-2">Quick Compliance Summary</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Bass:</strong> Keep 5 fish min 14", only 1 over 24"</li>
                      <li>• <strong>White Bass:</strong> Keep 25 fish min 10"</li>
                      <li>• <strong>Catfish:</strong> Keep 25 fish min 12" (all species combined)</li>
                      <li>• <strong>Guadalupe Bass:</strong> Catch & release only - state protected</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Special Zones Tab */}
            <TabsContent value="zones" className="mt-6">
              <Card className="apex-card p-6">
                <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Location-Specific Restrictions
                </h3>
                <div className="space-y-3">
                  {specialZones.map((zone, idx) => (
                    <div key={idx} className="intelligence-panel">
                      <div className="flex items-start gap-3 mb-3">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-lg">{zone.zone}</p>
                            <div className="px-3 py-1 rounded-full bg-warning/20 border border-warning/30">
                              <span className="text-xs font-bold text-warning">RESTRICTED</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{zone.details}</p>
                          <p className="text-xs apex-data text-muted-foreground">{zone.coordinates}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <span className="text-xs font-semibold">{zone.restriction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* General Rules Tab */}
            <TabsContent value="general" className="mt-6">
              <Card className="apex-card p-6">
                <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  General Fishing Regulations
                </h3>
                <div className="space-y-3">
                  {generalRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm">{rule}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full justify-start gap-3 h-auto p-4">
              <Download className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-semibold">Download for Offline</p>
                <p className="text-xs text-muted-foreground">Access regulations without signal</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-auto p-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-semibold">Check Another Location</p>
                <p className="text-xs text-muted-foreground">Pin-drop for future trip planning</p>
              </div>
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}