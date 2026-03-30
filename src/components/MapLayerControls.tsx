import { Layers, Map as MapIcon, Fish, MapPin, Navigation, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface MapLayerControlsProps {
  onToggleLayer: (layer: string) => void;
  activeLayers: string[];
}

export function MapLayerControls({ onToggleLayer, activeLayers }: MapLayerControlsProps) {
  const layers = [
    { id: "satellite", label: "Satellite", icon: MapIcon, description: "High-res imagery" },
    { id: "bathymetry", label: "Depth Contours", icon: Navigation, description: "Lake structure" },
    { id: "catches", label: "My Catches", icon: Fish, description: "Catch history" },
    { id: "waypoints", label: "Waypoints", icon: MapPin, description: "Saved spots" },
    { id: "access", label: "Access Points", icon: Eye, description: "Ramps & marinas" },
  ];

  return (
    <Card className="tactical-card p-4 absolute top-20 right-4 w-72 z-10 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-semibold">Map Layers</h3>
      </div>

      <div className="space-y-3">
        {layers.map((layer) => {
          const Icon = layer.icon;
          const isActive = activeLayers.includes(layer.id);
          
          return (
            <div 
              key={layer.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => onToggleLayer(layer.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <div className={`font-medium text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {layer.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{layer.description}</div>
                </div>
              </div>
              <Switch checked={isActive} onCheckedChange={() => onToggleLayer(layer.id)} />
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          Save View
        </Button>
      </div>
    </Card>
  );
}