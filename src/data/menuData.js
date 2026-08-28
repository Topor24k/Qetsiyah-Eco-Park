// Food Menu Database extracted from 9 Scanned Menu Boards
export const menuCategories = [
  { id: 'all', name: 'All Dishes', icon: '🍽️' },
  { id: 'beef', name: 'Beef Meals', icon: '🥩' },
  { id: 'chicken', name: 'Chicken Meals', icon: '🍗' },
  { id: 'combo', name: 'Combo Meals', icon: '🍱' },
  { id: 'sizzling', name: 'Sizzling & Grill', icon: '🥘' },
  { id: 'soup', name: 'Soup & Native', icon: '🍲' },
  { id: 'pasta', name: 'Pasta & Noodles', icon: '🍝' },
  { id: 'short', name: 'Short Orders', icon: '🍜' },
  { id: 'snacks', name: 'Snacks & Burgers', icon: '🥪' },
  { id: 'drinks', name: 'Drinks & Beverages', icon: '🍹' }
];

export const menuItems = [
  // Beef Meals
  { id: 'b1', category: 'beef', name: 'Baby Back Ribs', price: 250, note: 'Sweet & Sour glazed tender ribs', isSpecial: true },
  { id: 'b2', category: 'beef', name: 'Bicol Express (Beef)', price: 250, note: 'Spicy creamy coconut beef dish' },
  { id: 'b3', category: 'beef', name: 'Beef Stew', price: 290, note: 'Slow-simmered rich savory beef stew' },
  { id: 'b4', category: 'beef', name: 'Beef Stir Fry', price: 290, note: 'Wok-tossed beef with garden vegetables' },
  { id: 'b5', category: 'beef', name: 'Beef Mushroom', price: 240, note: 'Tender beef slices in mushroom gravy' },
  { id: 'b6', category: 'beef', name: 'Beef Broccoli', price: 290, note: 'Classic beef with crisp fresh broccoli florets' },
  { id: 'b7', category: 'beef', name: 'Bistek Tagalog', price: 260, note: 'Filipino soy-calamansi beef with onions' },
  { id: 'b8', category: 'beef', name: 'Chinese Style Beef Steak', price: 290, note: 'Savory sweet oriental steak' },
  { id: 'b9', category: 'beef', name: 'Beef Cauliflower', price: 260, note: 'Sauteed beef with crisp cauliflower' },
  { id: 'b10', category: 'beef', name: 'Beef Rendang', price: 260, note: 'Aromatic Mindanao style spiced beef' },
  { id: 'b11', category: 'beef', name: 'Beef Curry', price: 260, note: 'Rich curry with potatoes and spices' },
  { id: 'b12', category: 'beef', name: 'Beef Asado', price: 260, note: 'Braised sweet-savory beef chunks' },
  { id: 'b13', category: 'beef', name: 'Crispy Fry Tadyang', price: 270, note: 'Deep-fried crispy beef ribs' },
  { id: 'b14', category: 'beef', name: 'Spanish Beef Pochero', price: 290, note: 'Hearty tomato broth with plantains and veggies' },
  { id: 'b15', category: 'beef', name: 'Beef Senina (Palapa)', price: 290, note: 'Traditional local delicacy with aromatic palapa' },

  // Chicken Meals
  { id: 'c1', category: 'chicken', name: 'Garlic Chicken', price: 250, note: 'Golden crispy chicken infused with toasted garlic' },
  { id: 'c2', category: 'chicken', name: 'Buffalo Chicken', price: 250, note: 'Spicy tangy glazed chicken wings with dip' },
  { id: 'c3', category: 'chicken', name: 'Buttered Chicken', price: 250, note: 'Sweet butter-glazed crispy chicken cuts' },
  { id: 'c4', category: 'chicken', name: 'Parmesan Chicken', price: 250, note: 'Crisp chicken topped with parmesan herb crust' },
  { id: 'c5', category: 'chicken', name: 'Honey Glaze Chicken', price: 250, note: 'Sweet honey-soy glazed chicken wings' },
  { id: 'c6', category: 'chicken', name: 'Chicken Teriyaki', price: 250, note: 'Japanese-style grilled chicken in teriyaki glaze' },
  { id: 'c7', category: 'chicken', name: 'Chicken Curry', price: 250, note: 'Mild coconut chicken curry with carrots and potatoes' },
  { id: 'c8', category: 'chicken', name: 'Chicken Asado', price: 250, note: 'Rich sweet tomato-braised chicken' },
  { id: 'c9', category: 'chicken', name: 'Chicken Rendang', price: 250, note: 'Slow-cooked spiced Mindanao coconut chicken' },
  { id: 'c10', category: 'chicken', name: 'Chicken Adobo', price: 250, note: 'Classic Filipino homestyle braised chicken' },
  { id: 'c11', category: 'chicken', name: 'Native Adobo', price: 280, note: 'Authentic free-range native chicken adobo' },
  { id: 'c12', category: 'chicken', name: 'Native Dapla', price: 300, note: 'Traditional grilled native chicken delicacy' },
  { id: 'c13', category: 'chicken', name: 'Native Adobo sa Gata', price: 300, note: 'Native chicken braised in rich coconut cream' },

  // Combo Meals (with rice and drinks)
  { id: 'cb1', category: 'combo', name: 'Beef Tapa Combo', price: 120, note: 'Includes steaming rice, fried egg & iced drink' },
  { id: 'cb2', category: 'combo', name: 'Beef Stir Fry Combo', price: 120, note: 'Includes steaming rice & iced drink' },
  { id: 'cb3', category: 'combo', name: 'Tuna Sisig Combo', price: 120, note: 'Includes steaming rice, egg & iced drink' },
  { id: 'cb4', category: 'combo', name: 'Sizzling Squid Combo', price: 120, note: 'Includes steaming rice & iced drink' },
  { id: 'cb5', category: 'combo', name: 'Chicken Combo', price: 120, note: 'Includes crispy chicken, rice & iced drink' },
  { id: 'cb6', category: 'combo', name: 'Longganisa Combo', price: 120, note: 'Includes savory longganisa, fried egg, rice & drink' },
  { id: 'cb7', category: 'combo', name: 'Chicken Sisig Combo', price: 120, note: 'Includes sizzling chicken sisig, rice & drink' },
  { id: 'cb8', category: 'combo', name: 'Chicken Cutlet Combo', price: 120, note: 'Crispy breaded chicken cutlet with rice, slaw & drink' },

  // Sizzling and Grill Meals
  { id: 'sg1', category: 'sizzling', name: 'Tempura Platter', price: 250, note: 'Golden crispy shrimp tempura with dipping sauce' },
  { id: 'sg2', category: 'sizzling', name: 'Calamares', price: 250, note: 'Crispy battered squid rings with tartar dip' },
  { id: 'sg3', category: 'sizzling', name: 'Fish Fillet', price: 250, note: 'Crispy fried fish fillet with sweet dip' },
  { id: 'sg4', category: 'sizzling', name: 'Chicharon Tilapia', price: 250, note: 'Crispy whole fried tilapia fillets' },
  { id: 'sg5', category: 'sizzling', name: 'Squid Stir Fry', price: 250, note: 'Tender squid sauteed with bell peppers and onions' },
  { id: 'sg6', category: 'sizzling', name: 'Breaded Chicken Ala King', price: 280, note: 'Crispy breaded chicken breast in creamy white sauce' },
  { id: 'sg7', category: 'sizzling', name: 'Gambas Especial', price: 220, note: 'Spicy garlic buttered shrimp in sizzling plate' },
  { id: 'sg8', category: 'sizzling', name: 'Sweet & Sour Tilapia', price: 250, note: 'Fresh tilapia smothered in tangy sweet and sour sauce' },
  { id: 'sg9', category: 'sizzling', name: 'Sweet & Sour Pompano', price: 300, note: 'Premium pompano fish in homemade sweet and sour sauce' },
  { id: 'sg10', category: 'sizzling', name: 'Beef Salpicao', price: 290, note: 'Tender beef cubes sauteed in butter and toasted garlic' },
  { id: 'sg11', category: 'sizzling', name: 'Tuna Kinilaw', price: 250, note: 'Fresh raw tuna ceviche marinated in vinegar and spices' },
  { id: 'sg12', category: 'sizzling', name: 'Qetsiyah Chicken Sisig', price: 260, note: 'Signature sizzling sisig with mayo and egg topping', isSpecial: true },
  { id: 'sg13', category: 'sizzling', name: 'Chicken Sisig', price: 260, note: 'Sizzling minced seasoned chicken with chili' },
  { id: 'sg14', category: 'sizzling', name: 'Sizzling Squid', price: 250, note: 'Sizzling hot seasoned squid' },
  { id: 'sg15', category: 'sizzling', name: 'Tuna Sisig', price: 260, note: 'Healthier fish sisig served on a smoking hot plate' },

  // Soup Meals
  { id: 'sp1', category: 'soup', name: 'Sinigang na Hipon', price: 280, note: 'Tamarind sour soup loaded with fresh prawns and vegetables' },
  { id: 'sp2', category: 'soup', name: 'Sinigang na Tuna', price: 280, note: 'Fresh tuna chunks in savory sour tamarind broth' },
  { id: 'sp3', category: 'soup', name: 'Sinigang Pompano', price: 450, note: 'Whole premium pompano in rich sour broth' },
  { id: 'sp4', category: 'soup', name: 'Beef Ribs Soup (Bulalo style)', price: 300, note: 'Simmered beef marrow and ribs with cabbage and corn' },
  { id: 'sp5', category: 'soup', name: 'Chicken Tinola Native', price: 350, note: 'Free-range native chicken in ginger-lemongrass broth' },
  { id: 'sp6', category: 'soup', name: 'Nilagpang Native Chicken', price: 350, note: 'Char-grilled native chicken shredded into hot savory soup' },
  { id: 'sp7', category: 'soup', name: 'Sinigang Native Chicken', price: 350, note: 'Tangy tamarind soup with organic native chicken' },
  { id: 'sp8', category: 'soup', name: 'Binakol Native Chicken', price: 350, note: 'Native chicken cooked in fresh young coconut water' },
  { id: 'sp9', category: 'soup', name: 'Chopsuey Platter', price: 280, note: 'Fresh medley of stir-fried highland vegetables and quail eggs' },
  { id: 'sp10', category: 'soup', name: 'Seafood Mix Vegetables', price: 280, note: 'Assorted garden greens tossed with squid and shrimp' },
  { id: 'sp11', category: 'soup', name: 'Creamy Corn Soup', price: 250, note: 'Heartwarming sweet corn soup with egg ribbons' },

  // Pasta & Noodles
  { id: 'p1', category: 'pasta', name: 'Shrimp Carbonara', price: 250, note: 'Creamy rich pasta loaded with juicy shrimp' },
  { id: 'p2', category: 'pasta', name: 'Tuna Carbonara', price: 200, note: 'Silky cream sauce with flaked tuna chunks' },
  { id: 'p3', category: 'pasta', name: 'Chorizo Carbonara', price: 195, note: 'Smoky chorizo sausage bits in rich creamy pasta' },
  { id: 'p4', category: 'pasta', name: 'Sotanghon Guisado', price: 195, note: 'Vermicelli noodles sauteed with chicken, shrimp and vegetables' },
  { id: 'p5', category: 'pasta', name: 'Pancit Canton Guisado', price: 195, note: 'Egg noodles stir-fried with meats and fresh greens' },
  { id: 'p6', category: 'pasta', name: 'Bihon Guisado', price: 195, note: 'Rice noodles sauteed with savory toppings and calamansi' },
  { id: 'p7', category: 'pasta', name: 'Lomi Overload', price: 250, note: 'Extra thick egg noodle soup packed with meatballs, liver and chicharon' },
  { id: 'p8', category: 'pasta', name: 'Chicken Lomi', price: 195, note: 'Hearty thick broth with shredded chicken and noodles' },
  { id: 'p9', category: 'pasta', name: 'Seafood Lomi', price: 250, note: 'Thick comforting noodle soup with squid and shrimp' },

  // Short Orders
  { id: 'so1', category: 'short', name: 'Lomi Special', price: 195, note: 'Chicken/Beef Php 195 | Seafoods Php 250' },
  { id: 'so2', category: 'short', name: 'Chopsuey Short Order', price: 195, note: 'Chicken/Beef Php 195 | Seafoods Php 280' },
  { id: 'so3', category: 'short', name: 'Sotanghon Soup', price: 195, note: 'Chicken/Beef Php 195 | Seafoods Php 220' },
  { id: 'so4', category: 'short', name: 'Hototay Soup', price: 195, note: 'Chicken/Beef Php 195 | Seafoods Php 280' },
  { id: 'so5', category: 'short', name: 'Huat Chai Soup', price: 195, note: 'Chicken/Beef Php 195 | Seafoods Php 280' },
  { id: 'so6', category: 'short', name: 'Special Qetsiyah Soup', price: 195, note: 'Chicken/Beef Php 195 | Seafoods Php 280' },
  { id: 'so7', category: 'short', name: 'Bihon Guisado Platter', price: 195, note: 'Chicken/Beef Php 195 | Seafoods Php 220' },
  { id: 'so8', category: 'short', name: 'Pancit Canton Platter', price: 195, note: 'Chicken/Beef Php 195 | Seafoods Php 220' },
  { id: 'so9', category: 'short', name: 'Sotanghon Guisado Platter', price: 195, note: 'Chicken/Beef Php 195 | Seafoods Php 220' },

  // Snacks & Sandwiches
  { id: 'sn1', category: 'snacks', name: 'Fries & Loaded Nachos', price: 110, note: 'Crispy fries topped with beef, cheese & sour cream' },
  { id: 'sn2', category: 'snacks', name: 'Crispy Mojos', price: 80, note: 'Seasoned potato mojo slices with dip' },
  { id: 'sn3', category: 'snacks', name: 'Lumpia Shanghai (10 pcs)', price: 80, note: 'Crispy mini spring rolls with sweet chili dip' },
  { id: 'sn4', category: 'snacks', name: 'Hawaiian Burger with Fries', price: 220, note: 'Juicy beef patty, grilled pineapple, bacon & fries' },
  { id: 'sn5', category: 'snacks', name: 'Chicken Sandwich with Fries', price: 90, note: 'Crispy chicken fillet sandwich served with fries' },
  { id: 'sn6', category: 'snacks', name: 'Ham & Egg Sandwich with Fries', price: 90, note: 'Classic breakfast ham and sunny egg sandwich' },
  { id: 'sn7', category: 'snacks', name: 'Cheesy Hotdog Sandwich with Fries', price: 90, note: 'Grilled jumbo hotdog with cheese sauce and fries' },
  { id: 'sn8', category: 'snacks', name: 'Clubhouse Triple Sandwich', price: 110, note: 'Triple-decker sandwich with chicken, egg, ham and fries' },

  // Drinks & Beverages
  { id: 'd1', category: 'drinks', name: 'Canned Softdrinks (Coke, Sprite, Royal)', price: 60, note: 'Chilled in can (330ml)' },
  { id: 'd2', category: 'drinks', name: 'Canned Juices (Four Seasons, Pineapple, Mango)', price: 60, note: 'Del Monte canned fruit juice' },
  { id: 'd3', category: 'drinks', name: 'Coke Sakto', price: 30, note: 'Quick refreshing glass bottle' },
  { id: 'd4', category: 'drinks', name: 'Sprite / Royal / Coke 8 oz', price: 20, note: 'Chilled soda bottle' },
  { id: 'd5', category: 'drinks', name: 'Minute Maid Juice', price: 25, note: 'Refreshing orange pulpy juice' },
  { id: 'd6', category: 'drinks', name: 'Purified Mineral Water (350ml)', price: 25, note: 'Chilled bottled drinking water' },
  { id: 'd7', category: 'drinks', name: 'Purified Mineral Water (550ml)', price: 35, note: 'Chilled bottled drinking water' },
  { id: 'd8', category: 'drinks', name: 'Special Halo-Halo Overload', price: 95, note: 'Qetsiyah Cafe signature shaved ice dessert with leche flan & ube', isSpecial: true }
];

// Menu Sheets Original Scanned Gallery
export const menuSheets = [
  { file: '/Food Menu/Beef Meals.jpg', title: 'Beef Meals Board' },
  { file: '/Food Menu/Chicken Meals.jpg', title: 'Chicken Meals Board' },
  { file: '/Food Menu/Combo Meals.jpg', title: 'Combo Meals Board' },
  { file: '/Food Menu/Sizzling and Grill Meals.jpg', title: 'Sizzling & Grill Board' },
  { file: '/Food Menu/Soup Meals.jpg', title: 'Soup Meals Board' },
  { file: '/Food Menu/Pasta and Noodles Meals.jpg', title: 'Pasta & Noodles Board' },
  { file: '/Food Menu/Short Orders.jpg', title: 'Short Orders Board' },
  { file: '/Food Menu/Snacks Meals.jpg', title: 'Snacks Meals Board' },
  { file: '/Food Menu/Drinks.jpg', title: 'Drinks & Beverages Board' }
];
