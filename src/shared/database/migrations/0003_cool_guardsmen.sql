CREATE TABLE "villages_likes" (
	"village_id" bigint,
	"profile_id" uuid,
	CONSTRAINT "villages_likes_village_id_profile_id_pk" PRIMARY KEY("village_id","profile_id")
);
--> statement-breakpoint
ALTER TABLE "villages_likes" ADD CONSTRAINT "villages_likes_village_id_villages_village_id_fk" FOREIGN KEY ("village_id") REFERENCES "public"."villages"("village_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "villages_likes" ADD CONSTRAINT "villages_likes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;