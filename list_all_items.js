// Script to list all menu items with their IDs for accurate updating
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

async function listAllItems() {
  console.log("Listing all menu items...");
  
  try {
    // Fetch all menu items
    const { data: menuItems, error: fetchError } = await supabase
      .from('menu_items')
      .select('id, name, category, price')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (fetchError) {
      console.error("Error fetching menu items:", fetchError);
      return;
    }
    
    console.log(`Found ${menuItems.length} menu items`);
    
    // Group by category
    const categories = {};
    menuItems.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    
    // Display items by category
    for (const [category, items] of Object.entries(categories)) {
      console.log(`\n=== ${category.toUpperCase()} ===`);
      items.forEach(item => {
        console.log(`ID: ${item.id} | ${item.name} | ₹${item.price}`);
      });
    }
    
  } catch (error) {
    console.error("Error listing menu items:", error);
  }
}

// Run the function
listAllItems();