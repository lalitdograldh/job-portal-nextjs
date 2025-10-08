import { int, mysqlTable, text, varchar,timestamp } from 'drizzle-orm/mysql-core';
export const users = mysqlTable('users', {
  id: int("id").autoincrement().primaryKey(),
  name : varchar("name",{ length:255 }).notNull(),
  userName:varchar("username",{ length:255 }).unique(),
  email:varchar("email",{ length:255 }).notNull().unique(),
  password : text("password").notNull(),
  phoneNumber: varchar("phone_number",{ length: 255 }),
  deleteAt:timestamp("delete_at"),
  createdAt:timestamp("created_at").defaultNow().notNull(),
  updatedAt:timestamp("updated_at").defaultNow().onUpdateNow().notNull()
});