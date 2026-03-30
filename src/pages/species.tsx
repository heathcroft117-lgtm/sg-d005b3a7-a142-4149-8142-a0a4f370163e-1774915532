import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Search, Fish, Info, Target, Calendar, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SpeciesPage() {
  const speciesCategories = [
    { name: "Bass", count: 8, icon: "🎣" },
    { name: "Trout", count: 12, icon: "🐟" },
    { name: "Catfish", count: 6, icon: "🐡" },
    { name: "Panfish", count: 15, icon: "🐠" },
    { name: "Pike/Muskie", count: 5, icon: "🦈" },
    { name: "Walleye", count: 3, icon: "🎯" },
  ];

  const featuredSpecies = [
    {
      name: "Largemouth Bass",
      scientific: "Micropterus salmoides",
      status: "Open Season",
      minSize: "14 inches",
      bagLimit: "5 per day",
      bestTimes: ["Early Morning", "Evening", "Overcast"],
      topBaits: ["Soft Plastic", "Crankbait", "Topwater"],
      image: "/species/largemouth.jpg",
    },
    {
      name: "Rainbow Trout",
      scientific: "Oncorhynchus mykiss",
      status: "Open Season",
      minSize: "None",
      bagLimit: "5 per day",
      bestTimes: ["Morning", "Evening", "Cool Weather"],
      topBaits: ["PowerBait", "Spinners", "Flies"],
      image: "/species/rainbow.jpg",
    },
    {
      name: "White Bass",
      scientific: "Morone chrysops",
      status: "Open Year-Round",
      minSize: "10 inches",
      bagLimit: "25 per day",
      bestTimes: ["Spring Run", "Early Summer", "Morning"],
      topBaits: ["Chrome Spoon", "Jigs", "Live Shad"],
      image: "/species/whitebass.jpg",
    },
  ];

  return (
    <>
      <SEO 
        title="Species Database - FishIQ"
        description="Complete fishing species database with regulations and techniques"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold mb-2">Species Database</h1>
            <p className="text-muted-foreground">Complete species guide with local regulations</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search species by name or type..." 
              className="pl-10 bg-card border-border h-12"
            />
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {speciesCategories.map((category, idx) => (
              <button
                key={idx}
                className="tactical-card p-4 text-center hover:border-primary/50 transition-all active:scale-95"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-heading font-semibold text-sm">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.count} species</div>
              </button>
            ))}
          </div>

          {/* Featured Species */}
          <div className="mb-4">
            <h2 className="text-xl font-heading font-semibold mb-4">Featured Species</h2>
          </div>

          <div className="space-y-4">
            {featuredSpecies.map((species, idx) => (
              <Card key={idx} className="tactical-card p-0 overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex flex-col md:flex-row">
                  <div className="h-40 md:h-auto md:w-40 bg-gradient-to-br from-water-shallow to-water-deep flex items-center justify-center flex-shrink-0">
                    <Fish className="h-16 w-16 text-primary/50" />
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-heading font-bold mb-1">{species.name}</h3>
                        <p className="text-sm text-muted-foreground italic">{species.scientific}</p>
                      </div>
                      <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                        {species.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Ruler className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Min:</span>
                        <span className="font-medium">{species.minSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Limit:</span>
                        <span className="font-medium">{species.bagLimit}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Best Times:</p>
                        <div className="flex flex-wrap gap-1">
                          {species.bestTimes.map((time, i) => (
                            <span key={i} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Top Baits:</p>
                        <div className="flex flex-wrap gap-1">
                          {species.topBaits.map((bait, i) => (
                            <span key={i} className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                              {bait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Tips */}
          <Card className="tactical-card p-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold mb-1">Species ID Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Tap any species card for detailed identification guides, habitat info, seasonal patterns, and local regulations.
                  Upload photos to get AI-assisted species identification.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}