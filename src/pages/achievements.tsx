import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Trophy, Target, Calendar, Fish, TrendingUp, Award, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function AchievementsPage() {
  const userStats = {
    level: 12,
    xp: 3250,
    xpToNext: 4000,
    totalAchievements: 48,
    unlockedAchievements: 32,
    streak: 14,
  };

  const featuredAchievements = [
    {
      id: 1,
      name: "First Catch",
      description: "Log your first catch",
      icon: Fish,
      unlocked: true,
      date: "Feb 10, 2026",
      rarity: "Common",
    },
    {
      id: 2,
      name: "Century Club",
      description: "Catch 100 fish",
      icon: Trophy,
      unlocked: true,
      date: "Mar 15, 2026",
      rarity: "Rare",
      progress: 100,
    },
    {
      id: 3,
      name: "Species Hunter",
      description: "Catch 10 different species",
      icon: Target,
      unlocked: true,
      date: "Mar 20, 2026",
      rarity: "Epic",
      progress: 100,
    },
    {
      id: 4,
      name: "Weekend Warrior",
      description: "Fish 15 consecutive weekends",
      icon: Calendar,
      unlocked: false,
      rarity: "Rare",
      progress: 73,
      current: 11,
      total: 15,
    },
    {
      id: 5,
      name: "Trophy Hunter",
      description: "Catch a fish over 10 lbs",
      icon: Award,
      unlocked: false,
      rarity: "Legendary",
      progress: 0,
    },
  ];

  const milestones = [
    { label: "Total Catches", value: 142, milestone: 150, progress: 95 },
    { label: "Species Caught", value: 12, milestone: 15, progress: 80 },
    { label: "Fishing Days", value: 28, milestone: 30, progress: 93 },
    { label: "Trip Hours", value: 85, milestone: 100, progress: 85 },
  ];

  const recentUnlocks = [
    { name: "Consistent Angler", unlocked: "2 days ago", icon: TrendingUp },
    { name: "Early Bird", unlocked: "5 days ago", icon: Calendar },
    { name: "Bass Master", unlocked: "1 week ago", icon: Fish },
  ];

  return (
    <>
      <SEO 
        title="Achievements - FishIQ"
        description="Your fishing achievements and milestones"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold mb-2">Achievements</h1>
            <p className="text-muted-foreground">Track your progress and unlock rewards</p>
          </div>

          {/* Player Level Card */}
          <Card className="tactical-card p-6 mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Angler Level</div>
                <div className="text-4xl font-heading font-bold text-primary">{userStats.level}</div>
              </div>
              <div className="flex items-center gap-4 text-center">
                <div>
                  <div className="text-2xl font-heading font-bold text-accent">{userStats.streak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-success">{userStats.unlockedAchievements}/{userStats.totalAchievements}</div>
                  <div className="text-xs text-muted-foreground">Unlocked</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress to Level {userStats.level + 1}</span>
                <span className="font-medium">{userStats.xp} / {userStats.xpToNext} XP</span>
              </div>
              <Progress value={(userStats.xp / userStats.xpToNext) * 100} className="h-2" />
            </div>
          </Card>

          {/* Milestones Progress */}
          <Card className="tactical-card p-6 mb-6">
            <h3 className="text-lg font-heading font-semibold mb-4">Current Milestones</h3>
            <div className="space-y-4">
              {milestones.map((milestone, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">{milestone.label}</span>
                    <span className="text-muted-foreground">
                      {milestone.value} / {milestone.milestone}
                    </span>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Featured Achievements */}
          <div className="mb-4">
            <h2 className="text-xl font-heading font-semibold mb-4">Achievements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {featuredAchievements.map((achievement) => {
              const Icon = achievement.icon;
              const isLocked = !achievement.unlocked;
              
              return (
                <Card 
                  key={achievement.id} 
                  className={`tactical-card p-4 ${
                    isLocked ? "opacity-60" : "border-primary/30"
                  } transition-all hover:border-primary/50`}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isLocked 
                          ? "bg-muted/30" 
                          : achievement.rarity === "Legendary"
                          ? "bg-gradient-to-br from-accent to-warning"
                          : achievement.rarity === "Epic"
                          ? "bg-gradient-to-br from-primary to-accent"
                          : achievement.rarity === "Rare"
                          ? "bg-primary/20"
                          : "bg-muted/30"
                      }`}
                    >
                      {isLocked ? (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-heading font-semibold">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        <Badge 
                          variant="outline"
                          className={
                            achievement.rarity === "Legendary"
                              ? "bg-accent/20 text-accent border-accent/30"
                              : achievement.rarity === "Epic"
                              ? "bg-primary/20 text-primary border-primary/30"
                              : achievement.rarity === "Rare"
                              ? "bg-success/20 text-success border-success/30"
                              : "bg-muted/20 text-muted-foreground border-muted/30"
                          }
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>

                      {achievement.unlocked ? (
                        <p className="text-xs text-success">Unlocked {achievement.date}</p>
                      ) : achievement.progress !== undefined ? (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            {achievement.current && achievement.total && (
                              <span className="font-medium">{achievement.current} / {achievement.total}</span>
                            )}
                          </div>
                          <Progress value={achievement.progress} className="h-1.5" />
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-2">Keep fishing to unlock</p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Recent Unlocks */}
          <Card className="tactical-card p-6">
            <h3 className="text-lg font-heading font-semibold mb-4">Recently Unlocked</h3>
            <div className="space-y-3">
              {recentUnlocks.map((unlock, idx) => {
                const Icon = unlock.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold">{unlock.name}</h4>
                      <p className="text-xs text-muted-foreground">{unlock.unlocked}</p>
                    </div>
                    <Trophy className="h-5 w-5 text-accent" />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}