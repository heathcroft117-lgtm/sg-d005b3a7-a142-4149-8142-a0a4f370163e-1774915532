import { Plus, MapPin, Camera, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActionsCard() {
  return (
    <div className="tactical-card p-6">
      <h3 className="text-lg font-heading font-semibold mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Plus className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Log Catch</span>
        </Button>
        
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Save Spot</span>
        </Button>
        
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Camera className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Start Trip</span>
        </Button>
        
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Search className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Find Waters</span>
        </Button>
      </div>
    </div>
  );
}