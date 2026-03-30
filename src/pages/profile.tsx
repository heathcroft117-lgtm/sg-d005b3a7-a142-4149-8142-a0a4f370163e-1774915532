import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { User, Settings, Trophy, Fish, MapPin, Calendar, Target, Award, Bell, Lock, Palette, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const userProfile = {
    name: "Alex Thompson",
    username: "@lakebasser",
    level: 12,
    memberSince: "Feb 2026",
    totalCatches: 142,
    totalTrips: 28,
    totalSpecies: 12,
    favoriteWater: "Lake Travis",
    achievements: 32,
    streak: 14,
  };

  const statsOverview = [
    { label: "Catches", value: 142, icon: Fish },
    { label: "Trips", value: 28, icon: Calendar },
    { label: "Species", value: 12, icon: Target },
    { label: "Achievements", value: 32, icon: Trophy },
  ];

  const personalBests = [
    { species: "Largemouth Bass", weight: "8.4 lbs", date: "Mar 15, 2026" },
    { species: "White Bass", weight: "3.2 lbs", date: "Mar 10, 2026" },
    { species: "Channel Catfish", weight: "12.1 lbs", date: "Feb 28, 2026" },
  ];

  return (
    <>
      <SEO 
        title="Profile - FishIQ"
        description="Your fishing profile and settings"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          {/* Profile Header */}
          <Card className="tactical-card p-6 mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-heading font-bold text-primary-foreground">
                AT
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-heading font-bold mb-1">{userProfile.name}</h1>
                <p className="text-sm text-muted-foreground mb-3">{userProfile.username}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-accent" />
                    <span className="font-semibold">Level {userProfile.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Since {userProfile.memberSince}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {statsOverview.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center p-3 rounded-lg bg-card/50">
                    <Icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-xl font-heading font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Tabs for Profile Content */}
          <Tabs defaultValue="stats" className="mb-6">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="bests">Personal Bests</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-4">
              <Card className="tactical-card p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Fishing Overview</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Fish className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">Favorite Species</p>
                        <p className="text-sm text-muted-foreground">Largemouth Bass (48 catches)</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold">Favorite Water</p>
                        <p className="text-sm text-muted-foreground">{userProfile.favoriteWater}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-semibold">Success Rate</p>
                        <p className="text-sm text-muted-foreground">84% overall</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-warning" />
                      <div>
                        <p className="font-semibold">Current Streak</p>
                        <p className="text-sm text-muted-foreground">{userProfile.streak} consecutive days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Personal Bests Tab */}
            <TabsContent value="bests" className="space-y-4">
              <Card className="tactical-card p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Personal Best Catches</h2>
                <div className="space-y-3">
                  {personalBests.map((best, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-accent/10 to-transparent border border-accent/20">
                      <div>
                        <h3 className="font-heading font-semibold">{best.species}</h3>
                        <p className="text-sm text-muted-foreground">{best.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-heading font-bold text-accent">{best.weight}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card className="tactical-card p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Privacy & Sharing</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Private Waypoints</p>
                        <p className="text-xs text-muted-foreground">Keep your spots secret</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Friends-Only Catches</p>
                        <p className="text-xs text-muted-foreground">Share with trusted anglers</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Public Achievements</p>
                        <p className="text-xs text-muted-foreground">Show badges to others</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>

              <Card className="tactical-card p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Bite Alerts</p>
                        <p className="text-xs text-muted-foreground">Prime conditions notifications</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Tournament Reminders</p>
                        <p className="text-xs text-muted-foreground">Event start notifications</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Achievement Unlocks</p>
                        <p className="text-xs text-muted-foreground">New badge notifications</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>

              <Card className="tactical-card p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Palette className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Dark Mode</p>
                        <p className="text-xs text-muted-foreground">Optimize for outdoor use</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Offline Mode</p>
                        <p className="text-xs text-muted-foreground">Auto-download maps & regulations</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>

              <Card className="tactical-card p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Data & Backup</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Export Logbook Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Download Offline Maps
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Backup Waypoints
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
}