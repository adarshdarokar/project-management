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

// ✅ Only run locally
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
}

// ✅ Let Vercel handle this automatically
export default app;
