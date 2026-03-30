import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Plus, Trophy, Users, Calendar, Target, MapPin, Clock, Camera, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TournamentsPage() {
  const activeTournaments = [
    {
      id: 1,
      name: "Spring Bass Challenge",
      type: "Invite-Only",
      startDate: "Apr 1, 2026",
      endDate: "Apr 30, 2026",
      participants: 12,
      status: "Active",
      myRank: 3,
      targetSpecies: ["Largemouth Bass"],
      scoringRule: "Total Weight",
      myScore: "28.4 lbs",
      leaderScore: "32.1 lbs",
    },
  ];

  const upcomingTournaments = [
    {
      id: 2,
      name: "Lake Travis Multi-Species Derby",
      type: "Private Club",
      startDate: "May 15, 2026",
      duration: "1 Day",
      participants: 8,
      targetSpecies: ["Bass", "Crappie", "Catfish"],
      entryFee: "Free",
    },
    {
      id: 3,
      name: "Summer Slam Tournament",
      type: "Invite-Only",
      startDate: "Jun 10, 2026",
      duration: "2 Weeks",
      participants: 15,
      targetSpecies: ["Largemouth Bass"],
      entryFee: "Free",
    },
  ];

  const pastResults = [
    {
      id: 4,
      name: "Winter Bass Challenge",
      endDate: "Feb 28, 2026",
      myRank: 2,
      totalParticipants: 10,
      myScore: "42.8 lbs",
      verified: true,
    },
    {
      id: 5,
      name: "January Multi-Species",
      endDate: "Jan 31, 2026",
      myRank: 5,
      totalParticipants: 12,
      myScore: "18 fish",
      verified: true,
    },
  ];

  return (
    <>
      <SEO 
        title="Tournaments - FishIQ"
        description="Private fishing tournaments and challenges"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-1">Tournaments</h1>
              <p className="text-sm text-muted-foreground">Private competitions and challenges</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Event</span>
            </Button>
          </div>

          {/* Tabs for Tournament Views */}
          <Tabs defaultValue="active" className="mb-6">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Results</TabsTrigger>
            </TabsList>

            {/* Active Tournaments */}
            <TabsContent value="active" className="space-y-4">
              {activeTournaments.map((tournament) => (
                <Card key={tournament.id} className="tactical-card p-0 overflow-hidden border-primary/30">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="h-5 w-5 text-accent" />
                          <h2 className="text-xl font-heading font-bold">{tournament.name}</h2>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                            {tournament.status}
                          </Badge>
                          <Badge variant="outline">{tournament.type}</Badge>
                        </div>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Camera className="h-4 w-4" />
                        Submit Catch
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 p-4 rounded-lg bg-muted/30">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Your Rank</p>
                        <p className="text-2xl font-heading font-bold text-primary">#{tournament.myRank}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Your Score</p>
                        <p className="text-2xl font-heading font-bold text-accent">{tournament.myScore}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Ends:</span>
                        <span className="font-medium">{tournament.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Participants:</span>
                        <span className="font-medium">{tournament.participants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Target:</span>
                        <span className="font-medium">{tournament.targetSpecies.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Leader:</span>
                        <span className="font-medium">{tournament.leaderScore}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">View Leaderboard</Button>
                      <Button variant="outline" size="sm" className="flex-1">Tournament Rules</Button>
                    </div>
                  </div>
                </Card>
              ))}

              {activeTournaments.length === 0 && (
                <Card className="tactical-card p-8 text-center">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No active tournaments</p>
                  <Button>Create Your First Event</Button>
                </Card>
              )}
            </TabsContent>

            {/* Upcoming Tournaments */}
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingTournaments.map((tournament) => (
                <Card key={tournament.id} className="tactical-card p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-heading font-semibold mb-2">{tournament.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{tournament.type}</Badge>
                        <Badge variant="outline" className="bg-muted/30">{tournament.entryFee}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Starts:</span>
                      <span className="font-medium">{tournament.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{tournament.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="font-medium">{tournament.participants}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Species:</span>
                      <span className="font-medium">{tournament.targetSpecies.join(", ")}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Past Results */}
            <TabsContent value="past" className="space-y-4">
              {pastResults.map((result) => (
                <Card key={result.id} className="tactical-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-heading font-semibold mb-2">{result.name}</h3>
                      <p className="text-sm text-muted-foreground">Ended {result.endDate}</p>
                    </div>
                    {result.verified && (
                      <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Placement</p>
                      <p className="text-2xl font-heading font-bold text-primary">#{result.myRank}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Score</p>
                      <p className="text-2xl font-heading font-bold text-accent">{result.myScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Field</p>
                      <p className="text-2xl font-heading font-bold text-muted-foreground">{result.totalParticipants}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Tournament Info Card */}
          <Card className="tactical-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold mb-1">Tournament Verification</h3>
                <p className="text-sm text-muted-foreground">
                  All tournament catches require photo proof with GPS stamps. Submissions are reviewed by event organizers to ensure fair competition.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}