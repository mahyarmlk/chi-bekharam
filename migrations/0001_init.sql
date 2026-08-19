CREATE TABLE IF NOT EXISTS recommendation_queries (
  id TEXT PRIMARY KEY,
  query TEXT NOT NULL,
  intent_json TEXT,
  result_json TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS outbound_clicks (
  id TEXT PRIMARY KEY,
  query_id TEXT,
  product_slug TEXT NOT NULL,
  position INTEGER,
  destination TEXT NOT NULL DEFAULT 'digikala',
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_queries_created_at ON recommendation_queries(created_at);
CREATE INDEX IF NOT EXISTS idx_clicks_product ON outbound_clicks(product_slug);
CREATE INDEX IF NOT EXISTS idx_clicks_created_at ON outbound_clicks(created_at);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  source_id TEXT UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  brand TEXT,
  category TEXT NOT NULL,
  price INTEGER,
  old_price INTEGER,
  available INTEGER NOT NULL DEFAULT 1,
  rating REAL,
  rating_count INTEGER,
  image_url TEXT,
  source_url TEXT,
  specs_json TEXT,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
