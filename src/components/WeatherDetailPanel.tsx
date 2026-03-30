import { Wind, Droplets, Eye, Gauge, Thermometer, CloudRain, TrendingUp, TrendingDown } from "lucide-react";

interface WeatherDetailPanelProps {
  temperature: number;
  pressure: number;
  pressureTrend: "rising" | "falling" | "stable";
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  precipitation: number;
  expanded?: boolean;
}

export function WeatherDetailPanel({
  temperature,
  pressure,
  pressureTrend,
  humidity,
  windSpeed,
  windDirection,
  visibility,
  precipitation,
  expanded = false,
}: WeatherDetailPanelProps) {
  const getTrendIcon = () => {
    if (pressureTrend === "rising") return <TrendingUp className="h-4 w-4 text-success" />;
    if (pressureTrend === "falling") return <TrendingDown className="h-4 w-4 text-danger" />;
    return null;
  };

  const getTrendColor = () => {
    if (pressureTrend === "rising") return "text-success";
    if (pressureTrend === "falling") return "text-danger";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="intelligence-panel">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Temperature</span>
          </div>
          <p className="text-2xl font-bold apex-data">{temperature}°F</p>
        </div>

        <div className="intelligence-panel">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-4 w-4 text-accent" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Pressure</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold apex-data">{pressure}</p>
            {getTrendIcon()}
          </div>
          <p className={`text-xs font-semibold mt-1 ${getTrendColor()}`}>
            {pressureTrend === "rising" ? "Rising" : pressureTrend === "falling" ? "Falling" : "Stable"}
          </p>
        </div>

        <div className="intelligence-panel">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="h-4 w-4 text-info" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Humidity</span>
          </div>
          <p className="text-2xl font-bold apex-data">{humidity}%</p>
        </div>
      </div>

      {expanded && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="intelligence-panel">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="h-4 w-4 text-warning" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Wind</span>
            </div>
            <p className="text-2xl font-bold apex-data">{windSpeed}</p>
            <p className="text-xs text-muted-foreground mt-1">mph {windDirection}</p>
          </div>

          <div className="intelligence-panel">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Visibility</span>
            </div>
            <p className="text-2xl font-bold apex-data">{visibility}</p>
            <p className="text-xs text-muted-foreground mt-1">miles</p>
          </div>

          <div className="intelligence-panel">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="h-4 w-4 text-info" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Precip</span>
            </div>
            <p className="text-2xl font-bold apex-data">{precipitation}%</p>
          </div>
        </div>
      )}
    </div>
  );
}