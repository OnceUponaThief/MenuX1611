-- ============================================
-- UPDATE DRINK CATEGORIES TO PROPER BAR TERMINOLOGY
-- Run this via Supabase SQL Editor or supabase db push
-- ============================================

-- Update Whiskey to IMFL
UPDATE menu_items SET category = 'imfl'
WHERE name IN (
  'BALLANTINES FINEST', 'BLACK & WHITE', 'J.W BLACK LABEL', 'J.W RED LABEL',
  'J.W DOUBLE BLACK', 'BLACK DOG TRIPLE GOLD', 'CHIVAS REGAL 12 YRS',
  'DEWARS 12YRS', 'DEWARS WHITE LABEL', 'MONKEY SHOULDER', 'OAKSMITH GOLD',
  'SUNTORY TOKI', 'TEACHER HIGHLAND', 'TEACHER 50', 'J B RARE',
  'JACK DANIELS', 'JIM BEAM', 'JAMESON IRISH WHISKEY', 'BUSHMILLS',
  'GLENFIDDICH 12YRS', 'GLENLIVET 12YRS', 'AMRUT FUSION',
  'INDRI SINGLE MALT', 'PAUL JOHN BRILLIANCE', 'PAUL JOHN BOLD'
);

-- Update Gin to IMFL
UPDATE menu_items SET category = 'imfl'
WHERE name IN (
  'GREATER THAN', 'GORDONS', 'BEEFEATER', 'BOMBAY SAPPHIRE',
  'TANQUERAY', 'JAISALMER'
);

-- Update Vodka to IMFL
UPDATE menu_items SET category = 'imfl'
WHERE name IN (
  'GREY GOOSE', 'ABSOLUTE', 'SMIRNOFF', 'SMIRNOFF FLAVOUR', 'KETEL ONE'
);

-- Update Rum to IMFL
UPDATE menu_items SET category = 'imfl'
WHERE name IN (
  'OLD MONK DARK', 'OLD MONK WHITE', 'BACARDI BLACK',
  'BACARDI CARTA BLANCA', 'BACARDI LIMON',
  'BACARDI LEMON CHILLI', 'BACARDI MANGO CHILLI'
);

-- Update Brandy to IMFL
UPDATE menu_items SET category = 'imfl'
WHERE name IN ('HONEY BEE', 'MANSON HOUSE');

-- Wine stays as 'wine' (already correct)

-- Update Liqueurs to 'liqueurs'
UPDATE menu_items SET category = 'liqueurs'
WHERE name IN (
  'JAGERMEISTER', 'SAMBUCA', 'KAHLUA', 'BAILEYS',
  'MARTINI BIANCO', 'MARTINI ROSSO', 'CAMPARI'
);

-- Update Cocktails to 'cocktails' (if not already)
UPDATE menu_items SET category = 'cocktails'
WHERE name IN (
  'KOKAN COASTAL BREEZE', 'ALPHONSO AFFAIRS', 'NAGPUR CITRUS SMASH',
  'MALVANI SMOKE', 'PUNE SPICE ROUTE', 'NASHIK VINEYARD SPRITZ',
  'KOLHAPURI HEATWAVE', 'SATARA BLOOM',
  'OLD FASHIONED', 'WHISKEY SOUR', 'MARGARITA', 'MOJITO',
  'COSMOPOLITAN', 'MANHATTAN', 'MAI TAI', 'ESPRESSO MARTINI'
);

-- Update Mocktails to 'mocktails'
UPDATE menu_items SET category = 'mocktails'
WHERE name IN (
  'ALIBAUGH DRIFTS', 'MIRCHI MIRAGE', 'MAHABALESHWAR FOGG',
  'KOKUM CLOUD', 'BASIL BAZAR', 'MARINE ILLUSION',
  'GOLDEN HALO', 'DECCAN DEW'
);

-- Update Shots to 'shots'
UPDATE menu_items SET category = 'shots'
WHERE name IN (
  'KOKUM HITMAN', 'KOLHAPUR KICK', 'AAMCHI AAG',
  'PUNE POISON', 'SAHYADRI SMORE', 'NAGPUR NITRO', 'GOA GONE WILD'
);

-- Update Breezers to 'breezers'
UPDATE menu_items SET category = 'breezers'
WHERE name IN (
  'BREEZER JAMAICAN', 'BREEZER CRANBERRY',
  'BREEZER BLUEBERRY', 'BREEZER MANGO'
);

-- Update Beer to 'beer'
UPDATE menu_items SET category = 'beer'
WHERE name IN (
  'KINGFISHER PREMIUM', 'KINGFISHER ULTRA', 'BUDWEISER PREMIUM',
  'BUDWEISER MAGNUM', 'CORONA', 'HOEGARDEN'
);

-- Show updated categories summary
SELECT
  category,
  COUNT(*) as item_count,
  STRING_AGG(name, ', ' ORDER BY name) as items
FROM menu_items
WHERE category IN ('imfl', 'wine', 'beer', 'liqueurs', 'cocktails', 'mocktails', 'shots', 'breezers')
GROUP BY category
ORDER BY 
  CASE category 
    WHEN 'imfl' THEN 1 
    WHEN 'beer' THEN 2 
    WHEN 'wine' THEN 3 
    WHEN 'liqueurs' THEN 4 
    WHEN 'cocktails' THEN 5 
    WHEN 'mocktails' THEN 6 
    WHEN 'shots' THEN 7 
    WHEN 'breezers' THEN 8 
  END;