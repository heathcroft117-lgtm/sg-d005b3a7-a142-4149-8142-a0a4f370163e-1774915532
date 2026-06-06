import type { NextApiRequest, NextApiResponse } from "next";

const KIE_API_BASE = "https://kieai.erweima.ai/api/v1";

export type GenerateRequest = {
  prompt: string;
  model?: "seedance-1-lite" | "seedance-1" | "seedance-1-pro";
  duration?: 5 | 10;
  resolution?: "480p" | "720p" | "1080p";
  aspectRatio?: "16:9" | "9:16" | "1:1";
};

export type GenerateResponse =
  | { success: true; recordId: string }
  | { success: false; error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const apiKey = process.env.KIE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: "KIE_API_KEY is not configured" });
  }

  const {
    prompt,
    model = "seedance-1-lite",
    duration = 5,
    resolution = "720p",
    aspectRatio = "16:9",
  }: GenerateRequest = req.body;

  if (!prompt?.trim()) {
    return res.status(400).json({ success: false, error: "Prompt is required" });
  }

  try {
    const response = await fetch(`${KIE_API_BASE}/seedance/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt.trim(),
        model,
        duration,
        resolution,
        aspect_ratio: aspectRatio,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data?.message || data?.error || "Failed to start video generation",
      });
    }

    const recordId = data?.data?.recordId || data?.recordId;
    if (!recordId) {
      return res.status(500).json({ success: false, error: "No record ID returned from API" });
    }

    return res.status(200).json({ success: true, recordId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).json({ success: false, error: message });
  }
}
