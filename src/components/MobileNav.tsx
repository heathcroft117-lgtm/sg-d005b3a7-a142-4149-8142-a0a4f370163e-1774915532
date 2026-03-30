import Link from "next/link";
import { useRouter } from "next/router";
import { Target, Waves, Map, BookOpen, Trophy } from "lucide-react";

export function MobileNav() {
  const router = useRouter();

  const navItems = [
    { href: "/", label: "HQ", icon: Target },
    { href: "/forecast", label: "Intel", icon: Waves },
    { href: "/map", label: "Atlas", icon: Map },
    { href: "/logbook", label: "Log", icon: BookOpen },
    { href: "/tournaments", label: "Arena", icon: Trophy },
  ];

  const isActive = (href: string) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                active
                  ? "text-primary"
                  : "text-muted-foreground active:scale-95"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "glow-green" : ""}`} />
              <span className="text-xs font-mono font-semibold tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}