import Link from "next/link";
import { useRouter } from "next/router";
import { Home, TrendingUp, Map, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const router = useRouter();
  
  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/forecast", icon: TrendingUp, label: "Forecast" },
    { href: "/map", icon: Map, label: "Map" },
    { href: "/logbook", icon: BookOpen, label: "Logbook" },
    { href: "/profile", icon: User, label: "Profile" },
  ];
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[64px]",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}