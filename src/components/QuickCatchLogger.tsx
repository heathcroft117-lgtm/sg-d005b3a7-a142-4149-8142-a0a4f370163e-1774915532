import { useState } from "react";
import { X, Camera, MapPin, Clock, Ruler, Weight, Save, Mic, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface QuickCatchLoggerProps {
  onClose: () => void;
}

export function QuickCatchLogger({ onClose }: QuickCatchLoggerProps) {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [aiSuggestions, setAISuggestions] = useState<string[]>([]);

  const recentSpecies = ["Largemouth Bass", "Smallmouth Bass", "White Bass", "Crappie"];
  const recentBaits = ["Green Pumpkin Jig", "White Crankbait", "Ned Rig", "Drop Shot"];

  const handlePhotoUpload = () => {
    setIsAIAnalyzing(true);
    setTimeout(() => {
      setIsAIAnalyzing(false);
      setAISuggestions(["Largemouth Bass", "Est. 4.5-5.2 lbs", "Est. 18-19 inches"]);
    }, 2000);
  };

  const handleVoiceLog = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-6">
        <Card className="apex-card-hover max-w-2xl mx-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="apex-heading text-2xl font-bold mb-1">Smart Capture</h2>
                <p className="text-sm text-muted-foreground apex-data">
                  {new Date().toLocaleString("en-US", { 
                    month: "short", 
                    day: "numeric", 
                    hour: "numeric", 
                    minute: "2-digit" 
                  })}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* AI Photo Capture */}
            <div className="mb-6">
              <Label className="text-sm font-semibold mb-2 block">Photo-First AI</Label>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-apex-obsidian to-muted rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center group">
                  {isAIAnalyzing ? (
                    <div className="text-center">
                      <Brain className="h-12 w-12 mx-auto mb-3 text-primary animate-pulse" />
                      <p className="text-sm font-semibold">AI Analyzing Species...</p>
                      <p className="text-xs text-muted-foreground mt-1">Structure Detection Active</p>
                    </div>
                  ) : (
                    <div className="text-center" onClick={handlePhotoUpload}>
                      <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      <p className="text-sm font-semibold">Tap to Capture</p>
                      <p className="text-xs text-muted-foreground mt-1">AI identifies species & estimates size</p>
                    </div>
                  )}
                </div>
                {aiSuggestions.length > 0 && (
                  <div className="mt-3 p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold text-primary">AI Intelligence</span>
                    </div>
                    <div className="space-y-1">
                      {aiSuggestions.map((suggestion, idx) => (
                        <p key={idx} className="text-sm apex-data">{suggestion}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Voice-to-Log */}
            <div className="mb-6">
              <Label className="text-sm font-semibold mb-2 block">Voice-to-Log</Label>
              <Button
                variant={isVoiceActive ? "default" : "outline"}
                className={`w-full gap-2 ${isVoiceActive ? "apex-btn-primary" : ""}`}
                onClick={handleVoiceLog}
              >
                <Mic className={`h-4 w-4 ${isVoiceActive ? "animate-pulse" : ""}`} />
                {isVoiceActive ? "Listening... (Tap to stop)" : "Tap to Speak"}
              </Button>
              {isVoiceActive && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Say: "5lb Smallmouth on a green pumpkin jig"
                </p>
              )}
            </div>

            {/* Quick Species Selection */}
            <div className="mb-4">
              <Label htmlFor="species" className="text-sm font-semibold mb-2 block">Species</Label>
              <Select>
                <SelectTrigger id="species" className="apex-data">
                  <SelectValue placeholder="Select or search species" />
                </SelectTrigger>
                <SelectContent>
                  {recentSpecies.map((species) => (
                    <SelectItem key={species} value={species}>{species}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-muted-foreground">Recently Used:</span>
                {recentSpecies.slice(0, 3).map((species) => (
                  <button
                    key={species}
                    className="text-xs px-2 py-1 rounded bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    {species.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Measurements */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="weight" className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Weight className="h-4 w-4" />
                  Weight
                </Label>
                <Input id="weight" type="number" step="0.1" placeholder="lbs" className="apex-data" />
              </div>
              <div>
                <Label htmlFor="length" className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Length
                </Label>
                <Input id="length" type="number" step="0.5" placeholder="inches" className="apex-data" />
              </div>
            </div>

            {/* Bait Selection */}
            <div className="mb-4">
              <Label htmlFor="bait" className="text-sm font-semibold mb-2 block">Bait/Lure</Label>
              <Select>
                <SelectTrigger id="bait" className="apex-data">
                  <SelectValue placeholder="What were you using?" />
                </SelectTrigger>
                <SelectContent>
                  {recentBaits.map((bait) => (
                    <SelectItem key={bait} value={bait}>{bait}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location (Auto-filled) */}
            <div className="mb-4">
              <Label className="text-sm font-semibold mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Location (Auto-Captured)
              </Label>
              <div className="p-3 rounded-lg bg-muted/30 apex-data text-sm">
                <p className="font-semibold">Lake Travis - North Shore</p>
                <p className="text-xs text-muted-foreground">30.3922° N, 97.8832° W</p>
              </div>
            </div>

            {/* Conditions (Auto-filled) */}
            <div className="mb-6">
              <Label className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                Conditions (Auto-Logged)
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="intelligence-panel text-center">
                  <p className="text-xs text-muted-foreground">Temp</p>
                  <p className="apex-data font-semibold">68°F</p>
                </div>
                <div className="intelligence-panel text-center">
                  <p className="text-xs text-muted-foreground">Pressure</p>
                  <p className="apex-data font-semibold">29.95mb</p>
                </div>
                <div className="intelligence-panel text-center">
                  <p className="text-xs text-muted-foreground">Wind</p>
                  <p className="apex-data font-semibold">5mph NE</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <Label htmlFor="notes" className="text-sm font-semibold mb-2 block">Quick Notes</Label>
              <Textarea
                id="notes"
                placeholder="Fight details, retrieve speed, structure notes..."
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Fishing DNA Insight */}
            <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 via-transparent to-transparent border-l-2 border-primary">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-semibold mb-1">Fishing DNA Update</p>
                  <p className="text-xs text-muted-foreground">
                    This catch adds to your pattern: 85% of your Largemouth success occurs during rising pressure with water temps 65-72°F.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Save as Draft
              </Button>
              <Button className="flex-1 apex-btn-primary gap-2">
                <Save className="h-4 w-4" />
                Log Catch
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}