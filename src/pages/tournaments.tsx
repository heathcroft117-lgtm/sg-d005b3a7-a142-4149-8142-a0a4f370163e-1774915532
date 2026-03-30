import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Users, 
  Calendar, 
  MapPin, 
  Fish, 
  Award,
  CheckCircle2,
  Clock,
  Camera,
  Shield,
  AlertTriangle,
  Lock,
  TrendingUp,
  Target,
  Plus
} from "lucide-react";

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState("live");

  const liveTournaments = [
    {
      id: "1",
      name: "Highland Lakes Bass Classic",
      organizer: "Central Texas Anglers",
      type: "Bass",
      startDate: "2026-04-15",
      endDate: "2026-04-30",
      participants: 24,
      maxParticipants: 32,
      species: ["Largemouth Bass", "Smallmouth Bass"],
      waters: ["Lake Travis", "Lake Austin"],
      status: "active",
      myRank: 3,
      myEntries: 5,
      leaderTotal: 28.4,
      myTotal: 24.8,
    },
    {
      id: "2",
      name: "White Bass Spring Run Challenge",
      organizer: "Austin Fishing Club",
      type: "White Bass",
      startDate: "2026-03-20",
      endDate: "2026-04-10",
      participants: 18,
      maxParticipants: 25,
      species: ["White Bass"],
      waters: ["Lake Travis"],
      status: "active",
      myRank: 7,
      myEntries: 3,
      leaderTotal: 42.5,
      myTotal: 31.2,
    },
  ];

  const upcomingTournaments = [
    {
      id: "3",
      name: "Summer Striper Showdown",
      organizer: "Lake Travis Guides",
      type: "Striped Bass",
      startDate: "2026-06-01",
      endDate: "2026-06-30",
      participants: 0,
      maxParticipants: 40,
      species: ["Striped Bass"],
      waters: ["Lake Travis", "Lake Georgetown"],
      status: "registration",
      entryFee: "$25",
      prizes: "1st: $500, 2nd: $250, 3rd: $100",
    },
  ];

  const pastTournaments = [
    {
      id: "4",
      name: "Winter Bass Invitational",
      organizer: "Highland Lakes Anglers",
      endDate: "2026-02-28",
      finalRank: 2,
      participants: 28,
      totalWeight: 31.5,
      biggestFish: 8.2,
      status: "completed",
    },
  ];

  return (
    <>
      <SEO 
        title="Competitive Arena - Apex" 
        description="Private invite-only tournaments with AI verification and secure catch submission"
      />
      <Layout>
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apex-heading mb-1">Competitive Arena</h1>
              <p className="text-sm text-muted-foreground apex-data">
                Private Tournaments • Verifiable Results • High Integrity
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Event</span>
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="apex-card p-4">
              <Trophy className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold apex-data mb-1">12</p>
              <p className="text-xs text-muted-foreground">Events Entered</p>
            </Card>
            <Card className="apex-card p-4">
              <Award className="h-5 w-5 text-warning mb-2" />
              <p className="text-2xl font-bold apex-data mb-1">3</p>
              <p className="text-xs text-muted-foreground">Podium Finishes</p>
            </Card>
            <Card className="apex-card p-4">
              <Target className="h-5 w-5 text-success mb-2" />
              <p className="text-2xl font-bold apex-data mb-1">94%</p>
              <p className="text-xs text-muted-foreground">Verification Rate</p>
            </Card>
            <Card className="apex-card p-4">
              <TrendingUp className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold apex-data mb-1">+2</p>
              <p className="text-xs text-muted-foreground">Rank Improvement</p>
            </Card>
          </div>

          {/* Tournament Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="live" className="apex-data">
                <Clock className="h-4 w-4 mr-2" />
                Live ({liveTournaments.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="apex-data">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming ({upcomingTournaments.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="apex-data">
                <Trophy className="h-4 w-4 mr-2" />
                Past ({pastTournaments.length})
              </TabsTrigger>
            </TabsList>

            {/* Live Tournaments */}
            <TabsContent value="live" className="mt-6 space-y-4">
              {liveTournaments.map((tournament) => (
                <Card key={tournament.id} className="apex-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{tournament.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Organized by {tournament.organizer}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="verification-badge bg-success/20 text-success border-success/30">
                          ACTIVE
                        </div>
                        <div className="verification-badge bg-primary/20 text-primary border-primary/30">
                          AI VERIFIED
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold apex-data text-primary mb-1">
                        #{tournament.myRank}
                      </div>
                      <p className="text-xs text-muted-foreground">Your Rank</p>
                    </div>
                  </div>

                  {/* Tournament Details */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="intelligence-panel">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Event Window</p>
                      </div>
                      <p className="text-sm font-semibold apex-data">
                        {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.ceil((new Date(tournament.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
                      </p>
                    </div>

                    <div className="intelligence-panel">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-primary" />
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Participants</p>
                      </div>
                      <p className="text-sm font-semibold apex-data">
                        {tournament.participants} / {tournament.maxParticipants}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {tournament.maxParticipants - tournament.participants} spots available
                      </p>
                    </div>
                  </div>

                  {/* Species & Waters */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Target Species</p>
                      <div className="flex flex-wrap gap-2">
                        {tournament.species.map((species) => (
                          <span key={species} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold apex-data">
                            {species}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Approved Waters</p>
                      <div className="flex flex-wrap gap-2">
                        {tournament.waters.map((water) => (
                          <span key={water} className="px-3 py-1 rounded-full bg-muted/50 text-xs font-semibold apex-data">
                            {water}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Leaderboard Preview */}
                  <div className="intelligence-panel">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Standing</p>
                      <Button size="sm" variant="ghost" className="text-xs">
                        Full Leaderboard
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Leader Total</p>
                        <p className="text-2xl font-bold apex-data text-primary">{tournament.leaderTotal} lbs</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Your Total</p>
                        <p className="text-2xl font-bold apex-data">{tournament.myTotal} lbs</p>
                        <p className="text-xs text-warning mt-1">-{(tournament.leaderTotal - tournament.myTotal).toFixed(1)} lbs behind</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    <Button className="flex-1 gap-2">
                      <Camera className="h-4 w-4" />
                      Submit Catch
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Trophy className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Upcoming Tournaments */}
            <TabsContent value="upcoming" className="mt-6 space-y-4">
              {upcomingTournaments.map((tournament) => (
                <Card key={tournament.id} className="apex-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{tournament.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Organized by {tournament.organizer}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="verification-badge bg-warning/20 text-warning border-warning/30">
                          REGISTRATION OPEN
                        </div>
                        {tournament.entryFee && (
                          <div className="px-3 py-1 rounded-full bg-muted/50 text-xs font-semibold apex-data">
                            {tournament.entryFee}
                          </div>
                        )}
                      </div>
                    </div>
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>

                  {/* Tournament Details */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="intelligence-panel">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Event Dates</p>
                      </div>
                      <p className="text-sm font-semibold apex-data">
                        {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="intelligence-panel">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-primary" />
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Capacity</p>
                      </div>
                      <p className="text-sm font-semibold apex-data">
                        {tournament.maxParticipants} max participants
                      </p>
                    </div>
                  </div>

                  {/* Species & Waters */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Target Species</p>
                      <div className="flex flex-wrap gap-2">
                        {tournament.species.map((species) => (
                          <span key={species} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold apex-data">
                            {species}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Approved Waters</p>
                      <div className="flex flex-wrap gap-2">
                        {tournament.waters.map((water) => (
                          <span key={water} className="px-3 py-1 rounded-full bg-muted/50 text-xs font-semibold apex-data">
                            {water}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prize Info */}
                  {tournament.prizes && (
                    <div className="intelligence-panel mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-4 w-4 text-warning" />
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Prize Pool</p>
                      </div>
                      <p className="text-sm font-semibold">{tournament.prizes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="flex-1 gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Register Now
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Trophy className="h-4 w-4" />
                      View Rules
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Past Tournaments */}
            <TabsContent value="past" className="mt-6 space-y-4">
              {pastTournaments.map((tournament) => (
                <Card key={tournament.id} className="apex-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{tournament.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Organized by {tournament.organizer}
                      </p>
                      <p className="text-xs text-muted-foreground apex-data">
                        Completed {new Date(tournament.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        {tournament.finalRank <= 3 && (
                          <Trophy className={`h-5 w-5 ${
                            tournament.finalRank === 1 ? "text-warning" :
                            tournament.finalRank === 2 ? "text-muted-foreground" :
                            "text-amber-700"
                          }`} />
                        )}
                        <span className="text-3xl font-bold apex-data">#{tournament.finalRank}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Final Rank</p>
                    </div>
                  </div>

                  {/* Final Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="intelligence-panel text-center">
                      <Fish className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-lg font-bold apex-data mb-1">{tournament.totalWeight}</p>
                      <p className="text-xs text-muted-foreground">Total Weight (lbs)</p>
                    </div>
                    <div className="intelligence-panel text-center">
                      <Trophy className="h-5 w-5 text-warning mx-auto mb-2" />
                      <p className="text-lg font-bold apex-data mb-1">{tournament.biggestFish}</p>
                      <p className="text-xs text-muted-foreground">Big Fish (lbs)</p>
                    </div>
                    <div className="intelligence-panel text-center">
                      <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-lg font-bold apex-data mb-1">{tournament.participants}</p>
                      <p className="text-xs text-muted-foreground">Total Anglers</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <Trophy className="h-4 w-4" />
                    View Full Results
                  </Button>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Verification System Info */}
          <Card className="apex-card p-6 border-primary/30">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-2">Multi-Factor Verification System</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  All tournament submissions undergo rigorous automated and manual review to ensure integrity.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>AI Species Identification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>GPS Geofencing Validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Timestamp Authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Manual Organizer Review</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}