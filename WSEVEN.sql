CREATE TYPE "subscription_type" AS ENUM (
  'free',
  'monthly',
  'yearly'
);

CREATE TABLE "customers" (
  "id" uuid PRIMARY KEY,
  "name" string,
  "email" string,
  "email_verified_at" timestamp,
  "password" string,
  "claim_token" string,
  "claim_token_issued_at" string,
  "refresh_token" string,
  "refresh_token_issued_at" string,
  "claimed_at" string,
  "remember_token" string,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "matches" (
  "id" uuid PRIMARY KEY,
  "sport_id" uuid,
  "type" integer,
  "date_start" datetime,
  "date_end" datetime,
  "is_daily" boolean,
  "display" boolean,
  "image" string,
  "tv_channel_id" [null],
  "home" uuid,
  "away" uuid,
  "league" uuid,
  "additional_infos" json,
  "location" string,
  "weather" uuid,
  "field_type" string,
  "home_score" integer,
  "away_score" integer,
  "is_ot" boolean,
  "is_after_penalties" boolean
);

CREATE TABLE "analyses" (
  "id" uuid PRIMARY KEY,
  "match_id" uuid,
  "is_premium" boolean,
  "content" text
);

CREATE TABLE "tips" (
  "id" uuid PRIMARY KEY,
  "match_id" uuid,
  "odds" float,
  "level" integer,
  "unit" integer,
  "is_premium" boolean,
  "title" string,
  "is_winner" boolean
);

CREATE TABLE "customer_tips" (
  "id" uuid PRIMARY KEY,
  "customer_id" uuid,
  "tips_id" uuid,
  "odds" float,
  "bet" float
);

CREATE TABLE "sports" (
  "id" uuid PRIMARY KEY,
  "name" string,
  "color" string
);

CREATE TABLE "weathers" (
  "id" uuid PRIMARY KEY,
  "name" string,
  "icon" string
);

CREATE TABLE "leagues" (
  "id" uuid PRIMARY KEY,
  "name" string,
  "image" string
);

CREATE TABLE "teams" (
  "id" uuid PRIMARY KEY,
  "name" string,
  "logo" string
);

CREATE TABLE "team_datas" (
  "id" uuid PRIMARY KEY,
  "team_id" uuid,
  "key" string,
  "value" string
);

CREATE TABLE "players" (
  "id" uuid PRIMARY KEY,
  "type" string,
  "image" string,
  "first_name" string NOT NULL,
  "last_name" string NOT NULL
);

CREATE TABLE "player_datas" (
  "id" uuid PRIMARY KEY,
  "player_id" uuid,
  "key" string,
  "value" string
);

CREATE TABLE "tv_channels" (
  "id" uuid,
  "name" string,
  "logo" string
);

CREATE TABLE "subscription_prices" (
  "id" uuid PRIMARY KEY,
  "subscription_type" type,
  "price" float,
  "currency" string,
  "discount_price" float
);

CREATE TABLE "subscriptions" (
  "id" uuid PRIMARY KEY,
  "customer_id" uuid,
  "subscription_prices_id" uuid,
  "start_date" datetime,
  "expiration_date" datetime,
  "type" subscription_type
);

ALTER TABLE "sports" ADD FOREIGN KEY ("id") REFERENCES "matches" ("sport_id");

ALTER TABLE "tv_channels" ADD FOREIGN KEY ("id") REFERENCES "matches" ("tv_channel_id");

ALTER TABLE "teams" ADD FOREIGN KEY ("id") REFERENCES "matches" ("home");

ALTER TABLE "players" ADD FOREIGN KEY ("id") REFERENCES "matches" ("home");

ALTER TABLE "teams" ADD FOREIGN KEY ("id") REFERENCES "matches" ("away");

ALTER TABLE "players" ADD FOREIGN KEY ("id") REFERENCES "matches" ("away");

ALTER TABLE "leagues" ADD FOREIGN KEY ("id") REFERENCES "matches" ("league");

ALTER TABLE "weathers" ADD FOREIGN KEY ("id") REFERENCES "matches" ("weather");

ALTER TABLE "matches" ADD FOREIGN KEY ("id") REFERENCES "analyses" ("match_id");

ALTER TABLE "matches" ADD FOREIGN KEY ("id") REFERENCES "tips" ("match_id");

ALTER TABLE "customers" ADD FOREIGN KEY ("id") REFERENCES "customer_tips" ("customer_id");

ALTER TABLE "tips" ADD FOREIGN KEY ("id") REFERENCES "customer_tips" ("tips_id");

ALTER TABLE "teams" ADD FOREIGN KEY ("id") REFERENCES "team_datas" ("team_id");

ALTER TABLE "players" ADD FOREIGN KEY ("id") REFERENCES "player_datas" ("player_id");

ALTER TABLE "customers" ADD FOREIGN KEY ("id") REFERENCES "subscriptions" ("customer_id");

ALTER TABLE "subscription_prices" ADD FOREIGN KEY ("id") REFERENCES "subscriptions" ("subscription_prices_id");
