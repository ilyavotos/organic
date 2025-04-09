import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    insert into url_requests(url)
      values
        ('https://example1.com'),
        ('https://google.com'),
        ('https://reddit.com'),
        ('https://example2.com'),
        ('https://example3.com');`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
