import type { NextApiRequest, NextApiResponse } from "next";

const KIE_API_BASE = "https://kieai.erweima.ai/api/v1";

export type VideoStatus = "pending" | "processing" | "success" | "failed";

export type StatusResponse =
  | { success: true; status: VideoStatus; videoUrl?: string; progress?: number }
  | { success: false; error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatusResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const apiKey = process.env.KIE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: "KIE_API_KEY is not configured" });
  }

  const { recordId } = req.query;
  if (!recordId || typeof recordId !== "string") {
    return res.status(400).json({ success: false, error: "recordId is required" });
  }

  try {
    const response = await fetch(`${KIE_API_BASE}/tasks/${recordId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data?.message || data?.error || "Failed to fetch task status",
      });
    }

    const taskData = data?.data || data;
    const status: VideoStatus = taskData?.status || "pending";
    const videoUrl: string | undefined =
      taskData?.videoUrl || taskData?.video_url || taskData?.url || undefined;
    const progress: number | undefined = taskData?.progress ?? undefined;

    return res.status(200).json({ success: true, status, videoUrl, progress });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).json({ success: false, error: message });
  }
}
