import { useState } from "react";
import { X, Camera, MapPin, Clock, Ruler, Weight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuickCatchLoggerProps {
  onClose: () => void;
  defaultLocation?: string;
  defaultSpecies?: string;
}

export function QuickCatchLogger({ onClose, defaultLocation, defaultSpecies }: QuickCatchLoggerProps) {
  const [species, setSpecies] = useState(defaultSpecies || "");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [notes, setNotes] = useState("");

  const recentSpecies = ["Largemouth Bass", "White Bass", "Catfish", "Crappie"];
  const recentBaits = ["Senko Worm", "Crankbait", "Spinnerbait", "Jig"];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
      <Card className="w-full md:max-w-lg md:rounded-2xl rounded-t-2xl tactical-card border-primary/30 shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-bottom-0 duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold">Quick Log Catch</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Photo Button */}
          <Button variant="outline" className="w-full h-32 mb-4 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors">
            <div className="text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <span className="text-sm font-medium">Add Photo</span>
              <p className="text-xs text-muted-foreground mt-1">Optional but recommended</p>
            </div>
          </Button>

          {/* Species Selection */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-2 block">Species *</label>
            <Input 
              placeholder="Search or select species..." 
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="mb-2"
            />
            <div className="flex gap-2 flex-wrap">
              {recentSpecies.map((s) => (
                <Badge 
                  key={s}
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-colors"
                  onClick={() => setSpecies(s)}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* Measurements */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                <Weight className="h-4 w-4 text-muted-foreground" />
                Weight
              </label>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  placeholder="0.0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground flex items-center">lbs</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                Length
              </label>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  placeholder="0.0"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground flex items-center">in</span>
              </div>
            </div>
          </div>

          {/* Location & Time Auto-filled */}
          <div className="mb-4 p-3 rounded-lg bg-muted/30 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{defaultLocation || "Lake Travis"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Bait Quick Select */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 block">Bait/Lure</label>
            <div className="flex gap-2 flex-wrap">
              {recentBaits.map((bait) => (
                <Badge 
                  key={bait}
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent/10 hover:border-accent/40 transition-colors"
                >
                  {bait}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Notes */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 block">Notes (optional)</label>
            <Input 
              placeholder="Add details about the catch..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1 gap-2">
              <Save className="h-4 w-4" />
              Save Catch
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}