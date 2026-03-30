import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeatherDetailPanel } from "@/components/WeatherDetailPanel";
import { SolunarCard } from "@/components/dashboard/SolunarCard";
import { BiteScoreCard } from "@/components/dashboard/BiteScoreCard";
import { CloudRain, Wind, Droplets, Gauge, TrendingUp, Calendar, Clock, Zap, Brain } from "lucide-react";

export default function ForecastPage() {
  const currentConditions = {
    temperature: 68,
    pressure: 29.95,
    pressureTrend: "rising" as const,
    humidity: 65,
    windSpeed: 5,
    windDirection: "NE",
    visibility: 10,
    precipitation: 10,
  };

  const biteScore = {
    score: 8.3,
    trend: "rising" as const,
    conditions: {
      pressure: "29.95mb ↑",
      waterTemp: "68°F",
      windSpeed: "5mph NE",
    },
  };

  const solunarData = {
    moonPhase: "Waxing Gibbous",
    periods: [
      { type: "major" as const, start: "6:45 AM", end: "8:45 AM", active: false },
      { type: "minor" as const, start: "12:30 PM", end: "1:15 PM", active: false },
      { type: "major" as const, start: "7:15 PM", end: "9:15 PM", active: true },
      { type: "minor" as const, start: "1:00 AM", end: "1:45 AM", active: false },
    ],
    nextPeakCountdown: "",
  };

  const hourlyForecast = Array.from({ length: 24 }, (_, i) => ({
    time: `${i % 12 || 12}${i < 12 ? "AM" : "PM"}`,
    temp: 65 + Math.sin(i / 4) * 10,
    biteScore: 5 + Math.sin(i / 3) * 3,
    wind: 3 + Math.random() * 5,
    precipitation: Math.random() * 30,
  }));

  const weeklyForecast = [
    { day: "Mon", high: 75, low: 62, biteScore: 8.2, conditions: "Partly Cloudy", icon: "⛅" },
    { day: "Tue", high: 78, low: 65, biteScore: 7.8, conditions: "Sunny", icon: "☀️" },
    { day: "Wed", high: 72, low: 60, biteScore: 8.9, conditions: "Overcast", icon: "☁️" },
    { day: "Thu", high: 70, low: 58, biteScore: 6.5, conditions: "Light Rain", icon: "🌧️" },
    { day: "Fri", high: 73, low: 61, biteScore: 9.1, conditions: "Partly Cloudy", icon: "⛅" },
    { day: "Sat", high: 76, low: 63, biteScore: 8.5, conditions: "Sunny", icon: "☀️" },
    { day: "Sun", high: 74, low: 62, biteScore: 7.9, conditions: "Mostly Sunny", icon: "🌤️" },
  ];

  return (
    <>
      <SEO 
        title="Forecast - Apex" 
        description="Intelligent bite forecasting with solunar data, weather analysis, and AI-powered fishing insights"
      />
      <Layout>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apex-heading mb-1">Tactical Forecast</h1>
              <p className="text-sm text-muted-foreground apex-data">
                Lake Travis • 30.3922° N, 97.8832° W
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs font-bold apex-data text-primary">LIVE DATA</span>
            </div>
          </div>

          {/* Current Bite Intelligence */}
          <div className="grid md:grid-cols-2 gap-6">
            <BiteScoreCard {...biteScore} />
            <SolunarCard {...solunarData} />
          </div>

          {/* Detailed Weather */}
          <Card className="apex-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gauge className="h-5 w-5 text-primary" />
              <h3 className="apex-heading text-sm font-bold uppercase tracking-wider">
                Current Conditions
              </h3>
            </div>
            <WeatherDetailPanel {...currentConditions} expanded={true} />
          </Card>

          {/* Hourly + Weekly Tabs */}
          <Tabs defaultValue="hourly" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hourly" className="apex-data">
                <Clock className="h-4 w-4 mr-2" />
                24-Hour
              </TabsTrigger>
              <TabsTrigger value="weekly" className="apex-data">
                <Calendar className="h-4 w-4 mr-2" />
                7-Day
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hourly" className="mt-6">
              <Card className="apex-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="apex-heading text-sm font-bold uppercase tracking-wider">
                      Hourly Bite Windows
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {hourlyForecast.slice(0, 12).map((hour, idx) => (
                      <div
                        key={idx}
                        className={`intelligence-panel text-center ${
                          hour.biteScore > 7 ? "border-primary/50 bg-primary/5" : ""
                        }`}
                      >
                        <p className="text-xs apex-data text-muted-foreground mb-2">{hour.time}</p>
                        <p className="text-2xl font-bold apex-data mb-1">{Math.round(hour.temp)}°</p>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Zap className="h-3 w-3 text-primary" />
                          <p className="text-sm font-semibold text-primary">{hour.biteScore.toFixed(1)}</p>
                        </div>
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                          <Wind className="h-3 w-3" />
                          <span>{Math.round(hour.wind)}mph</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="ai-insight text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <p className="font-semibold">AI Insight</p>
                    </div>
                    <p className="text-muted-foreground">
                      Prime feeding windows detected at 7-9 AM and 6-8 PM. Rising pressure trend suggests active shallow-water bite. Target transition zones during peak periods.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="mt-6">
              <Card className="apex-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="apex-heading text-sm font-bold uppercase tracking-wider">
                      7-Day Outlook
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {weeklyForecast.map((day, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                          day.biteScore > 8
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12">
                            <p className="text-sm font-bold apex-data">{day.day}</p>
                          </div>
                          <div className="text-3xl">{day.icon}</div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">{day.conditions}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span className="apex-data">H: {day.high}°</span>
                              <span className="apex-data">L: {day.low}°</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className={`h-4 w-4 ${day.biteScore > 8 ? "text-primary" : "text-muted-foreground"}`} />
                          <div className="text-right">
                            <p className={`text-2xl font-bold apex-data ${day.biteScore > 8 ? "text-primary" : ""}`}>
                              {day.biteScore.toFixed(1)}
                            </p>
                            <p className="text-xs text-muted-foreground">Bite Score</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="ai-insight text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <p className="font-semibold">Weekly Pattern</p>
                    </div>
                    <p className="text-muted-foreground">
                      Friday shows peak conditions (9.1) with stable pressure and optimal cloud cover. Wednesday's overcast skies create excellent low-light feeding. Plan high-priority trips accordingly.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
}