import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { TrendingUp, Wind, Droplets, Gauge, Moon, Sun, CloudRain, Waves } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ForecastPage() {
  const hourlyForecast = [
    { time: "6 AM", temp: 65, wind: 5, pressure: 30.12, bite: 85, icon: Sun },
    { time: "9 AM", temp: 68, wind: 7, pressure: 30.10, bite: 72, icon: Sun },
    { time: "12 PM", temp: 72, wind: 8, pressure: 30.08, bite: 55, icon: Sun },
    { time: "3 PM", temp: 74, wind: 10, pressure: 30.06, bite: 48, icon: CloudRain },
    { time: "6 PM", temp: 70, wind: 6, pressure: 30.08, bite: 78, icon: Moon },
  ];

  return (
    <>
      <SEO 
        title="Forecast - FishIQ"
        description="Intelligent fishing forecast with bite predictions"
      />
      <Layout>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold mb-2">Fishing Forecast</h1>
            <p className="text-muted-foreground">Lake Travis, TX • Next 7 Days</p>
          </div>

          {/* Today's Summary */}
          <Card className="tactical-card p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-heading font-semibold mb-1">Today's Outlook</h2>
                <p className="text-sm text-muted-foreground">Saturday, March 30</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-heading font-bold text-bite-strong">82</div>
                <div className="text-xs text-muted-foreground">Bite Score</div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Prime Bite Window</p>
                  <p className="text-xs text-muted-foreground">6:00-8:30 AM • Major solunar + rising pressure</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sun className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Secondary Window</p>
                  <p className="text-xs text-muted-foreground">6:30-8:00 PM • Evening feeding push</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-foreground">
                <span className="font-semibold text-primary">Strong conditions</span> for bass and crappie. 
                Target shallow structure early, transition to deeper ledges by midday. 
                Light winds favor topwater in AM hours.
              </p>
            </div>
          </Card>

          {/* Hourly Breakdown */}
          <Card className="tactical-card p-6 mb-6">
            <h3 className="text-lg font-heading font-semibold mb-4">Hourly Conditions</h3>
            <div className="space-y-3">
              {hourlyForecast.map((hour, idx) => {
                const Icon = hour.icon;
                const biteColor = hour.bite >= 75 ? "text-bite-strong" : hour.bite >= 50 ? "text-bite-moderate" : "text-bite-weak";
                
                return (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="w-16 text-sm font-semibold">{hour.time}</div>
                    
                    <div className="flex-1 grid grid-cols-4 gap-2 text-xs">
                      <div>
                        <Icon className="h-4 w-4 mb-1 text-muted-foreground" />
                        <div className="font-medium">{hour.temp}°F</div>
                      </div>
                      <div>
                        <Wind className="h-4 w-4 mb-1 text-muted-foreground" />
                        <div className="font-medium">{hour.wind} mph</div>
                      </div>
                      <div>
                        <Gauge className="h-4 w-4 mb-1 text-muted-foreground" />
                        <div className="font-medium">{hour.pressure}</div>
                      </div>
                      <div>
                        <Waves className="h-4 w-4 mb-1 text-muted-foreground" />
                        <div className={`font-bold ${biteColor}`}>{hour.bite}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 7-Day Extended */}
          <Card className="tactical-card p-6">
            <h3 className="text-lg font-heading font-semibold mb-4">Extended Forecast</h3>
            <div className="space-y-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 text-sm font-semibold">{day}</div>
                    <Sun className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">H: 76°</span>
                    <span className="text-muted-foreground">L: 64°</span>
                    <span className={`font-bold ${idx < 3 ? "text-bite-strong" : "text-bite-moderate"}`}>
                      {85 - (idx * 5)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}