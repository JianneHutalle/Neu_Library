import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const visitorStatusEnum = pgEnum("visitor_status", ["time_in", "time_out", "blocked"]);
export const visitorTypeEnum = pgEnum("visitor_type", ["student", "teacher", "staff"]);

export const visitorsTable = pgTable("visitors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  program: text("program").notNull().default("N/A"),
  reason: text("reason").notNull(),
  college: text("college").notNull().default("N/A"),
  visitorType: visitorTypeEnum("visitor_type").notNull().default("student"),
  status: visitorStatusEnum("status").notNull().default("time_in"),
  timeIn: timestamp("time_in").notNull().defaultNow(),
  timeOut: timestamp("time_out"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertVisitorSchema = createInsertSchema(visitorsTable).omit({
  id: true, createdAt: true, timeIn: true, timeOut: true, status: true,
});
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type Visitor = typeof visitorsTable.$inferSelect;
