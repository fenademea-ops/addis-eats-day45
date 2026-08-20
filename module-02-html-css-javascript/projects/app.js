const KEYS = {
  MENU: 'addiseats_menu',
  CATEGORIES: 'addiseats_categories',
  ORDERS: 'addiseats_orders',
  CART: 'addiseats_cart',
  FAVORITES: 'addiseats_favorites',
  THEME: 'addiseats_theme',
  LANG: 'addiseats_lang'
};

const DEFAULT_CATEGORIES = [
  { id: 'fasting_shiro', name: 'Shiro Specialties', nameAm: 'የሽሮ ምግቦች', icon: '🍲', isEnabled: true },
  { id: 'vegan_fasting', name: 'Fasting & Vegan', nameAm: 'የጾም በያይነቱ እና ወጦች', icon: '🥗', isEnabled: true },
  { id: 'meat_wats', name: 'Meat Wats', nameAm: 'የባህል የሥጋ ወጦች', icon: '🍗', isEnabled: true },
  { id: 'tibs_grills', name: 'Tibs & Grills', nameAm: 'ጥብስ እና የፍርፍር ጥብስ', icon: '🔥', isEnabled: true },
  { id: 'kitfo_raw', name: 'Kitfo & Raw Meat', nameAm: 'ክትፎ እና ጥሬ ሥጋ', icon: '🥩', isEnabled: true },
  { id: 'breakfast', name: 'Breakfast', nameAm: 'የባህል ቁርስ', icon: '🍳', isEnabled: true },
  { id: 'firfir_dishes', name: 'Injera Firfir', nameAm: 'የፍርፍር ምግቦች', icon: '🌶️', isEnabled: true },
  { id: 'fish_seafood', name: 'Fish & Seafood', nameAm: 'የዓሣ ምግቦች', icon: '🐟', isEnabled: true },
  { id: 'pizzas', name: 'Pizzas', nameAm: 'ፒዛ', icon: '🍕', isEnabled: true },
  { id: 'pastas', name: 'Pastas', nameAm: 'ፓስታ', icon: '🍝', isEnabled: true },
  { id: 'burgers_sandwiches', name: 'Burgers & Sandwiches', nameAm: 'በርገር እና ሳንድዊች', icon: '🍔', isEnabled: true },
  { id: 'fried_chicken', name: 'Fried Chicken', nameAm: 'የተጠበሰ ዶሮ', icon: '🍗', isEnabled: true },
  { id: 'fresh_juices', name: 'Fresh Juices', nameAm: 'ትኩስ ጭማቂዎች', icon: '🍹', isEnabled: true },
  { id: 'hot_beverages', name: 'Coffee & Tea', nameAm: 'ትኩስ መጠጦች እና ቡና', icon: '☕', isEnabled: true },
  { id: 'desserts', name: 'Desserts', nameAm: 'ጣፋጭ ምግቦች', icon: '🥮', isEnabled: true }
];

const FALLBACK_DISHES = [
  { id: 101, name: "Special Doro Wat", nameAm: "ስፔሻል የዶሮ ወጥ", description: "Slow-cooked tender organic chicken in rich berbere sauce with boiled egg and fresh injera.", descriptionAm: "በልዩ ቅመም እና በርበሬ የተዘጋጀ ለስላሳ የዶሮ ወጥ ከእንቁላል እና ትኩስ እንጀራ ጋር የቀረበ።", price: 480, category: "meat_wats", image: "images/doro_wat.jpg", ingredients: ["Organic Chicken", "Berbere", "Injera", "Garlic", "Ginger", "Hard-boiled Egg", "Niter Kibbeh"], isAvailable: true, stock: 18, isFasting: false, spicyLevel: 3, rating: 4.9, reviewsCount: 142, calories: "650 kcal" },
  { id: 102, name: "Siga Key Wat", nameAm: "የበሬ ቀይ ወጥ", description: "Spicy beef stew cooked in berbere, onions, and seasoned butter, served with soft injera.", descriptionAm: "ጥራት ባለው የበሬ ሥጋ፣ በርበሬ እና ቅቤ የተዘጋጀ ጣፋጭ ቀይ ወጥ።", price: 420, category: "meat_wats", image: "images/siga_key_wat.jpg", ingredients: ["Prime Beef", "Berbere", "Onions", "Garlic", "Niter Kibbeh", "Injera"], isAvailable: true, stock: 15, isFasting: false, spicyLevel: 3, rating: 4.8, reviewsCount: 98, calories: "580 kcal" },
  { id: 103, name: "Shiro Tegabino", nameAm: "ሽሮ ተጋቢኖ", description: "Clay-pot bubbling chickpea stew prepared with house-blend spices, garlic, and hot green chili.", descriptionAm: "በትኩስ የሸክላ ድስት የሚፈላ የሚጣፍጥ የሽሮ ተጋቢኖ ከቃሪያ እና እንጀራ ጋር።", price: 280, category: "fasting_shiro", image: "images/shiro_tegabino.jpg", ingredients: ["Sun-dried Chickpeas", "Garlic", "Ginger", "Green Chili", "Injera", "Spices"], isAvailable: true, stock: 25, isFasting: true, spicyLevel: 2, rating: 4.9, reviewsCount: 210, calories: "420 kcal" },
  { id: 104, name: "Shiro Bozena", nameAm: "ሽሮ ቦዘና", description: "Thick roasted chickpea flour stew enriched with minced tender beef and spiced butter.", descriptionAm: "በስሱ በተከተፈ የበሬ ሥጋ እና የሀበሻ ቅቤ የተዘጋጀ ልዩ የሽሮ ቦዘና ወጥ።", price: 360, category: "fasting_shiro", image: "images/shiro_bozena.jpg", ingredients: ["Chickpea Powder", "Minced Beef", "Garlic", "Niter Kibbeh", "Injera"], isAvailable: true, stock: 12, isFasting: false, spicyLevel: 2, rating: 4.7, reviewsCount: 86, calories: "530 kcal" },
  { id: 105, name: "Yetsom Beyaynetu (Special)", nameAm: "የጾም በያይነቱ (ልዩ)", description: "Grand fasting platter featuring Misir Wat, Kik Alicha, Shiro, Gomen, Atakilt, and Beetroot.", descriptionAm: "የተለያዩ የጾም ወጦች ስብስብ፡ ምስር፣ ክክ፣ ጎመን፣ አታክልት እና ቀይ ስር ከእንጀራ ጋር።", price: 340, category: "vegan_fasting", image: "images/beyaynetu.jpg", ingredients: ["Red Lentils", "Yellow Split Peas", "Collard Greens", "Cabbage & Carrots", "Beetroot", "Injera"], isAvailable: true, stock: 22, isFasting: true, spicyLevel: 2, rating: 4.9, reviewsCount: 178, calories: "490 kcal" },
  { id: 106, name: "Special Kitfo (Lebleb / Tire)", nameAm: "ክትፎ ልዩ (ለብለብ / ጥሬ)", description: "Minced lean beef seasoned with mitmita and pure niter kibbeh, served with ayib and gomen kitfo.", descriptionAm: "ለስላሳ ቀይ ሥጋ በሚጥሚጣ እና በቅቤ የተዘጋጀ ከትኩስ አይብ እና ጎመን ክትፎ ጋር።", price: 540, category: "kitfo_raw", image: "images/kitfo.jpg", ingredients: ["Top Round Lean Beef", "Mitmita", "Niter Kibbeh", "Ayib (Cottage Cheese)", "Gomen Kitfo", "Kocho/Injera"], isAvailable: true, stock: 16, isFasting: false, spicyLevel: 4, rating: 5.0, reviewsCount: 310, calories: "690 kcal" },
  { id: 107, name: "Shekla Tibs", nameAm: "የሸክላ ጥብስ", description: "Pan-seared tender beef cubes sautéed with onions, rosemary, and jalapeno over a charcoal burner.", descriptionAm: "በሸክላ ድስት የሚንጣጣ የበሬ ጥብስ በሽንኩርት፣ ሮዝመሪ እና ቃሪያ ተዘጋጅቶ የቀረበ።", price: 500, category: "tibs_grills", image: "images/shekla-tibs.jpg", ingredients: ["Selected Tender Beef", "Fresh Rosemary", "Red Onions", "Jalapeno", "Awaze", "Injera"], isAvailable: true, stock: 20, isFasting: false, spicyLevel: 3, rating: 4.9, reviewsCount: 245, calories: "620 kcal" },
  { id: 108, name: "Quanta Firfir", nameAm: "የቋንጣ ፍርፍር", description: "Shredded soft injera simmered in spicy berbere sauce infused with sun-cured seasoned dried beef.", descriptionAm: "በጣፋጭ ቋንጣ ሥጋ፣ በርበሬ እና ቅቤ የተዘጋጀ ልዩ የፍርፍር ቁርስ/ምሳ።", price: 430, category: "firfir_dishes", image: "images/quanta-firfir.jpg", ingredients: ["Sun-cured Beef (Quanta)", "Injera", "Berbere", "Garlic", "Niter Kibbeh", "Green Pepper"], isAvailable: true, stock: 14, isFasting: false, spicyLevel: 3, rating: 4.8, reviewsCount: 115, calories: "560 kcal" },
  { id: 109, name: "Chechebsa with Honey & Butter", nameAm: "ጨጨብሳ በማርና በቅቤ", description: "Torn pan-fried flatbread spiced with berbere and niter kibbeh, generously drizzled with pure honey.", descriptionAm: "በቅቤ እና በርበሬ የተለወሰ ቂጣ ከንፁህ የተፈጥሮ ማር ጋር የቀረበ የባህል ቁርስ።", price: 290, category: "breakfast", image: "images/chechebsa.jpg", ingredients: ["Handmade Wheat Flatbread", "Pure Organic Honey", "Niter Kibbeh", "Berbere"], isAvailable: true, stock: 30, isFasting: false, spicyLevel: 1, rating: 4.9, reviewsCount: 160, calories: "520 kcal" },
  { id: 110, name: "Lake Tana Asa Tibs (Fried Fish)", nameAm: "የጣና ዓሣ ጥብስ", description: "Crispy seasoned whole tilapia filet served with spicy awaze, lime wedges, and salad.", descriptionAm: "ጥሩ ተደርጎ የተጠበሰ የጣና ዓሣ ከሎሚ፣ አዋዜ እና ሰላጣ ጋር የቀረበ።", price: 460, category: "fish_seafood", image: "images/fish-tibs.jpg", ingredients: ["Fresh Tilapia Filet", "Garlic Lime Marinade", "Awaze Sauce", "Fresh Salad", "Bread/Injera"], isAvailable: true, stock: 10, isFasting: true, spicyLevel: 2, rating: 4.8, reviewsCount: 75, calories: "460 kcal" },
  { id: 111, name: "Addis Special Beef Pizza", nameAm: "አዲስ ስፔሻል የበሬ ፒዛ", description: "Stone-baked thin crust pizza topped with seasoned ground beef, mozzarella, bell peppers, and olives.", descriptionAm: "በጣፋጭ የበሬ ሥጋ፣ ሞዛሬላ ቺዝ፣ ቃሪያ እና ወይራ የተዘጋጀ ትኩስ የድንጋይ ዳቦ ፒዛ።", price: 520, category: "pizzas", image: "images/pizza.jpg", ingredients: ["Italian Flour Crust", "Seasoned Ground Beef", "Mozzarella Cheese", "Bell Peppers", "Black Olives", "Tomato Sauce"], isAvailable: true, stock: 18, isFasting: false, spicyLevel: 1, rating: 4.9, reviewsCount: 190, calories: "780 kcal" },
  { id: 112, name: "Creamy Chicken Alfredo Pasta", nameAm: "የዶሮ ክሬሚ አልፍሬዶ ፓስታ", description: "Al dente penne pasta tossed in rich garlic parmesan cream sauce with grilled chicken breast.", descriptionAm: "በነጭ ሽንኩርትና ቺዝ ክሬም የተዘጋጀ ጣፋጭ የዶሮ ፔኔ ፓስታ።", price: 450, category: "pastas", image: "images/pasta.jpg", ingredients: ["Penne Pasta", "Grilled Chicken Breast", "Heavy Cream", "Parmesan", "Garlic & Herbs"], isAvailable: true, stock: 14, isFasting: false, spicyLevel: 0, rating: 4.7, reviewsCount: 88, calories: "710 kcal" },
  { id: 113, name: "Addis Double Cheeseburger", nameAm: "አዲስ ደብል ቺዝበርገር", description: "Two 100% prime beef patties, double melted cheddar, caramelized onions, pickles, and house sauce.", descriptionAm: "ሁለት የበሬ ፓቲ፣ የቀለጠ ቸዳር ቺዝ፣ በካራሜል የተጠበሰ ሽንኩርት እና ድንች ጥብስ።", price: 490, category: "burgers_sandwiches", image: "images/burger.jpg", ingredients: ["100% Prime Beef", "Brioche Bun", "Cheddar Cheese", "Caramelized Onions", "Pickles", "French Fries"], isAvailable: true, stock: 20, isFasting: false, spicyLevel: 1, rating: 4.9, reviewsCount: 220, calories: "850 kcal" },
  { id: 114, name: "Crispy Broasted Chicken (4 Pcs)", nameAm: "ክሪስፒ ብሮስቲድ ዶሮ (4 ቁራጭ)", description: "Golden fried crunchy chicken pieces served with seasoned french fries, garlic mayo, and coleslaw.", descriptionAm: "በወርቃማ ቀለም የተጠበሰ ጥርት ያለ ዶሮ ከቺፕስ እና ነጭ ሽንኩርት ሶስ ጋር።", price: 480, category: "fried_chicken", image: "images/fried-chicken.jpg", ingredients: ["Fresh Chicken", "Secret Spice Breading", "Garlic Mayo", "French Fries", "Coleslaw"], isAvailable: true, stock: 15, isFasting: false, spicyLevel: 1, rating: 4.8, reviewsCount: 130, calories: "790 kcal" },
  { id: 115, name: "Fresh Juice Spris", nameAm: "ትኩስ ጁስ እስፕሪስ", description: "Layered thick organic fresh juice featuring Avocado, Mango, Papaya, and Strawberry with lime.", descriptionAm: "በተፈጥሮ ፍራፍሬዎች የተዘጋጀ ባለቀለም እስፕሪስ (አቮካዶ፣ ማንጎ፣ ፓፓያ፣ እንጆሪ)።", price: 180, category: "fresh_juices", image: "images/juice.jpg", ingredients: ["Fresh Avocado", "Ripe Mango", "Papaya", "Strawberry", "Fresh Lime Slice"], isAvailable: true, stock: 35, isFasting: true, spicyLevel: 0, rating: 5.0, reviewsCount: 260, calories: "240 kcal" },
  { id: 116, name: "Traditional Jebena Coffee", nameAm: "የጀበና ባህላዊ ቡና", description: "Freshly roasted Habesha highland coffee brewed in a traditional clay jebena with rue (Tena’adam).", descriptionAm: "በጀበና የተፈላ ትኩስ የሀበሻ ቡና ከጤና አዳም እና ፋንድሻ ጋር የቀረበ።", price: 90, category: "hot_beverages", image: "images/coffee.jpg", ingredients: ["Highland Arabica Coffee Beans", "Rue (Tena'adam)", "Incense Aroma", "Fresh Popcorn"], isAvailable: true, stock: 50, isFasting: true, spicyLevel: 0, rating: 5.0, reviewsCount: 340, calories: "15 kcal" },
  { id: 117, name: "Honey Pistachio Baklava (3 Pcs)", nameAm: "የማር እና ፒስታቺዮ ባክላቫ", description: "Flaky filo pastry layers filled with chopped pistachios and walnuts, sweetened with wild honey.", descriptionAm: "በማርና በለውዝ የተዘጋጀ ጣፋጭ እና ለስላሳ የባክላቫ ኬክ።", price: 220, category: "desserts", image: "images/baklava.jpg", ingredients: ["Filo Pastry", "Pure Honey", "Pistachios", "Walnuts", "Cinnamon Syrup"], isAvailable: true, stock: 25, isFasting: false, spicyLevel: 0, rating: 4.9, reviewsCount: 95, calories: "380 kcal" }
];

const PROMO_CODES = {
  'HABESHA10': { discountPercent: 0.10, desc: '10% Discount on Food' },
  'FREEDEL': { freeDelivery: true, desc: 'Free Delivery Across Addis Ababa' },
  'ADDIS2026': { discountPercent: 0.15, desc: '15% New Year Special Discount' }
};

const I18N = {
  en: {
    historyBtn: 'Orders',
    adminLink: 'Admin',
    heroBadge: "Addis Ababa's Premier Kitchen & Delivery",
    heroTitle1: 'Authentic Habesha Flavors,',
    heroTitle2: 'Delivered to Your Doorstep.',
    heroSubtitle: 'Explore 15 categories of authentic Ethiopian dishes, clay-pot wats, sizzling tibs, stone-baked pizzas, and natural juices across all Addis sub-cities.',
    searchPlaceholder: 'Search by dish name (e.g., Doro Wat, Shiro, Kitfo) or ingredients...',
    catAll: 'All Dishes',
    exploreMenu: 'Explore Our Menu',
    cartTitle: 'Your Cart',
    promoPlaceholder: 'PROMO CODE (e.g. HABESHA10)',
    applyPromo: 'Apply',
    subtotal: 'Subtotal:',
    estDeliveryFee: 'Est. Delivery Fee:',
    discount: 'Promo Discount:',
    grandTotal: 'Grand Total:',
    proceedCheckout: 'Proceed to Checkout',
    orderHistoryTitle: 'Past Orders',
    checkoutTitle: 'Addis Delivery & Checkout',
    lblFullName: 'Full Name *',
    lblPhone: 'Ethiopian Phone Number *',
    lblSubCity: 'Addis Ababa Sub-City / Area *',
    lblAddress: 'Specific Delivery Address / House No. *',
    lblNotes: 'Special Instructions (Optional)',
    lblPaymentMethod: 'Select Payment Method *',
    deliveryFee: 'Delivery Fee:',
    totalToPay: 'Total Amount to Pay:',
    placeOrder: 'Place Order & Proceed to Pay',
    errName: 'Please enter your full name.',
    errPhone: 'Enter a valid Ethiopian number (09... or 07...).',
    errAddress: 'Please provide a specific delivery landmark.',
    orderConfirmedTitle: 'Order Confirmed!',
    orderLiveTrackingMsg: 'Your food is being prepared with love and will arrive shortly.',
    viewReceipt: 'Print Tax Invoice',
    continueShopping: 'Done',
    soldOut: 'Sold Out / አልቋል',
    addToCart: 'Add to Cart',
    reorder: 'Reorder Items'
  },
  am: {
    historyBtn: 'ትዕዛዞች',
    adminLink: 'አስተዳዳሪ',
    heroBadge: 'የአዲስ አበባ ተመራጭ የባህል እና ፈጣን ምግብ ማቅረቢያ',
    heroTitle1: 'እውነተኛ የሀበሻ ጣዕም፣',
    heroTitle2: 'በፍጥነት እስከ ደጃፍዎ ድረስ።',
    heroSubtitle: 'የተለያዩ 15 የምግብ አይነቶች፡ የባህል የሥጋ እና የጾም ወጦች፣ የሸክላ ጥብስ፣ ክትፎ፣ ፒዛ፣ በርገር እና ትኩስ ጭማቂዎች በሁሉም የአዲስ አበባ ክፍለ ከተሞች።',
    searchPlaceholder: 'በምግብ ስም (ለምሳሌ፦ ዶሮ ወጥ፣ ሽሮ፣ ክትፎ) ወይም በይዘት ይፈልጉ...',
    catAll: 'ሁሉም ምግቦች',
    exploreMenu: 'የተመረጡ ምግቦችን ይዘዙ',
    cartTitle: 'የእርስዎ ቅርጫት',
    promoPlaceholder: 'የቅናሽ ኮድ (ለምሳሌ፦ HABESHA10)',
    applyPromo: 'ተግብር',
    subtotal: 'የምግብ ድምር፦',
    estDeliveryFee: 'የትራንስፖርት ክፍያ፦',
    discount: 'የተገኘ ቅናሽ፦',
    grandTotal: 'አጠቃላይ ድምር፦',
    proceedCheckout: 'ወደ ክፍያ እና ማዘዣ ይቀጥሉ',
    orderHistoryTitle: 'ያለፉ ትዕዛዞች',
    checkoutTitle: 'የማድረሻ አድራሻ እና ማዘዣ',
    lblFullName: 'ሙሉ ስም *',
    lblPhone: 'የኢትዮጵያ ስልክ ቁጥር *',
    lblSubCity: 'ክፍለ ከተማ / አካባቢ *',
    lblAddress: 'ትክክለኛ የማድረሻ አድራሻ / የቤት ቁጥር *',
    lblNotes: 'ተጨማሪ ማሳሰቢያ (አስፈላጊ ከሆነ)',
    lblPaymentMethod: 'የክፍያ ዘዴ ይምረጡ *',
    deliveryFee: 'የትራንስፖርት ክፍያ፦',
    totalToPay: 'የሚከፈል አጠቃላይ ገንዘብ፦',
    placeOrder: 'ትዕዛዝ አረጋግጥ እና ክፈል',
    errName: 'እባክዎ ሙሉ ስምዎን ያስገቡ።',
    errPhone: 'ትክክለኛ የኢትዮጵያ ስልክ ያስገቡ (09... ወይም 07...)።',
    errAddress: 'እባክዎ የተለየ መለያ ወይም አድራሻ ያስገቡ።',
    orderConfirmedTitle: 'ትዕዛዝዎ ተረጋግጧል!',
    orderLiveTrackingMsg: 'ምግብዎ በኩሽናችን እየተዘጋጀ ሲሆን በአጭር ጊዜ ውስጥ ይደርስዎታል።',
    viewReceipt: 'ደረሰኝ አትም',
    continueShopping: 'ተጠናቀቀ',
    soldOut: 'አልቋል / Sold Out',
    addToCart: 'ወደ ቅርጫት ጨምር',
    reorder: 'እንደገና እዘዝ'
  }
};

let state = {
  menu: [],
  categories: [],
  cart: [],
  favorites: [],
  orders: [],
  activeCategory: 'all',
  searchQuery: '',
  appliedPromo: null,
  selectedPaymentMethod: 'telebirr',
  currentLang: 'en',
  currentTheme: 'light',
  lastPlacedOrder: null
};

const audioCtx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playSound(type) {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'add') {
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    }
  } catch (e) {}
}

async function initApp() {
  loadStoredPreferences();
  await initDataLayer();
  setupEventListeners();
  renderCategoryTabs();
  renderMenu();
  renderCart();
  updateCartBadge();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function loadStoredPreferences() {
  state.currentTheme = localStorage.getItem(KEYS.THEME) || 'light';
  state.currentLang = localStorage.getItem(KEYS.LANG) || 'en';
  state.favorites = JSON.parse(localStorage.getItem(KEYS.FAVORITES) || '[]');
  state.cart = JSON.parse(localStorage.getItem(KEYS.CART) || '[]');
  state.orders = JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');

  document.documentElement.setAttribute('data-theme', state.currentTheme);
  updateThemeIcon();
  applyLanguage(state.currentLang);
}

async function initDataLayer() {
  state.categories = DEFAULT_CATEGORIES;

  // The admin dashboard saves its dishes to localStorage. Those edits
  // (add / update / delete) MUST win over the seed data in menu.json.
  const storedMenu = readStoredMenu();

  try {
    const response = await fetch('./menu.json');

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    let seedMenu = null;
    if (Array.isArray(data)) {
      seedMenu = data;
    } else if (data && Array.isArray(data.categories) && Array.isArray(data.dishes)) {
      state.categories = data.categories;
      seedMenu = data.dishes;
    } else {
      throw new Error('Invalid JSON format');
    }

    // Only seed from menu.json the very first time (nothing saved yet).
    state.menu = storedMenu ? storedMenu : seedMenu;
  } catch (error) {
    console.warn('Network/CORS fetch for menu.json skipped or failed. Using stored/fallback menu.', error);

    state.menu = storedMenu ? storedMenu : FALLBACK_DISHES;

    const storedCategories = localStorage.getItem(KEYS.CATEGORIES);
    if (storedCategories) {
      try {
        state.categories = JSON.parse(storedCategories);
      } catch (e) {
        state.categories = DEFAULT_CATEGORIES;
      }
    }
  }

  // Ensure default categories map if needed
  if (!state.categories || state.categories.length === 0) {
    state.categories = DEFAULT_CATEGORIES;
  }

  // Admin toggles (isEnabled) live in localStorage and MUST win over any
  // categories coming from menu.json / defaults.
  applyAdminCategoryOverrides();

  // Persist the merged lists so admin and storefront stay in sync.
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(state.categories));
  localStorage.setItem(KEYS.MENU, JSON.stringify(state.menu));
}

// Returns the admin-saved dish list, or null when nothing has been saved yet.
function readStoredMenu() {
  const raw = localStorage.getItem(KEYS.MENU);
  if (raw === null) return null;
  try {
    const parsed = JSON.parse(raw);
    // An empty array is a valid state: the admin deleted every dish.
    return Array.isArray(parsed) ? parsed : null;
  } catch (e) {
    return null;
  }
}

// Re-read dishes + categories from storage and repaint the storefront.
function refreshFromStorage() {
  const storedMenu = readStoredMenu();
  if (storedMenu) state.menu = storedMenu;
  applyAdminCategoryOverrides();

  const enabledIds = new Set(state.categories.filter(c => c.isEnabled !== false).map(c => c.id));
  if (state.activeCategory !== 'all' && state.activeCategory !== 'favorites' && !enabledIds.has(state.activeCategory)) {
    state.activeCategory = 'all';
  }

  // Drop cart lines whose dish no longer exists.
  const liveIds = new Set(state.menu.map(d => String(d.id)));
  const cleanedCart = state.cart.filter(item => liveIds.has(String(item.id)));
  if (cleanedCart.length !== state.cart.length) {
    state.cart = cleanedCart;
    saveCart();
    renderCart();
    updateCartBadge();
  }

  renderCategoryTabs();
  renderMenu();
}


function applyAdminCategoryOverrides() {
  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem(KEYS.CATEGORIES) || '[]');
  } catch (e) {
    stored = [];
  }
  if (!Array.isArray(stored) || stored.length === 0) return;

  const overrides = new Map(stored.map(c => [c.id, c]));
  state.categories = state.categories.map(cat => {
    const saved = overrides.get(cat.id);
    return saved ? { ...cat, ...saved, isEnabled: saved.isEnabled !== false } : cat;
  });
}

// Live sync: if the admin dashboard toggles a category in another tab,
// refresh the storefront tabs and dish cards immediately.
window.addEventListener('storage', (e) => {
  if (e.key !== KEYS.CATEGORIES && e.key !== KEYS.MENU) return;
  refreshFromStorage();
});

// If the admin page was opened in the SAME tab, coming back here fires no
// storage event, so re-sync whenever the storefront becomes visible again.
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) refreshFromStorage();
});
window.addEventListener('pageshow', () => refreshFromStorage());


function setupEventListeners() {
  document.getElementById('langToggleBtn').addEventListener('click', toggleLanguage);
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    searchClearBtn.classList.toggle('visible', state.searchQuery.length > 0);
    renderMenu();
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    searchClearBtn.classList.remove('visible');
    renderMenu();
    searchInput.focus();
  });

  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('closeCartBtn').addEventListener('click', closeCart);
  document.getElementById('cartBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'cartBackdrop') closeCart();
  });

  document.getElementById('orderHistoryBtn').addEventListener('click', openHistory);
  document.getElementById('closeHistoryBtn').addEventListener('click', closeHistory);
  document.getElementById('historyBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'historyBackdrop') closeHistory();
  });

  document.getElementById('applyPromoBtn').addEventListener('click', applyPromoCode);
  document.getElementById('openCheckoutBtn').addEventListener('click', openCheckoutModal);
  document.getElementById('closeCheckoutModalBtn').addEventListener('click', closeCheckoutModal);
  document.getElementById('checkoutModalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'checkoutModalBackdrop') closeCheckoutModal();
  });

  document.getElementById('custSubCity').addEventListener('change', updateCheckoutSummary);

  document.querySelectorAll('.payment-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.selectedPaymentMethod = card.dataset.method;
    });
  });

  document.getElementById('checkoutForm').addEventListener('submit', handleOrderSubmit);
  document.getElementById('closeConfirmModalBtn').addEventListener('click', closeConfirmModal);
  document.getElementById('doneOrderBtn').addEventListener('click', closeConfirmModal);
  document.getElementById('viewInvoiceBtn').addEventListener('click', () => {
    closeConfirmModal();
    openTaxInvoiceModal(state.lastPlacedOrder);
  });

  document.getElementById('closeInvoiceModalBtn').addEventListener('click', closeTaxInvoiceModal);
  document.getElementById('printInvoiceActionBtn').addEventListener('click', () => window.print());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeHistory();
      closeCheckoutModal();
      closeConfirmModal();
      closeTaxInvoiceModal();
      closeDishDetailModal();
    }
  });
}

function renderCategoryTabs() {
  const container = document.getElementById('categoryTabsContainer');
  if (!container) return;

  const lang = state.currentLang;
  const isEn = lang === 'en';

  const counts = { all: state.menu.length };
  state.menu.forEach(d => {
    counts[d.category] = (counts[d.category] || 0) + 1;
  });

  const enabledCats = state.categories.filter(c => c.isEnabled !== false);

  let html = `
    <button class="category-pill ${state.activeCategory === 'all' ? 'active' : ''}" data-category="all" role="tab">
      <span>✨</span>
      <span>${isEn ? 'All Dishes' : 'ሁሉም ምግቦች'}</span>
      <span class="cat-count">${counts.all || 0}</span>
    </button>
    <button class="category-pill ${state.activeCategory === 'favorites' ? 'active' : ''}" data-category="favorites" role="tab">
      <span>❤️</span>
      <span>${isEn ? 'Favorites' : 'የተወደዱ'}</span>
      <span class="cat-count">${state.favorites.length}</span>
    </button>
  `;

  enabledCats.forEach(cat => {
    const isActive = state.activeCategory === cat.id;
    const catTitle = isEn ? cat.name : cat.nameAm;
    const count = counts[cat.id] || 0;

    html += `
      <button class="category-pill ${isActive ? 'active' : ''}" data-category="${cat.id}" role="tab">
        <span>${cat.icon || '🍽️'}</span>
        <span>${catTitle}</span>
        <span class="cat-count">${count}</span>
      </button>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      container.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategory = pill.dataset.category;
      renderMenu();
    });
  });
}

function renderMenu() {
  const grid = document.getElementById('dishGrid');
  const resultsCount = document.getElementById('resultsCount');
  const heading = document.getElementById('activeCategoryHeading');
  if (!grid) return;

  const isEn = state.currentLang === 'en';

  const enabledCategoryIds = new Set(
    state.categories.filter(c => c.isEnabled !== false).map(c => c.id)
  );

  let filtered = state.menu.filter(dish => {
    if (dish.category && !enabledCategoryIds.has(dish.category) && state.categories.length > 0) return false;

    if (state.activeCategory === 'favorites') {
      if (!state.favorites.includes(dish.id)) return false;
    } else if (state.activeCategory !== 'all') {
      if (dish.category !== state.activeCategory) return false;
    }

    if (state.searchQuery) {
      const matchName = dish.name ? dish.name.toLowerCase().includes(state.searchQuery) : false;
      const matchNameAm = dish.nameAm ? dish.nameAm.toLowerCase().includes(state.searchQuery) : false;
      const matchDesc = dish.description ? dish.description.toLowerCase().includes(state.searchQuery) : false;
      const matchIngr = dish.ingredients ? dish.ingredients.some(i => i.toLowerCase().includes(state.searchQuery)) : false;
      if (!matchName && !matchNameAm && !matchDesc && !matchIngr) return false;
    }

    return true;
  });

  if (resultsCount) {
    resultsCount.textContent = isEn 
      ? `Showing ${filtered.length} dish${filtered.length === 1 ? '' : 'es'}`
      : `${filtered.length} ምግቦች ተገኝተዋል`;
  }

  if (heading) {
    if (state.activeCategory === 'all') {
      heading.textContent = isEn ? 'All Delicious Dishes' : 'ሁሉም የተመረጡ ምግቦች';
    } else if (state.activeCategory === 'favorites') {
      heading.textContent = isEn ? 'Your Favorite Dishes' : 'የእርስዎ ተወዳጅ ምግቦች';
    } else {
      const activeCatObj = state.categories.find(c => c.id === state.activeCategory);
      heading.textContent = activeCatObj ? (isEn ? activeCatObj.name : activeCatObj.nameAm) : 'Menu';
    }
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🍲</div>
        <h3 class="empty-title">${isEn ? 'No Dishes Found' : 'ምንም ምግብ አልተገኘም'}</h3>
        <p class="empty-subtitle">${isEn ? 'Try adjusting your search terms or selecting another category.' : 'እባክዎ ሌላ ቃል ይፈልጉ ወይም ሌላ የምግብ ዘርፍ ይምረጡ።'}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(dish => {
    const isFav = state.favorites.includes(dish.id);
    const isOutOfStock = dish.isAvailable === false;
    const title = isEn ? dish.name : (dish.nameAm || dish.name);
    const subTitle = isEn ? (dish.nameAm || '') : dish.name;
    const desc = isEn ? dish.description : (dish.descriptionAm || dish.description);
    const rating = dish.rating || 4.8;
    const reviews = dish.reviewsCount || 45;

    return `
      <article class="dish-card ${isOutOfStock ? 'sold-out' : ''}" id="dish-${dish.id}">
        <div class="dish-img-wrapper" onclick="openDishDetailModal(${dish.id})">
          <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy" onerror="this.src='https://placehold.co/400x300/e2e8f0/0f172a?text=${encodeURIComponent(dish.name)}'">
          
          ${isOutOfStock ? `
            <div class="sold-out-overlay">
              <span class="sold-out-badge">${isEn ? 'Sold Out / አልቋል' : 'አልቋል / Sold Out'}</span>
            </div>
          ` : ''}

          <button class="fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${dish.id})" title="Favorite" aria-label="Add to Favorites">
            ${isFav ? '❤️' : '🤍'}
          </button>

          ${dish.isFasting ? `<span class="diet-badge">🌿 ${isEn ? 'Fasting (የጾም)' : 'የጾም'}</span>` : ''}
        </div>

        <div class="dish-content">
          <div class="dish-header">
            <div>
              <h3 class="dish-name" onclick="openDishDetailModal(${dish.id})" style="cursor: pointer;">${title}</h3>
              ${subTitle ? `<div class="dish-name-am">${subTitle}</div>` : ''}
            </div>
          </div>

          <p class="dish-desc">${desc}</p>

          <div class="dish-meta">
            <span>⭐ <strong class="rating-star">${rating}</strong> (${reviews})</span>
            ${dish.calories ? `<span>🔥 ${dish.calories}</span>` : ''}
          </div>

          <div class="dish-footer">
            <div class="dish-price">
              ${Number(dish.price).toFixed(2)} <span>ETB</span>
            </div>

            <button 
              class="btn-add" 
              onclick="addToCart(${dish.id})" 
              ${isOutOfStock ? 'disabled aria-disabled="true"' : ''}
            >
              ${isOutOfStock ? (isEn ? 'Sold Out' : 'አልቋል') : `<span>+</span> ${isEn ? 'Add' : 'አዝዝ'}`}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function addToCart(dishId) {
  const dish = state.menu.find(d => d.id === dishId);
  if (!dish || dish.isAvailable === false) {
    showToast('This dish is currently out of stock / sold out.', 'error');
    return;
  }

  const existing = state.cart.find(item => item.id === dishId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: dish.id,
      name: dish.name,
      nameAm: dish.nameAm,
      price: dish.price,
      image: dish.image,
      quantity: 1,
      notes: ''
    });
  }

  saveCart();
  renderCart();
  updateCartBadge();
  playSound('add');
  showToast(`Added "${dish.name}" to cart!`, 'success');
}

function updateQuantity(dishId, delta) {
  const item = state.cart.find(i => i.id === dishId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(dishId);
  } else {
    saveCart();
    renderCart();
    updateCartBadge();
  }
}

function removeFromCart(dishId) {
  state.cart = state.cart.filter(i => i.id !== dishId);
  saveCart();
  renderCart();
  updateCartBadge();
  showToast('Item removed from cart', 'info');
}

function updateItemNotes(dishId, note) {
  const item = state.cart.find(i => i.id === dishId);
  if (item) {
    item.notes = note;
    saveCart();
  }
}

function saveCart() {
  localStorage.setItem(KEYS.CART, JSON.stringify(state.cart));
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cartCountBadge');
  const drawerCount = document.getElementById('cartDrawerCount');
  if (badge) badge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = `(${totalCount} item${totalCount === 1 ? '' : 's'})`;
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  if (!container) return;
  const isEn = state.currentLang === 'en';

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 3rem 1rem;">
        <div class="empty-icon">🛒</div>
        <h4 class="empty-title">${isEn ? 'Your cart is empty' : 'ቅርጫትዎ ባዶ ነው'}</h4>
        <p class="empty-subtitle">${isEn ? 'Add some authentic dishes to start your order.' : 'የሚፈልጉትን ምግብ መርጠው ያክሉ።'}</p>
      </div>
    `;
    const btn = document.getElementById('openCheckoutBtn');
    if (btn) btn.disabled = true;
    updateCartCalculations();
    return;
  }

  const btn = document.getElementById('openCheckoutBtn');
  if (btn) btn.disabled = false;

  container.innerHTML = state.cart.map(item => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    const title = isEn ? item.name : (item.nameAm || item.name);

    return `
      <div class="cart-item" id="cart-item-${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://placehold.co/100x100/e2e8f0/0f172a?text=Food'">
        <div class="cart-item-details">
          <div style="display: flex; justify-content: space-between;">
            <strong class="cart-item-title">${title}</strong>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
          </div>
          <div class="cart-item-price">${itemTotal} ETB <span style="font-size: 0.75rem; color: var(--text-muted);">(${item.price} each)</span></div>
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
            <div class="qty-controls">
              <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
          </div>

          <input 
            type="text" 
            class="item-note-input" 
            placeholder="${isEn ? 'Special note (e.g., extra spicy)' : 'ልዩ ማሳሰቢያ (ለምሳሌ፦ ተጨማሪ ሚጥሚጣ)'}"
            value="${item.notes || ''}"
            onchange="updateItemNotes(${item.id}, this.value)"
          >
        </div>
      </div>
    `;
  }).join('');

  updateCartCalculations();
}

function updateCartCalculations() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let deliveryFee = state.cart.length > 0 ? 100 : 0;
  let discount = 0;

  if (state.appliedPromo) {
    if (state.appliedPromo.freeDelivery) {
      deliveryFee = 0;
    } else if (state.appliedPromo.discountPercent) {
      discount = subtotal * state.appliedPromo.discountPercent;
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  const subEl = document.getElementById('cartSubtotal');
  const feeEl = document.getElementById('cartDeliveryFee');
  const discRow = document.getElementById('discountRow');
  const totalEl = document.getElementById('cartTotal');

  if (subEl) subEl.textContent = `${subtotal.toFixed(2)} ETB`;
  if (feeEl) feeEl.textContent = `${deliveryFee.toFixed(2)} ETB`;

  if (discRow) {
    if (discount > 0 || (state.appliedPromo && state.appliedPromo.freeDelivery)) {
      discRow.style.display = 'flex';
      const discEl = document.getElementById('cartDiscount');
      if (discEl) discEl.textContent = `-${(discount || 100).toFixed(2)} ETB`;
    } else {
      discRow.style.display = 'none';
    }
  }

  if (totalEl) totalEl.textContent = `${grandTotal.toFixed(2)} ETB`;
}

function applyPromoCode() {
  const promoEl = document.getElementById('promoInput');
  if (!promoEl) return;
  const code = promoEl.value.trim().toUpperCase();
  const msg = document.getElementById('promoMessage');

  if (!code) {
    if (msg) {
      msg.style.display = 'block';
      msg.style.color = 'var(--danger)';
      msg.textContent = 'Please enter a promo code.';
    }
    return;
  }

  if (PROMO_CODES[code]) {
    state.appliedPromo = PROMO_CODES[code];
    if (msg) {
      msg.style.display = 'block';
      msg.style.color = 'var(--emerald)';
      msg.textContent = `✓ "${code}" applied: ${state.appliedPromo.desc}`;
    }
    updateCartCalculations();
    showToast(`Promo ${code} applied!`, 'success');
  } else {
    if (msg) {
      msg.style.display = 'block';
      msg.style.color = 'var(--danger)';
      msg.textContent = 'Invalid promo code. Try HABESHA10 or FREEDEL.';
    }
  }
}

function openCart() { document.getElementById('cartBackdrop')?.classList.add('open'); }
function closeCart() { document.getElementById('cartBackdrop')?.classList.remove('open'); }
function openHistory() { renderOrderHistory(); document.getElementById('historyBackdrop')?.classList.add('open'); }
function closeHistory() { document.getElementById('historyBackdrop')?.classList.remove('open'); }

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  closeCart();
  updateCheckoutSummary();
  document.getElementById('checkoutModalBackdrop')?.classList.add('open');
}

function closeCheckoutModal() { document.getElementById('checkoutModalBackdrop')?.classList.remove('open'); }

function updateCheckoutSummary() {
  const subCitySelect = document.getElementById('custSubCity');
  if (!subCitySelect) return;
  const selectedOption = subCitySelect.options[subCitySelect.selectedIndex];
  let fee = parseFloat(selectedOption?.dataset?.fee || 100);

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;

  if (state.appliedPromo) {
    if (state.appliedPromo.freeDelivery) fee = 0;
    else if (state.appliedPromo.discountPercent) discount = subtotal * state.appliedPromo.discountPercent;
  }

  const grandTotal = Math.max(0, subtotal + fee - discount);

  const feeEl = document.getElementById('checkoutDeliveryFee');
  const totalEl = document.getElementById('checkoutGrandTotal');
  if (feeEl) feeEl.textContent = `${fee.toFixed(2)} ETB`;
  if (totalEl) totalEl.textContent = `${grandTotal.toFixed(2)} ETB`;
}

function handleOrderSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const subCity = document.getElementById('custSubCity').value;
  const address = document.getElementById('custAddress').value.trim();
  const notes = document.getElementById('custNotes').value.trim();

  const phoneRegex = /^(?:\+251|0)[97]\d{8}$/;
  let isValid = true;

  if (!name) {
    document.getElementById('nameError')?.classList.add('visible');
    isValid = false;
  } else {
    document.getElementById('nameError')?.classList.remove('visible');
  }

  if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
    document.getElementById('phoneError')?.classList.add('visible');
    isValid = false;
  } else {
    document.getElementById('phoneError')?.classList.remove('visible');
  }

  if (!address) {
    document.getElementById('addressError')?.classList.add('visible');
    isValid = false;
  } else {
    document.getElementById('addressError')?.classList.remove('visible');
  }

  if (!isValid) return;

  const subCitySelect = document.getElementById('custSubCity');
  const selectedOption = subCitySelect.options[subCitySelect.selectedIndex];
  let deliveryFee = parseFloat(selectedOption.dataset.fee || 100);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;

  if (state.appliedPromo) {
    if (state.appliedPromo.freeDelivery) deliveryFee = 0;
    else if (state.appliedPromo.discountPercent) discount = subtotal * state.appliedPromo.discountPercent;
  }

  const grandTotal = subtotal + deliveryFee - discount;
  const orderId = 'ADE-' + Math.floor(10000 + Math.random() * 90000);

  const newOrder = {
    orderId,
    timestamp: new Date().toISOString(),
    customer: { name, phone, subCity, specificAddress: address, orderNotes: notes },
    items: JSON.parse(JSON.stringify(state.cart)),
    payment: {
      method: state.selectedPaymentMethod,
      status: state.selectedPaymentMethod === 'cash' ? 'Pending (Cash on Delivery)' : 'Paid',
      reference: 'TX-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    },
    pricing: { subtotal, deliveryFee, discount, grandTotal },
    status: 'pending',
    estimatedDelivery: '30-45 mins'
  };

  closeCheckoutModal();

  if (state.selectedPaymentMethod === 'telebirr') {
    simulateTelebirrPayment(newOrder);
  } else if (state.selectedPaymentMethod === 'cbe_birr') {
    simulateCBEPayment(newOrder);
  } else {
    finalizeOrder(newOrder);
  }
}

function simulateTelebirrPayment(order) {
  const modal = document.getElementById('paymentSimModalBackdrop');
  const title = document.getElementById('paymentModalTitle');
  const content = document.getElementById('paymentSimContent');
  if (!modal || !content) return;

  title.innerHTML = '📱 Telebirr Instant Pay';
  content.innerHTML = `
    <div style="padding: 1rem 0;">
      <div style="background: #0284c7; color: white; padding: 8px 16px; border-radius: var(--radius-full); display: inline-block; font-weight: 700; margin-bottom: 1rem;">
        Merchant Code: 994821
      </div>
      <div style="margin-bottom: 1.25rem;">
        <svg width="140" height="140" viewBox="0 0 100 100" style="background: white; padding: 6px; border-radius: 8px; box-shadow: var(--shadow-md);">
          <rect width="100" height="100" fill="none" stroke="#0f172a" stroke-width="3"/>
          <rect x="10" y="10" width="25" height="25" fill="#0284c7"/>
          <rect x="65" y="10" width="25" height="25" fill="#0284c7"/>
          <rect x="10" y="65" width="25" height="25" fill="#0284c7"/>
          <rect x="42" y="42" width="16" height="16" fill="#0f172a"/>
          <rect x="42" y="15" width="10" height="15" fill="#0f172a"/>
          <rect x="68" y="45" width="15" height="10" fill="#0f172a"/>
        </svg>
      </div>
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem;">
        USSD Push request sent to: <strong>${order.customer.phone}</strong>
      </p>
      <div style="font-family: 'JetBrains Mono'; font-size: 1.4rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem;">
        ${order.pricing.grandTotal.toFixed(2)} ETB
      </div>

      <button id="telebirrConfirmBtn" class="btn-checkout">
        ✓ Confirm PIN on Telebirr App (Simulate)
      </button>
    </div>
  `;

  modal.classList.add('open');

  document.getElementById('telebirrConfirmBtn').addEventListener('click', () => {
    modal.classList.remove('open');
    finalizeOrder(order);
  });
}

function simulateCBEPayment(order) {
  const modal = document.getElementById('paymentSimModalBackdrop');
  const title = document.getElementById('paymentModalTitle');
  const content = document.getElementById('paymentSimContent');
  if (!modal || !content) return;

  title.innerHTML = '🏦 Commercial Bank of Ethiopia (CBE Birr)';
  content.innerHTML = `
    <div style="padding: 1rem 0;">
      <div style="background: #7e22ce; color: white; padding: 8px 16px; border-radius: var(--radius-full); display: inline-block; font-weight: 700; margin-bottom: 1rem;">
        CBE Birr Shortcode: 48920
      </div>
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
        Please confirm payment transfer of <strong>${order.pricing.grandTotal.toFixed(2)} ETB</strong> from account associated with <strong>${order.customer.phone}</strong>.
      </p>
      <div style="font-family: 'JetBrains Mono'; font-size: 1.3rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem;">
        Ref: ${order.payment.reference}
      </div>

      <button id="cbeConfirmBtn" class="btn-checkout" style="background: #7e22ce;">
        ✓ Authenticate CBE Transfer (Simulate)
      </button>
    </div>
  `;

  modal.classList.add('open');

  document.getElementById('cbeConfirmBtn').addEventListener('click', () => {
    modal.classList.remove('open');
    finalizeOrder(order);
  });
}

function finalizeOrder(order) {
  state.orders.unshift(order);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(state.orders));

  state.cart = [];
  state.appliedPromo = null;
  saveCart();
  renderCart();
  updateCartBadge();

  state.lastPlacedOrder = order;

  playSound('success');
  openOrderConfirmModal(order);
}

function openOrderConfirmModal(order) {
  const idEl = document.getElementById('confirmedOrderId');
  if (idEl) idEl.textContent = `ORDER #${order.orderId}`;
  document.getElementById('orderConfirmModalBackdrop')?.classList.add('open');
  simulateLiveTrackingProgress();
}

function closeConfirmModal() { document.getElementById('orderConfirmModalBackdrop')?.classList.remove('open'); }

function simulateLiveTrackingProgress() {
  const bar = document.getElementById('liveProgressBar');
  const stepPlaced = document.getElementById('stepPlaced');
  const stepPreparing = document.getElementById('stepPreparing');
  const stepDelivering = document.getElementById('stepDelivering');
  const stepDelivered = document.getElementById('stepDelivered');
  const etaText = document.getElementById('liveEtaText');

  if (!bar) return;

  bar.style.width = '25%';
  if (stepPlaced) stepPlaced.className = 'tracker-step completed';
  if (stepPreparing) stepPreparing.className = 'tracker-step active';
  if (stepDelivering) stepDelivering.className = 'tracker-step';
  if (stepDelivered) stepDelivered.className = 'tracker-step';

  setTimeout(() => {
    bar.style.width = '55%';
    if (stepPreparing) stepPreparing.className = 'tracker-step completed';
    if (stepDelivering) stepDelivering.className = 'tracker-step active';
    if (etaText) etaText.textContent = '🛵 Rider Dispatched across Addis Ababa! (ETA: 15-20 mins)';
  }, 4000);

  setTimeout(() => {
    bar.style.width = '100%';
    if (stepDelivering) stepDelivering.className = 'tracker-step completed';
    if (stepDelivered) stepDelivered.className = 'tracker-step completed';
    if (etaText) etaText.textContent = '✅ Order Delivered! Bon Appétit / መልካም ምግብ!';
  }, 9000);
}

function openTaxInvoiceModal(order) {
  if (!order) return;
  const printArea = document.getElementById('invoicePrintArea');
  if (!printArea) return;
  const dateStr = new Date(order.timestamp).toLocaleString();

  printArea.innerHTML = `
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1.4; color: #000; background: #fff; padding: 10px; border: 1px dashed #ccc;">
      <div style="text-align: center; margin-bottom: 12px;">
        <h2 style="font-size: 16px; margin: 0; font-weight: bold;">ADDIS EATS RESTAURANT PLC</h2>
        <div>Addis Ababa, Ethiopia | Tel: +251 911 00 00 00</div>
        <div>TIN: 0019283746 | VAT Reg: 8492049</div>
        <div style="font-weight: bold; margin-top: 4px;">*** OFFICIAL TAX INVOICE / የግብር ደረሰኝ ***</div>
      </div>

      <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 6px 0; margin-bottom: 8px;">
        <div><strong>INVOICE NO:</strong> ${order.orderId}</div>
        <div><strong>DATE/TIME:</strong> ${dateStr}</div>
        <div><strong>CUSTOMER:</strong> ${order.customer.name} (${order.customer.phone})</div>
        <div><strong>LOCATION:</strong> ${order.customer.subCity}, ${order.customer.specificAddress}</div>
        <div><strong>PAYMENT:</strong> ${order.payment.method.toUpperCase()} (${order.payment.status})</div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
        <thead>
          <tr style="border-bottom: 1px solid #000; text-align: left;">
            <th>ITEM</th>
            <th style="text-align: center;">QTY</th>
            <th style="text-align: right;">PRICE</th>
            <th style="text-align: right;">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td style="text-align: center;">${item.quantity}</td>
              <td style="text-align: right;">${item.price.toFixed(2)}</td>
              <td style="text-align: right;">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="border-top: 1px dashed #000; padding-top: 6px;">
        <div style="display: flex; justify-content: space-between;">
          <span>FOOD SUBTOTAL:</span>
          <span>${order.pricing.subtotal.toFixed(2)} ETB</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>DELIVERY FEE (${order.customer.subCity}):</span>
          <span>${order.pricing.deliveryFee.toFixed(2)} ETB</span>
        </div>
        ${order.pricing.discount > 0 ? `
          <div style="display: flex; justify-content: space-between;">
            <span>DISCOUNT:</span>
            <span>-${order.pricing.discount.toFixed(2)} ETB</span>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; margin-top: 4px; border-top: 1px solid #000; padding-top: 4px;">
          <span>GRAND TOTAL (INCL. VAT):</span>
          <span>${order.pricing.grandTotal.toFixed(2)} ETB</span>
        </div>
      </div>

      <div style="text-align: center; margin-top: 14px; font-size: 10px;">
        THANK YOU FOR DINING WITH ADDIS EATS!<br>
        እባክዎ ደረሰኝዎን ይያዙ። / PLEASE RETAIN THIS RECEIPT
      </div>
    </div>
  `;

  document.getElementById('invoiceModalBackdrop')?.classList.add('open');
}

function closeTaxInvoiceModal() { document.getElementById('invoiceModalBackdrop')?.classList.remove('open'); }

function renderOrderHistory() {
  const container = document.getElementById('orderHistoryContainer');
  if (!container) return;
  const isEn = state.currentLang === 'en';

  if (state.orders.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 3rem 1rem;">
        <div class="empty-icon">📋</div>
        <h4 class="empty-title">${isEn ? 'No Past Orders' : 'ምንም ያለፈ ትዕዛዝ የለም'}</h4>
        <p class="empty-subtitle">${isEn ? 'Your placed orders will appear here for easy tracking and reordering.' : 'ያዘዟቸው ምግቦች እዚህ ዝርዝር ውስጥ ይቀመጣሉ።'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.orders.map(ord => {
    const date = new Date(ord.timestamp).toLocaleDateString();
    const statusClass = ord.status === 'delivered' ? 'color: var(--emerald);' : 'color: var(--primary);';

    return `
      <div style="border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px; margin-bottom: 12px; background: var(--bg-card);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <div>
            <strong style="font-family: 'JetBrains Mono'; color: var(--primary);">${ord.orderId}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${date} • ${ord.customer.subCity}</div>
          </div>
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; ${statusClass}">
            ● ${ord.status}
          </span>
        </div>

        <div style="font-size: 0.85rem; margin: 8px 0; color: var(--text-main);">
          ${ord.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border); padding-top: 8px; margin-top: 6px;">
          <strong style="font-family: 'JetBrains Mono'; font-size: 0.95rem;">${ord.pricing.grandTotal.toFixed(2)} ETB</strong>
          <div style="display: flex; gap: 6px;">
            <button class="btn-pill" style="font-size: 0.75rem; padding: 4px 8px;" onclick="openTaxInvoiceModal(state.orders.find(o => o.orderId === '${ord.orderId}'))">
              📄 ${isEn ? 'Receipt' : 'ደረሰኝ'}
            </button>
            <button class="btn-pill" style="font-size: 0.75rem; padding: 4px 8px; background: var(--primary-light); color: var(--primary);" onclick="reorderItems('${ord.orderId}')">
              🔁 ${isEn ? 'Reorder' : 'እንደገና አዝዝ'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function reorderItems(orderId) {
  const order = state.orders.find(o => o.orderId === orderId);
  if (!order) return;

  order.items.forEach(item => {
    const existing = state.cart.find(c => c.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      state.cart.push({ ...item });
    }
  });

  saveCart();
  renderCart();
  updateCartBadge();
  closeHistory();
  openCart();
  showToast('Past order items added to cart!', 'success');
}

function openDishDetailModal(dishId) {
  const dish = state.menu.find(d => d.id === dishId);
  if (!dish) return;

  const isEn = state.currentLang === 'en';
  const box = document.getElementById('dishDetailBox');
  if (!box) return;

  const isOutOfStock = dish.isAvailable === false;

  box.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">${isEn ? dish.name : (dish.nameAm || dish.name)}</h2>
      <button class="drawer-close-btn" onclick="closeDishDetailModal()">✕</button>
    </div>
    <div class="modal-body">
      <div style="position: relative; height: 220px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1rem;">
        <img src="${dish.image}" alt="${dish.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://placehold.co/400x300/e2e8f0/0f172a?text=${encodeURIComponent(dish.name)}'">
        ${isOutOfStock ? `
          <div class="sold-out-overlay">
            <span class="sold-out-badge">${isEn ? 'Sold Out / አልቋል' : 'አልቋል / Sold Out'}</span>
          </div>
        ` : ''}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <div class="dish-price" style="font-size: 1.4rem;">
          ${Number(dish.price).toFixed(2)} <span>ETB</span>
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">
          ⭐ <strong>${dish.rating || 4.9}</strong> (${dish.reviewsCount || 80} reviews)
        </div>
      </div>

      <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 1rem; line-height: 1.5;">
        ${isEn ? dish.description : (dish.descriptionAm || dish.description)}
      </p>

      ${dish.ingredients && dish.ingredients.length > 0 ? `
        <div style="margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-muted);">
            ${isEn ? 'KEY INGREDIENTS' : 'ዋና ይዘቶች'}
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${dish.ingredients.map(ing => `
              <span style="background: var(--bg-subtle); border: 1px solid var(--border); font-size: 0.75rem; padding: 4px 10px; border-radius: var(--radius-full);">
                ${ing}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
        <button 
          class="btn-checkout" 
          style="flex: 1; margin: 0;"
          onclick="addToCart(${dish.id}); closeDishDetailModal();"
          ${isOutOfStock ? 'disabled' : ''}
        >
          ${isOutOfStock ? 'Sold Out' : (isEn ? `Add to Cart (${dish.price} ETB)` : `ወደ ቅርጫት ጨምር (${dish.price} ብር)`)}
        </button>
      </div>
    </div>
  `;

  document.getElementById('dishDetailModalBackdrop')?.classList.add('open');
}

function closeDishDetailModal() { document.getElementById('dishDetailModalBackdrop')?.classList.remove('open'); }

function toggleFavorite(dishId) {
  if (state.favorites.includes(dishId)) {
    state.favorites = state.favorites.filter(id => id !== dishId);
    showToast('Removed from favorites', 'info');
  } else {
    state.favorites.push(dishId);
    showToast('Added to favorites! ❤️', 'success');
  }
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(state.favorites));
  renderCategoryTabs();
  renderMenu();
}

function toggleLanguage() {
  state.currentLang = state.currentLang === 'en' ? 'am' : 'en';
  localStorage.setItem(KEYS.LANG, state.currentLang);
  applyLanguage(state.currentLang);
  renderCategoryTabs();
  renderMenu();
  renderCart();
}

function applyLanguage(lang) {
  const isEn = lang === 'en';
  const label = document.getElementById('langLabel');
  if (label) label.textContent = isEn ? 'አማርኛ' : 'English';

  const dict = I18N[lang] || I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });
}

function toggleTheme() {
  state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem(KEYS.THEME, state.currentTheme);
  document.documentElement.setAttribute('data-theme', state.currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = state.currentTheme === 'light' ? '🌙' : '☀️';
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}