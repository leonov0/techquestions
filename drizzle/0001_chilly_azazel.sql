ALTER TABLE "account" ALTER COLUMN "type" SET DATA TYPE varchar(8);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" varchar(32);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" varchar(32) DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");