import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";

const app = express();

app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("server is live"));
app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT = process.env.PORT || 5000;

// ✅ Fix for Vercel timeout
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
}

// ✅ Export app for Vercel serverless
export default app;
