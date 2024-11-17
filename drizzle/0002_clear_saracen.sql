CREATE TABLE IF NOT EXISTS "company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "level" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions_to_companies" (
	"questionId" uuid NOT NULL,
	"companyId" uuid NOT NULL,
	CONSTRAINT "questions_to_companies_questionId_companyId_pk" PRIMARY KEY("questionId","companyId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions_to_levels" (
	"questionId" uuid NOT NULL,
	"levelId" uuid NOT NULL,
	CONSTRAINT "questions_to_levels_questionId_levelId_pk" PRIMARY KEY("questionId","levelId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions_to_technologies" (
	"questionId" uuid NOT NULL,
	"technologyId" uuid NOT NULL,
	CONSTRAINT "questions_to_technologies_questionId_technologyId_pk" PRIMARY KEY("questionId","technologyId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "technology" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions_to_companies" ADD CONSTRAINT "questions_to_companies_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions_to_companies" ADD CONSTRAINT "questions_to_companies_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions_to_levels" ADD CONSTRAINT "questions_to_levels_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions_to_levels" ADD CONSTRAINT "questions_to_levels_levelId_level_id_fk" FOREIGN KEY ("levelId") REFERENCES "public"."level"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions_to_technologies" ADD CONSTRAINT "questions_to_technologies_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions_to_technologies" ADD CONSTRAINT "questions_to_technologies_technologyId_technology_id_fk" FOREIGN KEY ("technologyId") REFERENCES "public"."technology"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
