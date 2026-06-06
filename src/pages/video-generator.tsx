import { useState, useRef, useCallback, useEffect } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Wand2,
  Download,
  RotateCcw,
  Play,
  Pause,
  Loader2,
  CheckCircle2,
  XCircle,
  Droplets,
  Wrench,
  Home,
  Flame,
  ShowerHead,
  Pipette,
} from "lucide-react";
import type { GenerateRequest } from "./api/video/generate";
import type { VideoStatus } from "./api/video/status";

const COMPANY_NAME = "Mahmoud Plumbing";
const COMPANY_TAGLINE = "Professional Plumbing Services";

const PRESET_PROMPTS: { label: string; prompt: string; icon: React.ElementType }[] = [
  {
    label: "Pipe Repair",
    icon: Wrench,
    prompt:
      "A professional plumber expertly repairing a burst pipe under a kitchen sink, clean water flowing smoothly through shiny copper pipes, warm workshop lighting, seamless loop, cinematic quality, 4K",
  },
  {
    label: "Water Flow",
    icon: Droplets,
    prompt:
      "Crystal clear water flowing gracefully through modern chrome plumbing fixtures and pipes, overhead bird's-eye view, glistening water droplets, seamless infinite loop, blue and silver tones, professional advertisement style",
  },
  {
    label: "Bathroom Install",
    icon: ShowerHead,
    prompt:
      "Timelapse of a luxurious modern bathroom installation coming together — gleaming white fixtures, chrome faucets, pristine tiles, professional finish, seamless loop, aspirational lifestyle advertisement",
  },
  {
    label: "Hot Water",
    icon: Flame,
    prompt:
      "A modern tankless hot water heater system with glowing blue flames, steaming hot water flowing from a tap, cozy warm lighting, seamless loop, professional product advertisement",
  },
  {
    label: "Home Plumbing",
    icon: Home,
    prompt:
      "A happy family enjoying a perfectly working home — clean tap water, a functional kitchen sink, a running shower, all plumbing in perfect condition, warm natural light, seamless loop, lifestyle advertisement",
  },
  {
    label: "Drain Clean",
    icon: Pipette,
    prompt:
      "Professional drain cleaning in action — a high-pressure hydro jet clearing a blocked drain, water rushing through clean pipes, satisfying loop, professional plumbing service advertisement",
  },
];

type GenerationState = "idle" | "generating" | "polling" | "done" | "error";

const MODEL_OPTIONS = [
  { value: "seedance-1-lite", label: "Seedance 1 Lite (Fast)" },
  { value: "seedance-1", label: "Seedance 1 (Balanced)" },
  { value: "seedance-1-pro", label: "Seedance 1 Pro (Best Quality)" },
];

const DURATION_OPTIONS = [
  { value: "5", label: "5 seconds" },
  { value: "10", label: "10 seconds" },
];

const RESOLUTION_OPTIONS = [
  { value: "480p", label: "480p (Draft)" },
  { value: "720p", label: "720p (HD)" },
  { value: "1080p", label: "1080p (Full HD)" },
];

const ASPECT_RATIO_OPTIONS = [
  { value: "16:9", label: "16:9 Landscape" },
  { value: "9:16", label: "9:16 Portrait" },
  { value: "1:1", label: "1:1 Square" },
];

export default function VideoGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<GenerateRequest["model"]>("seedance-1-lite");
  const [duration, setDuration] = useState<"5" | "10">("5");
  const [resolution, setResolution] = useState<GenerateRequest["resolution"]>("720p");
  const [aspectRatio, setAspectRatio] = useState<GenerateRequest["aspectRatio"]>("16:9");

  const [state, setState] = useState<GenerationState>("idle");
  const [recordId, setRecordId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fakeProgressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearPolling = useCallback(() => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    if (fakeProgressRef.current) clearInterval(fakeProgressRef.current);
    pollIntervalRef.current = null;
    fakeProgressRef.current = null;
  }, []);

  useEffect(() => () => clearPolling(), [clearPolling]);

  const pollStatus = useCallback(
    (id: string) => {
      let fakeProgress = 10;

      fakeProgressRef.current = setInterval(() => {
        fakeProgress = Math.min(fakeProgress + Math.random() * 4, 90);
        setProgress(Math.round(fakeProgress));
      }, 2000);

      pollIntervalRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/video/status?recordId=${id}`);
          const data = await res.json();

          if (!data.success) {
            clearPolling();
            setState("error");
            setErrorMsg(data.error || "Status check failed");
            return;
          }

          const taskStatus: VideoStatus = data.status;

          if (data.progress !== undefined) {
            setProgress(Math.min(data.progress, 95));
          }

          if (taskStatus === "success" && data.videoUrl) {
            clearPolling();
            setProgress(100);
            setVideoUrl(data.videoUrl);
            setState("done");
          } else if (taskStatus === "failed") {
            clearPolling();
            setState("error");
            setErrorMsg("Video generation failed. Please try again.");
          }
        } catch {
          clearPolling();
          setState("error");
          setErrorMsg("Network error while checking status");
        }
      }, 5000);
    },
    [clearPolling]
  );

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || state === "generating" || state === "polling") return;

    clearPolling();
    setState("generating");
    setErrorMsg(null);
    setVideoUrl(null);
    setRecordId(null);
    setProgress(5);

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          model,
          duration: Number(duration),
          resolution,
          aspectRatio,
        } as GenerateRequest),
      });

      const data = await res.json();

      if (!data.success) {
        setState("error");
        setErrorMsg(data.error || "Failed to start generation");
        return;
      }

      setRecordId(data.recordId);
      setState("polling");
      setProgress(10);
      pollStatus(data.recordId);
    } catch {
      setState("error");
      setErrorMsg("Network error. Please check your connection.");
    }
  }, [prompt, model, duration, resolution, aspectRatio, state, clearPolling, pollStatus]);

  const handleReset = useCallback(() => {
    clearPolling();
    setState("idle");
    setVideoUrl(null);
    setRecordId(null);
    setProgress(0);
    setErrorMsg(null);
    setIsPlaying(true);
  }, [clearPolling]);

  const handlePresetSelect = (presetPrompt: string) => {
    setPrompt(presetPrompt);
    handleReset();
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleDownload = async () => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `mahmoud-plumbing-video-${Date.now()}.mp4`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const isLoading = state === "generating" || state === "polling";
  const canGenerate = prompt.trim().length > 0 && !isLoading;

  const statusLabel: Record<GenerationState, string> = {
    idle: "",
    generating: "Submitting to Seedance...",
    polling: "Generating your video...",
    done: "Video ready!",
    error: "Generation failed",
  };

  return (
    <>
      <Head>
        <title>{COMPANY_NAME} — Video Generator</title>
        <meta name="description" content={`AI video generator for ${COMPANY_NAME}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-blue-950/80 backdrop-blur-md">
          <div className="container mx-auto flex items-center gap-3 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/30">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-none">{COMPANY_NAME}</h1>
              <p className="text-xs text-blue-300">{COMPANY_TAGLINE}</p>
            </div>
            <div className="ml-auto">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                <Video className="mr-1 h-3 w-3" />
                Seedance AI
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Title */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              AI Loop Video Generator
            </h2>
            <p className="text-blue-300 text-sm md:text-base">
              Generate professional plumbing advertisement loop videos powered by kie.ai Seedance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Controls */}
            <div className="space-y-5">
              {/* Preset Prompts */}
              <Card className="bg-white/5 border-white/10 p-5">
                <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-4">
                  Quick Start Templates
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {PRESET_PROMPTS.map(({ label, prompt: p, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => handlePresetSelect(p)}
                      className="flex flex-col items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 p-3 text-center text-xs font-medium text-blue-100 transition-all hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-white active:scale-95"
                    >
                      <Icon className="h-5 w-5 text-blue-400" />
                      {label}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Prompt */}
              <Card className="bg-white/5 border-white/10 p-5">
                <label className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-3 block">
                  Video Prompt
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the plumbing video you want to generate... (e.g. professional plumber fixing a pipe, seamless loop)"
                  className="min-h-[100px] resize-none bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-blue-500"
                  disabled={isLoading}
                />
                <p className="mt-2 text-right text-xs text-white/30">{prompt.length} chars</p>
              </Card>

              {/* Settings */}
              <Card className="bg-white/5 border-white/10 p-5">
                <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-4">
                  Generation Settings
                </h3>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="bg-white/10 w-full mb-4">
                    <TabsTrigger value="basic" className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white/60">
                      Basic
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white/60">
                      Advanced
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-3 mt-0">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-white/50 mb-1.5 block">Duration</label>
                        <Select
                          value={duration}
                          onValueChange={(v) => setDuration(v as "5" | "10")}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DURATION_OPTIONS.map((o) => (
                              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs text-white/50 mb-1.5 block">Aspect Ratio</label>
                        <Select
                          value={aspectRatio}
                          onValueChange={(v) => setAspectRatio(v as GenerateRequest["aspectRatio"])}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ASPECT_RATIO_OPTIONS.map((o) => (
                              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-3 mt-0">
                    <div>
                      <label className="text-xs text-white/50 mb-1.5 block">Model</label>
                      <Select
                        value={model}
                        onValueChange={(v) => setModel(v as GenerateRequest["model"])}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {MODEL_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-white/50 mb-1.5 block">Resolution</label>
                      <Select
                        value={resolution}
                        onValueChange={(v) => setResolution(v as GenerateRequest["resolution"])}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {RESOLUTION_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 disabled:opacity-40"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {statusLabel[state]}
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Loop Video
                  </>
                )}
              </Button>
            </div>

            {/* Right: Preview */}
            <div className="space-y-4">
              <Card className="bg-white/5 border-white/10 overflow-hidden">
                {/* Video area */}
                <div className="relative aspect-video w-full bg-black/40 flex items-center justify-center">
                  {state === "done" && videoUrl ? (
                    <>
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        loop
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                      <button
                        onClick={togglePlayPause}
                        className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                      <Badge className="absolute top-3 right-3 bg-green-500/90 text-white border-0 text-xs">
                        Loop
                      </Badge>
                    </>
                  ) : isLoading ? (
                    <div className="flex flex-col items-center gap-3 p-8 text-center">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                        <Droplets className="absolute inset-0 m-auto h-6 w-6 text-blue-400" />
                      </div>
                      <p className="text-sm text-blue-300 font-medium">{statusLabel[state]}</p>
                      <p className="text-xs text-white/40">This may take 1–3 minutes</p>
                    </div>
                  ) : state === "error" ? (
                    <div className="flex flex-col items-center gap-2 p-8 text-center">
                      <XCircle className="h-12 w-12 text-red-400" />
                      <p className="font-semibold text-white">Generation Failed</p>
                      <p className="text-xs text-white/50">{errorMsg}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 p-8 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                        <Video className="h-7 w-7 text-blue-400" />
                      </div>
                      <p className="text-sm text-white/50">
                        Choose a template or write a prompt, then generate your loop video
                      </p>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                {isLoading && (
                  <div className="px-4 py-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                      <span>Processing with Seedance AI</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5 bg-white/10 [&>div]:bg-blue-500" />
                  </div>
                )}

                {/* Done info */}
                {state === "done" && videoUrl && (
                  <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Ready — looping seamlessly</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-white/60 hover:text-white hover:bg-white/10 h-8"
                      >
                        <RotateCcw className="h-3.5 w-3.5 mr-1" />
                        New
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleDownload}
                        className="bg-blue-600 hover:bg-blue-500 h-8 text-white"
                      >
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                {/* Error actions */}
                {state === "error" && (
                  <div className="px-4 py-3 border-t border-white/10 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <RotateCcw className="h-3.5 w-3.5 mr-1" />
                      Try Again
                    </Button>
                  </div>
                )}
              </Card>

              {/* Info card */}
              <Card className="bg-blue-500/10 border-blue-500/20 p-4">
                <h4 className="text-sm font-semibold text-blue-200 mb-2">Tips for Loop Videos</h4>
                <ul className="space-y-1.5 text-xs text-white/60">
                  <li>• Add <span className="text-blue-300">"seamless loop"</span> or <span className="text-blue-300">"infinite loop"</span> to your prompt</li>
                  <li>• Use fluid motions like water flowing, tools spinning, or lights pulsing</li>
                  <li>• Keep scenes simple — fewer elements loop more naturally</li>
                  <li>• Landscape (16:9) works best for digital displays and screens</li>
                </ul>
              </Card>

              {/* Company branding */}
              <div className="text-center text-xs text-white/30">
                Powered by{" "}
                <span className="text-blue-400 font-medium">kie.ai Seedance</span>
                {" "}·{" "}
                {COMPANY_NAME}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
