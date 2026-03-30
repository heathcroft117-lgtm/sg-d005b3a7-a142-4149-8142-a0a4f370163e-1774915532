import { Trophy, Sparkles, X, Star, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AchievementCelebrationProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    rarity: "common" | "rare" | "epic" | "legendary";
    icon: string;
    category: string;
  };
  onClose: () => void;
}

export function AchievementCelebration({ achievement, onClose }: AchievementCelebrationProps) {
  const getRarityColor = () => {
    switch (achievement.rarity) {
      case "legendary": return "from-amber-500 via-yellow-400 to-amber-500";
      case "epic": return "from-purple-500 via-fuchsia-400 to-purple-500";
      case "rare": return "from-primary via-apex-green-glow to-primary";
      default: return "from-muted via-muted-foreground to-muted";
    }
  };

  const getRarityGlow = () => {
    switch (achievement.rarity) {
      case "legendary": return "shadow-2xl shadow-amber-500/50";
      case "epic": return "shadow-2xl shadow-purple-500/50";
      case "rare": return "glow-green-strong";
      default: return "";
    }
  };

  const getRarityBorder = () => {
    switch (achievement.rarity) {
      case "legendary": return "border-amber-500/50";
      case "epic": return "border-purple-500/50";
      case "rare": return "border-primary/50";
      default: return "border-border";
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className={`apex-card max-w-md w-full ${getRarityGlow()} ${getRarityBorder()} border-2 relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor()} opacity-10 animate-pulse-glow`} />
        
        <div className="relative p-8">
          <div className="flex justify-end mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="hover:bg-muted/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getRarityColor()} flex items-center justify-center ${getRarityGlow()} animate-bite-pulse`}>
                <span className="text-6xl">{achievement.icon}</span>
              </div>
              <Sparkles className="absolute top-0 right-0 h-8 w-8 text-amber-400 animate-pulse" />
              <Star className="absolute bottom-0 left-0 h-6 w-6 text-amber-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
            </div>

            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {achievement.rarity}
                </span>
              </div>
              <h2 className="apex-heading text-2xl font-bold">{achievement.title}</h2>
              <p className="text-muted-foreground">{achievement.description}</p>
            </div>

            <div className="intelligence-panel">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Category</span>
              </div>
              <p className="font-semibold">{achievement.category}</p>
            </div>

            <Button 
              className="w-full apex-btn-primary"
              onClick={onClose}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}