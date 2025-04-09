import { Status, UrlRequest } from "#types/index";
import { client } from "#config/db";
import pg from "pg";

export const updateUrl = async (
  status: string,
  id: string,
  http_code?: number,
) => {
  await client.query<UrlRequest>(
    "UPDATE url_requests SET status = $1, http_code = $3 WHERE id = $2",
    [status, id, http_code],
  );
};

export const getNewUrls = async (): Promise<UrlRequest[]> => {
  const results = await client.query<UrlRequest>(
    "SELECT * FROM url_requests WHERE status = $1 ORDER BY id",
    [Status.NEW],
  );
  return results.rows;
};
