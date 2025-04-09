import { MigrationBuilder, PgType } from "node-pg-migrate";
import { Status } from "#types/index";

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable("url_requests", {
    id: {
      type: PgType.UUID,
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    url: { type: PgType.TEXT, notNull: true },
    status: { type: PgType.TEXT, notNull: true, default: Status.NEW },
    http_code: { type: PgType.INT2 },
  });

  pgm.createIndex("url_requests", "status");
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable("url_requests");
};
