import Link from "next/link";
import { Waves, TrendingUp, Map, BookOpen, Trophy, User } from "lucide-react";

export function Navigation() {
  return (
    <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl">
          <Waves className="h-6 w-6 text-primary" />
          <span>FishIQ</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/forecast" className="text-sm font-medium hover:text-primary transition-colors">
            Forecast
          </Link>
          <Link href="/map" className="text-sm font-medium hover:text-primary transition-colors">
            Map
          </Link>
          <Link href="/logbook" className="text-sm font-medium hover:text-primary transition-colors">
            Logbook
          </Link>
          <Link href="/analytics" className="text-sm font-medium hover:text-primary transition-colors">
            Analytics
          </Link>
          <Link href="/profile" className="text-sm font-medium hover:text-primary transition-colors">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}