import { Trophy, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AchievementCelebrationProps {
  title: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  onClose: () => void;
}

export function AchievementCelebration({ title, description, rarity, onClose }: AchievementCelebrationProps) {
  const rarityColors = {
    common: "from-gray-500 to-gray-600",
    rare: "from-blue-500 to-blue-600",
    epic: "from-purple-500 to-purple-600",
    legendary: "from-amber-500 to-amber-600",
  };

  const rarityBadgeColors = {
    common: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    rare: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    epic: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    legendary: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <Card className={`w-full max-w-md relative tactical-card border-2 border-primary/50 shadow-2xl animate-in zoom-in duration-500`}>
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${rarityColors[rarity]} flex items-center justify-center shadow-2xl animate-in zoom-in duration-700 delay-200`}>
            <Trophy className="h-12 w-12 text-white drop-shadow-lg" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent animate-ping" />
        </div>

        <div className="pt-16 pb-6 px-6 text-center">
          <Badge variant="outline" className={`mb-4 ${rarityBadgeColors[rarity]}`}>
            {rarity.toUpperCase()}
          </Badge>

          <h2 className="text-2xl font-heading font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Achievement Unlocked!
          </h2>
          
          <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-6">{description}</p>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              View Progress
            </Button>
            <Button onClick={onClose} className="flex-1 gap-2">
              <Sparkles className="h-4 w-4" />
              Continue
            </Button>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
}