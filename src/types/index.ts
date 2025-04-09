export enum Status {
  NEW = "NEW",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export type UrlRequest = {
  id: string;
  url: string;
  status: Status;
  http_code?: string;
};
