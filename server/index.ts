import express, { Express, Request, Response, Router } from "express";
import path from "path";
import { Pool } from "pg";
// import { Plot } from "@stdlib/plot/ctor";
import mean from "@stdlib/stats/base/mean";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.use(express.json())
const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});


router.use(express.static(path.join(__dirname, "../public")));

interface BuildLog {
  id: number;
  repo: string;
  status: "success" | "pending" | "error";
  duration: number;
  date: string;
}

router.get("/api/builds", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM builds");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching builds:", err);
    res.status(500).send("Server error");
  }
});

router.get("/api/stats", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM builds");
    const logs: BuildLog[] = result.rows;

    if (logs.length === 0) {
      res.json({ successRate: "0.00", avgDuration: "0.00" });
      return;
    }

    const statuses: number[] = logs.map((log) =>
      log.status === "success" ? 1 : 0
    );
    const durations: number[] = logs.map((log) => log.duration);
    const successRate: number = mean(statuses.length, statuses, 1) * 100;
    const avgDuration: number = mean(durations.length, durations, 1);

    // const plot = new Plot({
    //   x: logs.map((log) => log.date),
    //   y: durations,
    //   type: "bar",
    //   title: "Build Durations Over Time",
    //   xLabel: "Date",
    //   yLabel: "Duration (s)",
    // });
    // console.log(plot.render());

    res.json({
      successRate: successRate.toFixed(2),
      avgDuration: avgDuration.toFixed(2),
    });
  } catch (err) {
    console.error("Error generating stats:", err);
    res.status(500).send("Server error");
  }
});

const PORT: number | string = process.env.PORT || 3000;
app.use(router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
