import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { MapPin, AlertCircle, Download, Shield, Calendar, Fish } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RegulationsPage() {
  const currentLocation = {
    waterbody: "Lake Travis",
    county: "Travis County",
    state: "Texas",
  };

  const activeRegulations = [
    {
      species: "Largemouth Bass",
      minSize: "14 inches",
      bagLimit: "5 per day",
      season: "Open Year-Round",
      notes: "Only one bass over 16 inches may be retained",
      status: "active",
    },
    {
      species: "White Bass",
      minSize: "10 inches",
      bagLimit: "25 per day",
      season: "Open Year-Round",
      notes: "Combination limit applies with hybrid striped bass",
      status: "active",
    },
    {
      species: "Channel Catfish",
      minSize: "12 inches",
      bagLimit: "25 per day",
      season: "Open Year-Round",
      notes: "No special restrictions",
      status: "active",
    },
  ];

  const specialZones = [
    {
      name: "Dam Safety Zone",
      description: "No fishing within 200 feet of dam structure",
      type: "Restricted",
    },
    {
      name: "Marina Slow-Wake Zones",
      description: "Reduced speed limits apply near all marinas",
      type: "Restricted",
    },
    {
      name: "Public Access Areas",
      description: "Free shore fishing available at designated parks",
      type: "Access",
    },
  ];

  const upcomingChanges = [
    {
      date: "Apr 1, 2026",
      change: "Trout stocking program begins",
      impact: "New daily limits apply for stocked species",
    },
    {
      date: "Sep 1, 2026",
      change: "Bass slot limit adjustment",
      impact: "Protective slot changes to 14-18 inches",
    },
  ];

  return (
    <>
      <SEO 
        title="Regulations - FishIQ"
        description="Local fishing regulations and licensing information"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">Regulations</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{currentLocation.waterbody}, {currentLocation.state}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
          </div>

          {/* License Status Banner */}
          <Card className="tactical-card p-4 mb-6 border-success/30 bg-success/10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold mb-1">License Valid</h3>
                <p className="text-sm text-muted-foreground mb-2">Texas Resident Annual License • Expires Aug 31, 2026</p>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  View Digital License
                </Button>
              </div>
            </div>
          </Card>

          {/* Active Regulations */}
          <div className="mb-6">
            <h2 className="text-xl font-heading font-semibold mb-4">Current Regulations</h2>
            <div className="space-y-3">
              {activeRegulations.map((reg, idx) => (
                <Card key={idx} className="tactical-card p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{reg.species}</h3>
                      <p className="text-sm text-muted-foreground">{reg.season}</p>
                    </div>
                    <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                      Open
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Minimum Size</p>
                      <p className="font-semibold text-primary">{reg.minSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Daily Bag Limit</p>
                      <p className="font-semibold text-primary">{reg.bagLimit}</p>
                    </div>
                  </div>

                  {reg.notes && (
                    <div className="flex items-start gap-2 p-2 rounded bg-muted/30">
                      <AlertCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-foreground">{reg.notes}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Special Zones */}
          <div className="mb-6">
            <h2 className="text-xl font-heading font-semibold mb-4">Special Zones</h2>
            <div className="space-y-3">
              {specialZones.map((zone, idx) => (
                <Card key={idx} className="tactical-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-heading font-semibold">{zone.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={zone.type === "Restricted" ? "bg-warning/20 text-warning border-warning/30" : "bg-primary/20 text-primary border-primary/30"}
                        >
                          {zone.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{zone.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Changes */}
          <Card className="tactical-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-heading font-semibold">Upcoming Changes</h2>
            </div>
            <div className="space-y-3">
              {upcomingChanges.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30">
                  <div className="text-center flex-shrink-0">
                    <div className="text-xs text-muted-foreground">{item.date.split(' ')[0]}</div>
                    <div className="font-semibold text-lg">{item.date.split(' ')[1].split(',')[0]}</div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-heading font-semibold mb-1">{item.change}</h3>
                    <p className="text-sm text-muted-foreground">{item.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Offline Access Notice */}
          <Card className="tactical-card p-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Fish className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold mb-1">Offline Access</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Download regulations for offline use on the water. Always verify current rules before fishing.
                </p>
                <Button size="sm" variant="outline">
                  Download for Offline
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}