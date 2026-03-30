import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/StatCard";
import { TrendingUp, Fish, Target, Calendar, Zap, Droplets, Wind, Moon, Brain, Award } from "lucide-react";

export default function AnalyticsPage() {
  const stats = {
    totalCatches: 127,
    species: 12,
    avgWeight: 3.8,
    cpue: 2.4,
    topBait: "Green Pumpkin Jig",
    bestConditions: "Rising Pressure",
  };

  const speciesBreakdown = [
    { species: "Largemouth Bass", catches: 45, successRate: 72, avgWeight: 4.2 },
    { species: "Smallmouth Bass", catches: 32, successRate: 68, avgWeight: 3.1 },
    { species: "White Bass", catches: 28, successRate: 85, avgWeight: 1.8 },
    { species: "Crappie", catches: 22, successRate: 78, avgWeight: 1.2 },
  ];

  const baitEfficacy = [
    { bait: "Green Pumpkin Jig", catches: 38, waters: ["Travis", "Georgetown"], clarity: "Stained", successRate: 76 },
    { bait: "White Crankbait", catches: 25, waters: ["Travis"], clarity: "Clear", successRate: 71 },
    { bait: "Ned Rig", catches: 22, waters: ["Georgetown", "Austin"], clarity: "Stained", successRate: 68 },
    { bait: "Drop Shot", catches: 18, waters: ["Travis"], clarity: "Clear", successRate: 65 },
  ];

  const timePatterns = [
    { window: "Dawn (5-7 AM)", catches: 42, avgBiteScore: 8.2, bestSpecies: "Largemouth" },
    { window: "Morning (7-10 AM)", catches: 35, avgBiteScore: 7.5, bestSpecies: "Smallmouth" },
    { window: "Midday (10 AM-2 PM)", catches: 18, avgBiteScore: 5.8, bestSpecies: "White Bass" },
    { window: "Evening (5-8 PM)", catches: 32, avgBiteScore: 7.9, bestSpecies: "Largemouth" },
  ];

  const insights = [
    {
      title: "Your Dominant Pattern",
      insight: "85% of your trophy catches occur during rising barometric pressure with water temps between 65-72°F. Target these conditions aggressively.",
      icon: Brain,
      color: "text-primary",
    },
    {
      title: "Bait Intelligence",
      insight: "Green Pumpkin Jig outperforms all other presentations in stained water by 23%. Stock this color heavily for Lake Travis.",
      icon: Target,
      color: "text-success",
    },
    {
      title: "Time Window Optimization",
      insight: "Your CPUE during dawn hours is 2.3x higher than midday. Prioritize early morning trips for maximum efficiency.",
      icon: Zap,
      color: "text-warning",
    },
  ];

  return (
    <>
      <SEO 
        title="Analytics - Apex" 
        description="Personal fishing intelligence with AI-powered pattern detection and CPUE analysis"
      />
      <Layout>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold apex-heading mb-1">Coaching Engine</h1>
            <p className="text-sm text-muted-foreground">
              Personal analytics and pattern intelligence
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Total Catches" value={stats.totalCatches} icon={Fish} />
            <StatCard label="Species Count" value={stats.species} icon={Award} trend="up" trendValue="+2" />
            <StatCard label="Avg Weight" value={`${stats.avgWeight}lb`} icon={TrendingUp} />
            <StatCard label="CPUE" value={stats.cpue} subtitle="Catch/Hour" icon={Target} trend="up" trendValue="+0.3" />
          </div>

          {/* Smart Insight Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {insights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="ai-insight">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-5 w-5 ${item.color}`} />
                    <p className="font-bold">{item.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.insight}</p>
                </div>
              );
            })}
          </div>

          {/* Detailed Analytics Tabs */}
          <Tabs defaultValue="species" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="species" className="apex-data">
                <Fish className="h-4 w-4 mr-2" />
                Species
              </TabsTrigger>
              <TabsTrigger value="bait" className="apex-data">
                <Target className="h-4 w-4 mr-2" />
                Bait Efficacy
              </TabsTrigger>
              <TabsTrigger value="time" className="apex-data">
                <Calendar className="h-4 w-4 mr-2" />
                Time Patterns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="species" className="mt-6">
              <Card className="apex-card p-6">
                <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Species Performance Analysis
                </h3>
                <div className="space-y-4">
                  {speciesBreakdown.map((species, idx) => (
                    <div key={idx} className="intelligence-panel">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-lg mb-1">{species.species}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="apex-data">{species.catches} catches</span>
                            <span>•</span>
                            <span className="apex-data">{species.avgWeight}lb avg</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold apex-data text-primary mb-1">
                            {species.successRate}%
                          </div>
                          <div className="text-xs text-muted-foreground">Success Rate</div>
                        </div>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000"
                          style={{ width: `${species.successRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="bait" className="mt-6">
              <Card className="apex-card p-6">
                <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Bait Performance Heatmap
                </h3>
                <div className="space-y-4">
                  {baitEfficacy.map((bait, idx) => (
                    <div key={idx} className="intelligence-panel">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-bold text-lg mb-1">{bait.bait}</p>
                          <div className="flex flex-wrap gap-2 text-xs mb-2">
                            {bait.waters.map((water) => (
                              <span key={water} className="px-2 py-1 rounded bg-muted/50 apex-data">
                                {water}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Droplets className="h-3 w-3" />
                              <span>{bait.clarity}</span>
                            </div>
                            <span>•</span>
                            <span className="apex-data">{bait.catches} catches</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold apex-data text-success mb-1">
                            {bait.successRate}%
                          </div>
                          <div className="text-xs text-muted-foreground">Efficacy</div>
                        </div>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-success to-success/60 transition-all duration-1000"
                          style={{ width: `${bait.successRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="time" className="mt-6">
              <Card className="apex-card p-6">
                <h3 className="apex-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Time-of-Day Performance
                </h3>
                <div className="space-y-4">
                  {timePatterns.map((pattern, idx) => (
                    <div key={idx} className="intelligence-panel">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-lg mb-1">{pattern.window}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="apex-data">{pattern.catches} catches</span>
                            <span>•</span>
                            <span>Best: {pattern.bestSpecies}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Zap className="h-4 w-4 text-primary" />
                            <span className="text-2xl font-bold apex-data text-primary">
                              {pattern.avgBiteScore}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">Avg Bite Score</div>
                        </div>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000"
                          style={{ width: `${(pattern.avgBiteScore / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CPUE Calculator */}
          <Card className="apex-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="apex-heading text-sm font-bold uppercase tracking-wider">
                CPUE Calculator
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="intelligence-panel text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">This Month</p>
                <p className="text-4xl font-bold apex-data text-primary mb-1">2.8</p>
                <div className="flex items-center justify-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-semibold">+0.5</span>
                </div>
              </div>
              <div className="intelligence-panel text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Last Month</p>
                <p className="text-4xl font-bold apex-data mb-1">2.3</p>
                <p className="text-xs text-muted-foreground mt-1">Baseline</p>
              </div>
              <div className="intelligence-panel text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">All-Time Best</p>
                <p className="text-4xl font-bold apex-data text-bite-peak mb-1">3.2</p>
                <p className="text-xs text-muted-foreground mt-1">April 2025</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <p>CPUE = Catch Per Unit Effort. Higher values indicate improved efficiency and pattern mastery.</p>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}