-- SQL Blueprint for Bumek Supabase Database

-- 1. Create Materials Table
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price_per_unit DECIMAL(10, 2),
  unit TEXT, -- e.g., "bag", "ton", "meter"
  category TEXT, -- e.g., "cement", "steel", "timber"
  image_url TEXT,
  status TEXT DEFAULT 'IN STOCK',
  tag TEXT, -- e.g., "NEW", "BULK"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Services Table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Quotes/Orders Table
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  material_id UUID REFERENCES materials(id),
  quantity DECIMAL,
  location TEXT,
  status TEXT DEFAULT 'PENDING', -- PENDING, MATCHED, DELIVERED, CANCELLED
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies
-- Allow anyone to read materials/services
CREATE POLICY "Allow public read access" ON materials FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);

-- Allow anyone to submit a quote
CREATE POLICY "Allow public quote submission" ON quotes FOR INSERT WITH CHECK (true);

-- Allow only authenticated (Admin) to read/update/delete everything
CREATE POLICY "Allow admin full access" ON materials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON quotes FOR ALL USING (auth.role() = 'authenticated');
