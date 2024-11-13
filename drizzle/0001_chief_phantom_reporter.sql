CREATE TABLE IF NOT EXISTS "question_review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"userId" uuid,
	"status" varchar(32) DEFAULT 'pending',
	"message" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255),
	"body" text,
	"userId" uuid,
	"isAnonymous" boolean DEFAULT false,
	"status" varchar(32) DEFAULT 'pending',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_review" ADD CONSTRAINT "question_review_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_review" ADD CONSTRAINT "question_review_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question" ADD CONSTRAINT "question_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
