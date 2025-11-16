-- Insert and update Alcohol items mapped to existing schema used by the app
-- This migration aligns categories and fields with current frontend expectations
-- Fields used: name, description, price, category, image_url, available, modifiers (JSONB), dietary_preferences (JSONB)

-- NOTE: Prices are set to 0 initially. Use update_alcohol_prices.js to set local rates afterward.

WITH new_items AS (
  SELECT * FROM (
    VALUES
    -- Blended / Standard Whiskeys
    ('BALLANTINES FINEST',         'Classic blended Scotch whiskey',           'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('BLACK & WHITE',              'Iconic blended Scotch',                    'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('J.W BLACK LABEL',            'Premium blended Scotch whiskey',           'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('J.W RED LABEL',              'Classic Johnnie Walker blend',             'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('J.W DOUBLE BLACK',           'Intense smoky blend',                      'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('CHIVAS REGAL 12 YRS',        'Smooth 12-year aged Scotch',               'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('DEWARS 12YRS',               '12-year aged blend',                       'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('DEWARS WHITE LABEL',         'Smooth blended Scotch',                    'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('MONKEY SHOULDER',            'Triple malt Scotch whisky',                'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('OAKSMITH GOLD',              'Indian blended whiskey',                    'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('SUNTORY TOKI',               'Japanese whisky blend',                     'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('TEACHER HIGHLAND',           'Highland blended Scotch',                   'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('TEACHER 50',                 'Classic Teachers blend',                    'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('J & B RARE',                 'J&B Rare blended Scotch',                   'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),

    -- American & Irish
    ('JACK DANIELS',               'Tennessee whiskey',                         'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('JIM BEAN',                   'Kentucky straight bourbon',                 'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('JAMESON IRISH WHISKEY',      'Triple-distilled Irish whiskey',            'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('BUSHMILLS',                  'Irish single malt whiskey',                 'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),

    -- Single Malts
    ('GLENFIDDICH 12YRS',          'Speyside single malt',                      'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('GLENLIVET 12YRS',            'Classic Speyside malt',                     'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('AMRUT FUSION',               'Indian single malt fusion',                 'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('INDRI SINGLE MALT',          'Indian single malt',                        'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('PAUL JOHN BRILLIANCE',       'Indian single malt',                        'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),
    ('PAUL JOHN BOLD',             'Bold Indian single malt',                   'whiskey', '[{"id":"30ml","name":"30ml","price":0},{"id":"60ml","name":"60ml","price":0},{"id":"90ml","name":"90ml","price":0}]'::jsonb),

    -- GIN
    ('GREATER THAN',               'Indian craft gin',                          'gin',     '[]'::jsonb),
    ('GORDONS',                    'Classic London dry gin',                    'gin',     '[]'::jsonb),
    ('BEEFEATER',                  'London dry gin',                            'gin',     '[]'::jsonb),
    ('BOMBAY SAPPHIRE',            'Premium London dry gin',                    'gin',     '[]'::jsonb),
    ('TANQUERY',                   'Premium London dry gin',                    'gin',     '[]'::jsonb),
    ('JAISALMER',                  'Indian craft gin',                          'gin',     '[]'::jsonb),

    -- VODKA
    ('GREY GOOSE',                 'Premium French vodka',                      'vodka',   '[]'::jsonb),
    ('ABSOLUTE',                   'Swedish vodka',                             'vodka',   '[]'::jsonb),
    ('SMIRNOFF',                   'Classic vodka',                             'vodka',   '[]'::jsonb),
    ('SMIRNOFF FLAVOUR',           'Flavored vodka',                            'vodka',   '[]'::jsonb),
    ('KETEL ONE',                  'Premium Dutch vodka',                       'vodka',   '[]'::jsonb),

    -- WINE (Red)
    ('SULA SATORI',                'Indian red wine blend',                     'wine',    '[]'::jsonb)
  ) AS v(name, description, category, modifiers)
)
-- 1) Insert any missing rows
INSERT INTO public.menu_items (name, description, price, category, image_url, available, modifiers, dietary_preferences)
SELECT ni.name, ni.description, 0, ni.category, NULL, true, ni.modifiers, '[]'::jsonb
FROM new_items ni
LEFT JOIN public.menu_items mi ON mi.name = ni.name
WHERE mi.id IS NULL;

-- 2) Update rows that already exist
UPDATE public.menu_items mi
SET description = ni.description,
    category    = ni.category,
    modifiers   = ni.modifiers,
    available   = COALESCE(mi.available, true)
FROM new_items ni
WHERE mi.name = ni.name;