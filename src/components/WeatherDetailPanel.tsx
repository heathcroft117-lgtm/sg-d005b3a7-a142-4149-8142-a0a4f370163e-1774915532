import { Wind, Droplets, Eye, Gauge, Thermometer, CloudRain } from "lucide-react";

interface WeatherDetailPanelProps {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  precipitation: number;
}

export function WeatherDetailPanel({
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  windDirection,
  pressure,
  visibility,
  precipitation,
}: WeatherDetailPanelProps) {
  const weatherStats = [
    { label: "Temperature", value: `${temperature}°F`, icon: Thermometer, color: "text-orange-500" },
    { label: "Feels Like", value: `${feelsLike}°F`, icon: Thermometer, color: "text-orange-400" },
    { label: "Humidity", value: `${humidity}%`, icon: Droplets, color: "text-blue-500" },
    { label: "Wind", value: `${windSpeed} mph ${windDirection}`, icon: Wind, color: "text-cyan-500" },
    { label: "Pressure", value: `${pressure} mb`, icon: Gauge, color: "text-violet-500" },
    { label: "Visibility", value: `${visibility} mi`, icon: Eye, color: "text-sky-500" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {weatherStats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</span>
            </div>
            <div className="text-lg font-heading font-semibold">{stat.value}</div>
          </div>
        );
      })}
      
      {precipitation > 0 && (
        <div className="col-span-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-center gap-2">
            <CloudRain className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Precipitation: {precipitation}%</span>
          </div>
        </div>
      )}
    </div>
  );
}