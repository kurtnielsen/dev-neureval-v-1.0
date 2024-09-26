ALTER TABLE "authors" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "authors" ADD COLUMN "is_admin" boolean DEFAULT false;