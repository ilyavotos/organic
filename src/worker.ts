import { updateUrl } from "#services/url-request";
import { workerData, parentPort } from "worker_threads";
import { Status } from "#types/index";
import { client } from "#config/db";

const fetchUrl = async (url: string): Promise<number> => {
  try {
    const response = await fetch(url);
    return response.status;
  } catch (error) {
    return 500;
  }
};

(async () => {
  const { newUrls } = workerData;
  const results = [];
  await client.connect();
  for (const newUrl of newUrls) {
    const { id, url } = newUrl;
    try {
      await updateUrl(Status.PROCESSING, id);
      const responseStatus = await fetchUrl(url);
      await updateUrl(
        responseStatus === 500 ? Status.ERROR : Status.DONE,
        id,
        responseStatus,
      );
      results.push(responseStatus);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  parentPort?.postMessage(results);
})();
