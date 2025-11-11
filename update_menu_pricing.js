// Script to update menu item pricing based on Hinjewadi pubs and bars
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.log('VITE_SUPABASE_URL:', supabaseUrl);
  console.log('VITE_SUPABASE_PUBLISHABLE_KEY:', supabaseAnonKey ? 'Found' : 'Not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Typical pricing for pubs and bars in Hinjewadi (in INR)
const pricingGuide = {
  // Whiskey
  'Blended Scotch Whiskey': 800,
  'Single Malt Scotch Whiskey': 1200,
  'Irish Whiskey': 900,
  'American Whiskey': 850,
  'Japanese Whiskey': 1500,
  
  // Gin
  'London Dry Gin': 600,
  'Premium Gin': 800,
  'Craft Gin': 900,
  
  // Vodka
  'Standard Vodka': 500,
  'Premium Vodka': 700,
  'Flavored Vodka': 650,
  
  // Rum
  'White Rum': 450,
  'Dark Rum': 500,
  'Premium Rum': 750,
  
  // Brandy
  'VS Brandy': 600,
  'VSOP Brandy': 800,
  'XO Brandy': 1200,
  
  // Beer
  'Domestic Beer': 250,
  'Craft Beer': 350,
  'Imported Beer': 450,
  
  // Wine
  'House Wine': 400,
  'Premium Wine': 800,
  'Sparkling Wine': 600,
  
  // Cocktails
  'Classic Cocktail': 400,
  'Premium Cocktail': 600,
  'Signature Cocktail': 700,
  
  // Appetizers
  'Starters': 250,
  'Finger Foods': 200,
  'Snacks': 150,
  
  // Main Course
  'Main Dish': 400,
  'Premium Main': 600,
  'Specialty Dish': 750,
  
  // Desserts
  'Dessert': 200,
  'Premium Dessert': 300,
  
  // Soup
  'Soup': 150,
  
  // Rice
  'Rice Dish': 200,
  
  // Noodles
  'Noodles': 250,
  
  // Dal
  'Dal': 150,
  
  // Bread
  'Bread': 50
};

async function updateMenuPricing() {
  try {
    console.log('Fetching menu items...');
    
    // Fetch all menu items
    const { data: menuItems, error } = await supabase
      .from('menu_items')
      .select('*');
    
    if (error) {
      console.error('Error fetching menu items:', error.message);
      return;
    }
    
    console.log(`Found ${menuItems.length} menu items`);
    
    // Update pricing for each item based on category
    let updatedCount = 0;
    for (const item of menuItems) {
      let newPrice = item.price; // Default to current price
      
      // Update based on category or item name
      if (item.category.toLowerCase().includes('whiskey') || item.name.toLowerCase().includes('whiskey')) {
        if (item.name.toLowerCase().includes('single malt')) {
          newPrice = 1200;
        } else if (item.name.toLowerCase().includes('irish')) {
          newPrice = 900;
        } else if (item.name.toLowerCase().includes('american')) {
          newPrice = 850;
        } else if (item.name.toLowerCase().includes('japanese')) {
          newPrice = 1500;
        } else {
          newPrice = 800; // Blended Scotch
        }
      } else if (item.category.toLowerCase().includes('gin') || item.name.toLowerCase().includes('gin')) {
        if (item.name.toLowerCase().includes('premium') || item.name.toLowerCase().includes('craft')) {
          newPrice = 800;
        } else {
          newPrice = 600;
        }
      } else if (item.category.toLowerCase().includes('vodka') || item.name.toLowerCase().includes('vodka')) {
        if (item.name.toLowerCase().includes('premium')) {
          newPrice = 700;
        } else if (item.name.toLowerCase().includes('flavored')) {
          newPrice = 650;
        } else {
          newPrice = 500;
        }
      } else if (item.category.toLowerCase().includes('rum') || item.name.toLowerCase().includes('rum')) {
        if (item.name.toLowerCase().includes('dark')) {
          newPrice = 500;
        } else if (item.name.toLowerCase().includes('premium')) {
          newPrice = 750;
        } else {
          newPrice = 450;
        }
      } else if (item.category.toLowerCase().includes('brandy') || item.name.toLowerCase().includes('brandy')) {
        if (item.name.toLowerCase().includes('xo')) {
          newPrice = 1200;
        } else if (item.name.toLowerCase().includes('vsop')) {
          newPrice = 800;
        } else {
          newPrice = 600;
        }
      } else if (item.category.toLowerCase().includes('beer') || item.name.toLowerCase().includes('beer')) {
        if (item.name.toLowerCase().includes('craft')) {
          newPrice = 350;
        } else if (item.name.toLowerCase().includes('imported')) {
          newPrice = 450;
        } else {
          newPrice = 250;
        }
      } else if (item.category.toLowerCase().includes('wine') || item.name.toLowerCase().includes('wine')) {
        if (item.name.toLowerCase().includes('premium')) {
          newPrice = 800;
        } else if (item.name.toLowerCase().includes('sparkling')) {
          newPrice = 600;
        } else {
          newPrice = 400;
        }
      } else if (item.category.toLowerCase().includes('cocktail') || item.name.toLowerCase().includes('cocktail')) {
        if (item.name.toLowerCase().includes('premium')) {
          newPrice = 600;
        } else if (item.name.toLowerCase().includes('signature')) {
          newPrice = 700;
        } else {
          newPrice = 400;
        }
      } else if (item.category.toLowerCase().includes('appetizer') || item.category.toLowerCase().includes('starter')) {
        newPrice = 250;
      } else if (item.category.toLowerCase().includes('main') || item.category.toLowerCase().includes('course')) {
        if (item.name.toLowerCase().includes('premium') || item.name.toLowerCase().includes('specialty')) {
          newPrice = 600;
        } else {
          newPrice = 400;
        }
      } else if (item.category.toLowerCase().includes('dessert')) {
        if (item.name.toLowerCase().includes('premium')) {
          newPrice = 300;
        } else {
          newPrice = 200;
        }
      } else if (item.category.toLowerCase().includes('soup')) {
        newPrice = 150;
      } else if (item.category.toLowerCase().includes('rice')) {
        newPrice = 200;
      } else if (item.category.toLowerCase().includes('noodles')) {
        newPrice = 250;
      } else if (item.category.toLowerCase().includes('dal')) {
        newPrice = 150;
      } else if (item.category.toLowerCase().includes('bread')) {
        newPrice = 50;
      }
      
      // Update the item if price has changed
      if (newPrice !== item.price) {
        const { error: updateError } = await supabase
          .from('menu_items')
          .update({ price: newPrice })
          .eq('id', item.id);
        
        if (updateError) {
          console.error(`Error updating ${item.name}:`, updateError.message);
        } else {
          console.log(`Updated ${item.name} from ₹${item.price} to ₹${newPrice}`);
          updatedCount++;
        }
      }
    }
    
    console.log(`Menu pricing update completed! Updated ${updatedCount} items.`);
  } catch (error) {
    console.error('Error updating menu pricing:', error.message);
  }
}

// Run the update
updateMenuPricing();