import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Bell, TrendingUp, Trophy, Calendar, MapPin, Fish, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "bite-alert",
      title: "Prime Bite Window Active",
      message: "Current conditions show 85+ bite score for bass at Lake Travis",
      time: "15 minutes ago",
      read: false,
      icon: TrendingUp,
      color: "text-bite-strong",
    },
    {
      id: 2,
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You earned the 'Consistent Angler' badge for your 14-day streak",
      time: "2 hours ago",
      read: false,
      icon: Trophy,
      color: "text-accent",
    },
    {
      id: 3,
      type: "tournament",
      title: "Tournament Starting Soon",
      message: "Spring Bass Challenge begins in 3 days",
      time: "5 hours ago",
      read: true,
      icon: Calendar,
      color: "text-primary",
    },
    {
      id: 4,
      type: "location",
      title: "New Waypoint Saved",
      message: "Your spot at Lake Travis - Point 7 has been saved",
      time: "1 day ago",
      read: true,
      icon: MapPin,
      color: "text-success",
    },
    {
      id: 5,
      type: "catch",
      title: "Personal Best Updated",
      message: "Your new largemouth bass record: 8.4 lbs!",
      time: "2 days ago",
      read: true,
      icon: Fish,
      color: "text-accent",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <SEO 
        title="Notifications - FishIQ"
        description="Your fishing alerts and updates"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-1">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>

          {/* Quick Actions */}
          {unreadCount > 0 && (
            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="sm">Mark All as Read</Button>
              <Button variant="outline" size="sm">Clear Read</Button>
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`tactical-card p-4 transition-colors cursor-pointer ${
                    !notification.read ? "border-primary/30 bg-primary/5" : "hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-heading font-semibold">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="default" className="bg-primary/20 text-primary border-primary/30">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Empty State (if no notifications) */}
          {notifications.length === 0 && (
            <Card className="tactical-card p-12 text-center">
              <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-heading font-semibold mb-2">No notifications yet</h3>
              <p className="text-sm text-muted-foreground">
                We'll notify you about bite alerts, achievements, and tournament updates
              </p>
            </Card>
          )}

          {/* Info Card */}
          <Card className="tactical-card p-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold mb-1">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Customize your alerts in Settings to receive only the notifications that matter most to you.
                </p>
                <Button variant="outline" size="sm">Manage Preferences</Button>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}