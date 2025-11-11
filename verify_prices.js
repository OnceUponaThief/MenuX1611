// Script to verify updated prices
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

async function verifyPrices() {
  console.log("Verifying updated prices...");
  
  try {
    // Fetch all menu items (fresh data)
    const { data: menuItems, error: fetchError } = await supabase
      .from('menu_items')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (fetchError) {
      console.error("Error fetching menu items:", fetchError);
      return;
    }
    
    console.log(`Found ${menuItems.length} menu items`);
    
    // Check beer items
    const beerItems = menuItems.filter(item => 
      item.category.toLowerCase().includes('beer') || 
      item.name.toLowerCase().includes('beer')
    );
    
    console.log("\n=== BEER ITEMS (VERIFIED PRICES) ===");
    beerItems.forEach(item => {
      console.log(`${item.name} - Price: ₹${item.price}`);
    });
    
    // Check whiskey items
    const whiskeyItems = menuItems.filter(item => 
      item.category.toLowerCase().includes('whiskey') || 
      item.name.toLowerCase().includes('whiskey') ||
      item.category.toLowerCase().includes('whisky') || 
      item.name.toLowerCase().includes('whisky')
    );
    
    console.log("\n=== WHISKEY ITEMS (VERIFIED PRICES) ===");
    whiskeyItems.forEach(item => {
      console.log(`${item.name} - Price: ₹${item.price}`);
    });
    
    // Show items with very low prices (under ₹50) - should be minimal now
    const lowPriceItems = menuItems.filter(item => item.price < 50);
    console.log("\n=== ITEMS WITH LOW PRICES (UNDER ₹50) - SHOULD BE MINIMAL ===");
    lowPriceItems.forEach(item => {
      console.log(`${item.name} - Category: ${item.category} - Price: ₹${item.price}`);
    });
    
    console.log(`\nTotal items with low prices: ${lowPriceItems.length}`);
    
  } catch (error) {
    console.error("Error verifying prices:", error);
  }
}

// Run the verification function
verifyPrices();