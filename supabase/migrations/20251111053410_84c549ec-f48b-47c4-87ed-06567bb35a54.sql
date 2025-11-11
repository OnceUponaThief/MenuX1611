-- Create restaurant_settings table
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'My Restaurant',
  logo_url TEXT,
  currency_code TEXT NOT NULL DEFAULT 'USD',
  language_code TEXT NOT NULL DEFAULT 'en',
  timezone TEXT NOT NULL DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;

-- Public can view settings
CREATE POLICY "Anyone can view restaurant settings"
  ON public.restaurant_settings
  FOR SELECT
  USING (true);

-- Authenticated users can insert settings
CREATE POLICY "Authenticated users can insert settings"
  ON public.restaurant_settings
  FOR INSERT
  WITH CHECK (true);

-- Authenticated users can update settings
CREATE POLICY "Authenticated users can update settings"
  ON public.restaurant_settings
  FOR UPDATE
  USING (true);

-- Authenticated users can delete settings
CREATE POLICY "Authenticated users can delete settings"
  ON public.restaurant_settings
  FOR DELETE
  USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_restaurant_settings_updated_at
  BEFORE UPDATE ON public.restaurant_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert default settings row
INSERT INTO public.restaurant_settings (name, currency_code, language_code, timezone)
VALUES ('My Restaurant', 'USD', 'en', 'UTC');