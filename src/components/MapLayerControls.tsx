import { Layers, Map as MapIcon, Fish, MapPin, Navigation, Eye, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface MapLayerControlsProps {
  layers: {
    satellite: boolean;
    bathymetry: boolean;
    catches: boolean;
    waypoints: boolean;
    access: boolean;
    regulations: boolean;
  };
  onLayerToggle: (layer: keyof MapLayerControlsProps["layers"]) => void;
}

export function MapLayerControls({ layers, onLayerToggle }: MapLayerControlsProps) {
  const layerConfig = [
    { key: "satellite" as const, label: "Satellite", icon: MapIcon, color: "text-primary" },
    { key: "bathymetry" as const, label: "Depth Contours", icon: Layers, color: "text-accent" },
    { key: "catches" as const, label: "Catch Clusters", icon: Fish, color: "text-success" },
    { key: "waypoints" as const, label: "Private Waypoints", icon: MapPin, color: "text-warning" },
    { key: "access" as const, label: "Access Points", icon: Navigation, color: "text-info" },
    { key: "regulations" as const, label: "Reg Zones", icon: Eye, color: "text-danger" },
  ];

  return (
    <Card className="apex-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-5 w-5 text-primary" />
        <h3 className="apex-heading text-sm font-bold uppercase tracking-wider">Map Layers</h3>
      </div>

      <div className="space-y-3">
        {layerConfig.map((layer) => {
          const Icon = layer.icon;
          return (
            <div key={layer.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${layer.color}`} />
                <Label htmlFor={layer.key} className="text-sm font-medium cursor-pointer">
                  {layer.label}
                </Label>
                {layer.key === "waypoints" && (
                  <Lock className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <Switch
                id={layer.key}
                checked={layers[layer.key]}
                onCheckedChange={() => onLayerToggle(layer.key)}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <Button variant="outline" size="sm" className="w-full">
          Save View
        </Button>
        <Button variant="ghost" size="sm" className="w-full text-xs">
          Reset to Default
        </Button>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-2">
          <Lock className="h-4 w-4 text-primary mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Private waypoints use end-to-end encryption and support "Blurred Icon" mode for screenshots.
          </p>
        </div>
      </div>
    </Card>
  );
}