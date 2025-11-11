// Script to generate SQL update commands for alcohol prices
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// Updated prices for premium bars in Hinjewadi Pune (in INR)
// Format: { name: "item_name", newPrice: new_price }
const updatedPrices = [
  // Beer - Premium pricing for Hinjewadi bars
  { name: "BUDWEISER PREMIUM", newPrice: 450 },
  { name: "BUDWEISER MAGNUM", newPrice: 450 },
  { name: "KINGFISHER PREMIUN", newPrice: 400 },
  { name: "KINGFISHER ULTRA", newPrice: 400 },
  { name: "CORONA", newPrice: 500 },
  { name: "HOEGARDEN", newPrice: 550 },
  
  // Whiskey - Premium pricing
  { name: "BALLANTINES FINEST", newPrice: 850 },
  { name: "BLACK & WHITE", newPrice: 900 },
  { name: "CHIVAS REGAL 12 YRS", newPrice: 1200 },
  { name: "DEWARS 12YRS", newPrice: 1100 },
  { name: "DEWARS WHITE LABEL", newPrice: 1100 },
  { name: "GLENFIDDICH 12YRS", newPrice: 1500 },
  { name: "GLENLIVET 12YRS", newPrice: 1500 },
  { name: "INDRI SINGLE MALT", newPrice: 1200 },
  { name: "J & B RARE", newPrice: 1100 },
  { name: "J.W BLACK LABEL", newPrice: 1300 },
  { name: "J.W RED LABEL", newPrice: 1300 },
  { name: "J.W DOUBLE BLACK", newPrice: 1300 },
  { name: "JACK DANIELS", newPrice: 1400 },
  { name: "JAMESON IRISH WHISKEY", newPrice: 1100 },
  { name: "JIM BEAN", newPrice: 900 },
  { name: "MONKEY SHOULDER", newPrice: 1300 },
  { name: "OAKSMITH GOLD", newPrice: 1150 },
  { name: "PAUL JOHN BRILLIANCE", newPrice: 1400 },
  { name: "PAUL JOHN BOLD", newPrice: 1400 },
  { name: "SUNTORY TOKI", newPrice: 1200 },
  { name: "TEACHER HIGHLAND", newPrice: 800 },
  { name: "TEACHER 50", newPrice: 800 },
  { name: "AMRUT FUSION", newPrice: 1300 },
  { name: "BLACK GOD TRIPTW GOLD", newPrice: 1600 },
  { name: "BUSHMILLS", newPrice: 1100 },
  
  // Gin - Premium pricing
  { name: "BEEFEATER", newPrice: 750 },
  { name: "BOMBAY SAPPHIRE", newPrice: 800 },
  { name: "GORDONS", newPrice: 700 },
  { name: "GREATER THAN", newPrice: 750 },
  { name: "JAISALMER", newPrice: 900 },
  { name: "TANQUERY", newPrice: 850 },
  
  // Vodka - Premium pricing
  { name: "ABSOLUTE", newPrice: 700 },
  { name: "GREY GOOSE", newPrice: 1200 },
  { name: "KETEL ONE", newPrice: 1000 },
  { name: "SMIRNOFF", newPrice: 650 },
  { name: "SMIRNOFF FLAVOUR", newPrice: 650 },
  
  // Rum - Premium pricing
  { name: "BACARDI BLACK", newPrice: 650 },
  { name: "BACARDI CARTA BLANCA", newPrice: 650 },
  { name: "BACARDI LIMON", newPrice: 650 },
  { name: "BACARDI LEMON CHILLI", newPrice: 650 },
  { name: "BACARDI MANGO CHILLI", newPrice: 650 },
  { name: "OLD MONK DARK", newPrice: 800 },
  { name: "OLD MONK WHITE", newPrice: 800 },
  
  // Brandy - Premium pricing
  { name: "HONEY BEE", newPrice: 750 },
  { name: "MANSON HOUSE", newPrice: 800 },
  
  // Wine - Premium pricing
  { name: "WHITE WINE", newPrice: 600 },
  { name: "RED WINE", newPrice: 650 },
  { name: "NOI SPARKLING", newPrice: 800 },
  { name: "CHANDON BRUT", newPrice: 700 },
  { name: "FRATELLI CLASSIC SHIRAZ", newPrice: 650 },
  { name: "FRATELLI MERLOT", newPrice: 650 },
  { name: "FRATELLI SAUVIGNON BLANC", newPrice: 650 },
  { name: "FRATELLI ROSE", newPrice: 650 },
  { name: "JACOBS CREEK CHARDONY", newPrice: 600 },
  { name: "JACOBS CREEK SHIRAZ", newPrice: 600 },
  { name: "SULA SATORI", newPrice: 650 },
  { name: "SULA CABERNET SHIRAZ", newPrice: 650 },
  { name: "SULA CHENIN BLANC", newPrice: 650 },
  { name: "SULA ZINDFINDEL ROSE", newPrice: 650 },
  { name: "SULA BRUT", newPrice: 650 },
  { name: "SULA SECO ROSE", newPrice: 650 },
  
  // Cocktails - Premium pricing
  { name: "WHISKEY SOUR", newPrice: 600 },
  { name: "COSMOPOLIATAN", newPrice: 650 },
  { name: "ESSPRESSO MARTINI", newPrice: 700 },
  { name: "MOJITO", newPrice: 600 },
  { name: "MARGARITA", newPrice: 650 },
  { name: "MANHATTAN", newPrice: 700 },
  { name: "OLD FASHIONED", newPrice: 600 },
  { name: "MAI TAI", newPrice: 550 },
  { name: "ALPHONSO AFFAIRS [RATNAGIRI REGION]", newPrice: 600 },
  { name: "KOKAN COASTAL BREEZE [KOKAN REIGION]", newPrice: 600 },
  { name: "KOLHAPURI HEATWAVE [KOLHAPURI]", newPrice: 600 },
  { name: "MALVANI SMOKE [MALVAN REGION]", newPrice: 600 },
  { name: "NAGPUR CITRUS SMASH [NAGPUR REGION]", newPrice: 600 },
  { name: "NASHIK VINEYARD SPRITZ [NASHIK REGION]", newPrice: 600 },
  { name: "PUNE SPICE ROUTE [PUNE REGION]", newPrice: 600 },
  { name: "SATARA BLOOM [SATARA/KASS PATHAR REGION]", newPrice: 600 },
  
  // Liqueur - Premium pricing
  { name: "BAILEYS", newPrice: 600 },
  { name: "CAMPARI", newPrice: 550 },
  { name: "JAGERMEISTER", newPrice: 650 },
  { name: "KAHLUA", newPrice: 600 },
  { name: "MARTINI BIANCO", newPrice: 550 },
  { name: "MARTINI ROSSO", newPrice: 550 },
  { name: "SAMBUCA", newPrice: 600 },
  
  // Shots - Premium pricing
  { name: "AAMCHI AAG", newPrice: 300 },
  { name: "GOA GONE WILD", newPrice: 350 },
  { name: "KOKUM HITMAN", newPrice: 300 },
  { name: "KOLHAPUR KICK", newPrice: 300 },
  { name: "NAGPUR NITRO", newPrice: 300 },
  { name: "PUNE POISION", newPrice: 300 },
  { name: "SAHYADRI SMORE", newPrice: 300 },
  
  // Mocktails - Premium pricing
  { name: "ALIBAUGH DRIFTS", newPrice: 250 },
  { name: "BASIL BAZAR", newPrice: 250 },
  { name: "DECCAN DEW", newPrice: 250 },
  { name: "GOLDEN HALO", newPrice: 250 },
  { name: "KOKUM CLOUD", newPrice: 250 },
  { name: "MAHABALESHWAR FODD", newPrice: 250 },
  { name: "MARINE ILLUSION", newPrice: 250 },
  { name: "MIRCHI MIRAGE", newPrice: 250 },
  
  // Breezer - Premium pricing
  { name: "BLUEBERRY", newPrice: 300 },
  { name: "CRANBERRY", newPrice: 300 },
  { name: "JAMAICAN", newPrice: 300 },
  { name: "MANGO", newPrice: 300 },
];

async function generateSQLUpdates() {
  console.log("-- SQL commands to update alcohol prices to local rates in Hinjewadi Pune\n");
  
  try {
    // Fetch all menu items
    const { data: menuItems, error: fetchError } = await supabase
      .from('menu_items')
      .select('id, name, price');
    
    if (fetchError) {
      console.error("Error fetching menu items:", fetchError);
      return;
    }
    
    console.log(`-- Found ${menuItems.length} menu items\n`);
    
    // Create a map of item names to IDs for quick lookup
    const itemMap = {};
    menuItems.forEach(item => {
      itemMap[item.name] = { id: item.id, currentPrice: item.price };
    });
    
    let updateCount = 0;
    
    // Generate SQL update commands for matching items
    for (const priceUpdate of updatedPrices) {
      const item = itemMap[priceUpdate.name];
      
      if (item) {
        console.log(`UPDATE menu_items SET price = ${priceUpdate.newPrice} WHERE id = '${item.id}'; -- ${priceUpdate.name}: ₹${item.currentPrice} → ₹${priceUpdate.newPrice}`);
        updateCount++;
      } else {
        // Try partial match for items with special characters
        const partialMatches = Object.keys(itemMap).filter(name => 
          name.includes(priceUpdate.name) || priceUpdate.name.includes(name)
        );
        
        if (partialMatches.length > 0) {
          const matchedName = partialMatches[0];
          const matchedItem = itemMap[matchedName];
          console.log(`UPDATE menu_items SET price = ${priceUpdate.newPrice} WHERE id = '${matchedItem.id}'; -- ${matchedName}: ₹${matchedItem.currentPrice} → ₹${priceUpdate.newPrice} (partial match for "${priceUpdate.name}")`);
          updateCount++;
        } else {
          console.log(`-- Item not found: "${priceUpdate.name}"`);
        }
      }
    }
    
    console.log(`\n-- Total items to update: ${updateCount}`);
    
  } catch (error) {
    console.error("Error generating SQL updates:", error.message);
  }
}

// Run the function
generateSQLUpdates();