import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleChat } from "./_lib/handler";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  await handleChat(req, res);
}
