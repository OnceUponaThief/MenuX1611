// Script to check current menu items and their prices
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

async function checkMenuItems() {
  console.log("Checking current menu items and their prices...");
  
  try {
    // Fetch all menu items
    const { data: menuItems, error: fetchError } = await supabase
      .from('menu_items')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (fetchError) {
      console.error("Error fetching menu items:", fetchError);
      return;
    }
    
    console.log(`\nFound ${menuItems.length} menu items`);
    
    // Filter and display beer items
    const beerItems = menuItems.filter(item => 
      item.category.toLowerCase().includes('beer') || 
      item.name.toLowerCase().includes('beer')
    );
    
    console.log("\n=== BEER ITEMS ===");
    beerItems.forEach(item => {
      console.log(`${item.name} - Category: ${item.category} - Price: ₹${item.price}`);
    });
    
    // Filter and display whiskey items
    const whiskeyItems = menuItems.filter(item => 
      item.category.toLowerCase().includes('whiskey') || 
      item.name.toLowerCase().includes('whiskey') ||
      item.category.toLowerCase().includes('whisky') || 
      item.name.toLowerCase().includes('whisky')
    );
    
    console.log("\n=== WHISKEY ITEMS ===");
    whiskeyItems.forEach(item => {
      console.log(`${item.name} - Category: ${item.category} - Price: ₹${item.price}`);
    });
    
    // Filter and display other alcohol items
    const alcoholCategories = ['gin', 'vodka', 'rum', 'brandy', 'wine', 'cocktails'];
    const alcoholItems = menuItems.filter(item => 
      alcoholCategories.some(cat => 
        item.category.toLowerCase().includes(cat) || 
        item.name.toLowerCase().includes(cat)
      )
    );
    
    console.log("\n=== OTHER ALCOHOL ITEMS ===");
    alcoholItems.forEach(item => {
      console.log(`${item.name} - Category: ${item.category} - Price: ₹${item.price}`);
    });
    
    // Show items with very low prices (under ₹50)
    const lowPriceItems = menuItems.filter(item => item.price < 50);
    console.log("\n=== ITEMS WITH LOW PRICES (UNDER ₹50) ===");
    lowPriceItems.forEach(item => {
      console.log(`${item.name} - Category: ${item.category} - Price: ₹${item.price}`);
    });
    
  } catch (error) {
    console.error("Error checking menu items:", error);
  }
}

// Run the check function
checkMenuItems();