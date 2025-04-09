import "dotenv/config";

import { Worker, isMainThread } from "worker_threads";
import { fileURLToPath } from "url";
import path from "path";
import { client } from "#config/db";
import { getNewUrls } from "#services/url-request";

(async () => {
  await client.connect();
  const newUrls = await getNewUrls();
  if (isMainThread) {
    // Create 2 worker
    const workers = [];
    const results: number[] = [];

    // share URLs between the workers
    const chunkSize = Math.ceil(newUrls.length / 2);
    const chunks = [newUrls.slice(0, chunkSize), newUrls.slice(chunkSize)];

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const workerPath = path.join(__dirname, "worker.js");

    for (let i = 0; i < 2; i++) {
      const worker = new Worker(workerPath, {
        workerData: { newUrls: chunks[i] },
      });

      worker.on("message", (result) => {
        results.push(...result);
        if (results.length === newUrls.length) {
          console.log("All req competed:", results);
        }
      });

      worker.on("error", (err) => {
        console.error(`Error to worker ${i}:`, err);
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`Worker ${i} completed with error ${code}`);
        }
      });

      workers.push(worker);
    }
  }
})();
