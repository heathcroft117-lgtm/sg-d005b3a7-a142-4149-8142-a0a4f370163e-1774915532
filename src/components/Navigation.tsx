import Link from "next/link";
import { Waves, Target, Map, BookOpen, Trophy, User, Bell } from "lucide-react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const router = useRouter();
  
  const navItems = [
    { href: "/", label: "Dashboard", icon: Target },
    { href: "/forecast", label: "Forecast", icon: Waves },
    { href: "/map", label: "Atlas", icon: Map },
    { href: "/logbook", label: "Logbook", icon: BookOpen },
    { href: "/tournaments", label: "Arena", icon: Trophy },
  ];

  const isActive = (href: string) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 z-40 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded flex items-center justify-center glow-green">
              <Waves className="h-5 w-5 text-apex-obsidian" />
            </div>
            <span className="apex-heading text-xl text-foreground group-hover:text-primary transition-colors">
              APEX
            </span>
            <span className="text-xs font-mono text-muted-foreground tracking-wider">
              v2.0
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                    isActive(item.href)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}