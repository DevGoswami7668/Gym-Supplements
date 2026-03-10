/* ========================================
   SUPPLEFUEL - Main JavaScript
   ======================================== */

/* --- DATA --- */
const products = [
  { name: "Gold Standard Whey", type: "Protein", goal: "Muscle Gain", price: 54.99, dose: "1 scoop post-workout", ingredients: "Whey Isolate, BCAAs", suitable: "Intermediate" },
  { name: "Creatine Monohydrate", type: "Creatine", goal: "Muscle Gain", price: 19.99, dose: "5g daily", ingredients: "Pure Creatine", suitable: "All Levels" },
  { name: "C4 Pre-Workout", type: "Pre-Workout", goal: "Energy", price: 39.99, dose: "1 scoop 30min before workout", ingredients: "Caffeine, Beta-Alanine", suitable: "Intermediate" },
  { name: "CLA Fat Burner", type: "Fat Burner", goal: "Fat Loss", price: 29.99, dose: "2 softgels with meals", ingredients: "Conjugated Linoleic Acid", suitable: "Beginner" },
  { name: "BCAA 5000", type: "Recovery", goal: "Recovery", price: 34.99, dose: "2 caps during workout", ingredients: "Leucine, Isoleucine, Valine", suitable: "All Levels" },
  { name: "Alpha Amino", type: "Recovery", goal: "Endurance", price: 44.99, dose: "1 scoop during workout", ingredients: "EAAs, Electrolytes", suitable: "Intermediate" },
  { name: "Omega-3 Fish Oil", type: "Vitamins", goal: "General Health", price: 14.99, dose: "2 softgels daily", ingredients: "EPA, DHA Omega-3", suitable: "Beginner" },
  { name: "Vitamin D3 + K2", type: "Vitamins", goal: "General Health", price: 12.99, dose: "1 capsule daily", ingredients: "Vitamin D3 5000IU, K2", suitable: "Beginner" },
  { name: "Vegan Protein", type: "Protein", goal: "Muscle Gain", price: 49.99, dose: "1 scoop post-workout", ingredients: "Pea Protein, Rice, Hemp", suitable: "Beginner" },
  { name: "Keto Burner PM", type: "Fat Burner", goal: "Fat Loss", price: 36.99, dose: "2 caps before sleep", ingredients: "L-Carnitine, Green Tea", suitable: "Intermediate" },
  { name: "Magnesium Glycinate", type: "Vitamins", goal: "Recovery", price: 16.99, dose: "2 caps before bed", ingredients: "Magnesium Glycinate 400mg", suitable: "All Levels" },
  { name: "Mass Gainer 5000", type: "Protein", goal: "Muscle Gain", price: 64.99, dose: "2 scoops post-workout", ingredients: "Whey, Casein, Oats", suitable: "Advanced" }
];

const guides = [
  { icon: "🍽️", title: "How to Build a Bulking Meal Plan", category: "Nutrition", level: "Beginner", time: "10 min", summary: "Learn the basics of bulking nutrition and how to structure your meals for maximum muscle growth.", takeaways: ["Calculate your daily caloric needs", "Balance protein, carbs, and fats", "Schedule meals around workouts", "Track progress weekly", "Adjust portions as needed"] },
  { icon: "💪", title: "Creatine: A Complete Beginner's Guide", category: "Beginner", level: "Beginner", time: "8 min", summary: "Everything you need to know about creatine monohydrate and how it enhances strength and performance.", takeaways: ["Creatine increases ATP production", "Take 5g daily consistently", "Stay hydrated while using it", "No loading phase necessary", "Safe for long-term use"] },
  { icon: "🔄", title: "How to Optimise Post-Workout Recovery", category: "Recovery", level: "Intermediate", time: "12 min", summary: "Maximize your recovery with proven strategies to reduce soreness and improve adaptation.", takeaways: ["Protein within 30 minutes", "Hydrate with electrolytes", "Get 7-9 hours of sleep", "Active rest days help", "Consider supplements like BCAAs"] },
  { icon: "⏰", title: "The Science of Protein Timing", category: "Nutrition", level: "Intermediate", time: "10 min", summary: "Does protein timing matter? Here's what the research says about anabolic windows.", takeaways: ["Total daily protein matters most", "Pre and post-workout protein both help", "20-40g per serving is optimal", "Spread protein throughout day", "Casein before bed supports recovery"] },
  { icon: "🔥", title: "How to Cut Fat Without Losing Muscle", category: "Cutting", level: "Intermediate", time: "15 min", summary: "Preserve hard-earned muscle while shedding body fat with these evidence-based strategies.", takeaways: ["Maintain a modest calorie deficit", "Keep protein intake high", "Train with weights", "Include cardio strategically", "Monitor progress closely"] },
  { icon: "🧪", title: "Supplement Stacking: What Works Together", category: "Nutrition", level: "Advanced", time: "12 min", summary: "Learn which supplements stack well together and which combinations to avoid.", takeaways: ["Creatine + Whey = muscle building", "Caffeine + L-Carnitine = fat loss", "Vitamin D + K2 = bone health", "Avoid conflicting stimulants", "Cycle certain supplements"] },
  { icon: "🏃", title: "Fuelling Your Cardio for Endurance", category: "Endurance", level: "Beginner", time: "9 min", summary: "Optimize your cardio sessions with proper nutrition and supplement timing.", takeaways: ["Carbs before cardio help performance", "Electrolytes prevent cramping", "BCAAs during long sessions", "Recovery nutrition after", "Stay hydrated before, during, after"] },
  { icon: "😴", title: "Sleep and Recovery: The Missing Variable", category: "Recovery", level: "Beginner", time: "7 min", summary: "Why sleep is the most underrated factor in fitness and how to optimize it.", takeaways: ["Aim for 7-9 hours quality sleep", "Magnesium aids relaxation", "Avoid screens before bed", "Consistent sleep schedule", "Cool, dark room ideal"] },
  { icon: "⚡", title: "Pre-Workout Ingredients Explained", category: "Nutrition", level: "Intermediate", time: "11 min", summary: "Understand what's in your pre-workout and how each ingredient helps your performance.", takeaways: ["Caffeine improves focus and energy", "Beta-Alanine reduces fatigue", "Citrulline enhances blood flow", "Theanine smooths caffeine crash", "Tolerance builds over time"] }
];

const stacks = {
  muscle: ["Gold Standard Whey", "Creatine Monohydrate", "Vitamin D3 + K2"],
  "fat-loss": ["CLA Fat Burner", "Omega-3 Fish Oil", "Magnesium Glycinate"],
  endurance: ["BCAA 5000", "Alpha Amino", "Vitamin D3 + K2"],
  recovery: ["Magnesium Glycinate", "Omega-3 Fish Oil", "Gold Standard Whey"]
};

const promoCodes = {
  "SAVE10": 0.10,
  "BULK20": 0.20,
  "NEW15": 0.15
};

/* --- CART STATE --- */
let cart = [];
let appliedPromo = null;

/* ========================================
   UTILITIES
   ======================================== */

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
}

function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error loading from localStorage:", e);
    return null;
  }
}

function getTodayKey() {
  const today = new Date();
  return `tracker_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

/* ========================================
   NAVBAR
   ======================================== */

function initNavbar() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const cartIcon = document.getElementById("cartIcon");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartClose = document.getElementById("cartClose");
  
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("navbar__links--open");
    });
  }
  
  if (cartIcon && cartSidebar) {
    cartIcon.addEventListener("click", () => {
      cartSidebar.classList.add("open");
      cartOverlay.classList.add("open");
    });
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }
  
  if (cartClose) {
    cartClose.addEventListener("click", closeCart);
  }
  
  updateCartBadge();
}

function closeCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  if (cartSidebar) cartSidebar.classList.remove("open");
  if (cartOverlay) cartOverlay.classList.remove("open");
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalItems;
  }
}

/* ========================================
   CART
   ======================================== */

function addToCart(product, qty = 1) {
  const existingItem = cart.find(item => item.name === product.name);
  
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  
  saveToStorage("cart", cart);
  saveToStorage("promoCode", appliedPromo);
  updateCartBadge();
  renderCart();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  saveToStorage("cart", cart);
  saveToStorage("promoCode", appliedPromo);
  updateCartBadge();
  renderCart();
}

function updateCartQty(productName, change) {
  const item = cart.find(item => item.name === productName);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      removeFromCart(productName);
      return;
    }
    saveToStorage("cart", cart);
    saveToStorage("promoCode", appliedPromo);
    updateCartBadge();
    renderCart();
  }
}

function clearCart() {
  cart = [];
  appliedPromo = null;
  saveToStorage("cart", cart);
  saveToStorage("promoCode", null);
  updateCartBadge();
  renderCart();
  showToast("Cart cleared!");
}

function applyPromoCode() {
  const input = document.getElementById("promoCode");
  const errorEl = document.getElementById("promoError");
  const code = input.value.trim().toUpperCase();
  
  if (promoCodes.hasOwnProperty(code)) {
    appliedPromo = code;
    saveToStorage("promoCode", appliedPromo);
    renderCart();
    if (errorEl) {
      errorEl.style.display = "none";
    }
    showToast(`Promo code ${code} applied!`);
  } else {
    if (errorEl) {
      errorEl.textContent = "Invalid code";
      errorEl.style.display = "block";
    }
  }
}

function renderCart() {
  const content = document.getElementById("cartContent");
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountRow = document.getElementById("discountRow");
  const discountEl = document.getElementById("cartDiscount");
  const totalEl = document.getElementById("cartTotal");
  const promoError = document.getElementById("promoError");
  
  if (!content) return;
  
  if (cart.length === 0) {
    content.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
  } else {
    content.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item__info">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">$${item.price.toFixed(2)}</div>
          <div class="cart-item__controls">
            <button class="cart-item__qty-btn" onclick="updateCartQty('${item.name}', -1)">−</button>
            <span class="cart-item__qty">${item.qty}</span>
            <button class="cart-item__qty-btn" onclick="updateCartQty('${item.name}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item__remove" onclick="removeFromCart('${item.name}')">&times;</button>
      </div>
    `).join("");
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = 0;
  
  if (appliedPromo && promoCodes[appliedPromo]) {
    discount = subtotal * promoCodes[appliedPromo];
    if (discountRow) discountRow.style.display = "flex";
    if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
    if (promoError) promoError.style.display = "none";
  } else {
    if (discountRow) discountRow.style.display = "none";
  }
  
  const total = subtotal - discount;
  
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function initCart() {
  const savedCart = loadFromStorage("cart");
  const savedPromo = loadFromStorage("promoCode");
  
  if (savedCart) {
    cart = savedCart;
  }
  
  if (savedPromo && promoCodes.hasOwnProperty(savedPromo)) {
    appliedPromo = savedPromo;
    const input = document.getElementById("promoCode");
    if (input) input.value = savedPromo;
  }
  
  renderCart();
  updateCartBadge();
  
  const applyBtn = document.getElementById("applyPromo");
  if (applyBtn) {
    applyBtn.addEventListener("click", applyPromoCode);
  }
  
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      showToast("Checkout coming soon!");
    });
  }
  
  const clearBtn = document.getElementById("clearCartBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

function initScroll() {
  // Fade-in animations
  const fadeElements = document.querySelectorAll(".fade-in");
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
  }
  
  // Back to top button
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });
    
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* ========================================
   HOME PAGE
   ======================================== */

function initHomePage() {
  // Daily Tracker
  initDailyTracker();
  
  // Comparison Tool
  initComparisonTool();
}

function initDailyTracker() {
  const checkboxes = document.querySelectorAll(".tracker-checkbox");
  const trackerBarFill = document.getElementById("trackerBarFill");
  const trackerCount = document.getElementById("trackerCount");
  
  if (!checkboxes.length) return;
  
  const todayKey = getTodayKey();
  const savedData = loadFromStorage(todayKey);
  
  if (savedData) {
    checkboxes.forEach(cb => {
      const supplement = cb.dataset.supplement;
      if (savedData.includes(supplement)) {
        cb.checked = true;
      }
    });
  }
  
  updateTrackerProgress();
  
  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      updateTrackerProgress();
      saveTrackerData();
    });
  });
  
  function updateTrackerProgress() {
    const checked = document.querySelectorAll(".tracker-checkbox:checked").length;
    const total = checkboxes.length;
    const percentage = (checked / total) * 100;
    
    if (trackerBarFill) {
      trackerBarFill.style.width = `${percentage}%`;
    }
    if (trackerCount) {
      trackerCount.textContent = checked;
    }
  }
  
  function saveTrackerData() {
    const checkedItems = [];
    checkboxes.forEach(cb => {
      if (cb.checked) {
        checkedItems.push(cb.dataset.supplement);
      }
    });
    saveToStorage(todayKey, checkedItems);
  }
}

function initComparisonTool() {
  const select1 = document.getElementById("compareSelect1");
  const select2 = document.getElementById("compareSelect2");
  const compareBtn = document.getElementById("compareBtn");
  const compareError = document.getElementById("compareError");
  const compareTable = document.getElementById("compareTable");
  
  if (!select1 || !select2) return;
  
  // Populate dropdowns
  products.forEach(p => {
    const opt1 = document.createElement("option");
    opt1.value = p.name;
    opt1.textContent = p.name;
    select1.appendChild(opt1);
    
    const opt2 = document.createElement("option");
    opt2.value = p.name;
    opt2.textContent = p.name;
    select2.appendChild(opt2);
  });
  
  if (compareBtn) {
    compareBtn.addEventListener("click", () => {
      const val1 = select1.value;
      const val2 = select2.value;
      
      if (compareError) compareError.style.display = "none";
      
      if (!val1 || !val2) {
        return;
      }
      
      if (val1 === val2) {
        if (compareError) {
          compareError.textContent = "Please select two different supplements.";
          compareError.style.display = "block";
        }
        if (compareTable) compareTable.style.display = "none";
        return;
      }
      
      const product1 = products.find(p => p.name === val1);
      const product2 = products.find(p => p.name === val2);
      
      if (product1 && product2 && compareTable) {
        compareTable.style.display = "block";
        compareTable.innerHTML = `
          <table>
            <tr>
              <th></th>
              <td>${product1.name}</td>
              <td>${product2.name}</td>
            </tr>
            <tr>
              <th>Goal</th>
              <td>${product1.goal}</td>
              <td>${product2.goal}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>${product1.type}</td>
              <td>${product2.type}</td>
            </tr>
            <tr>
              <th>Key Ingredients</th>
              <td>${product1.ingredients}</td>
              <td>${product2.ingredients}</td>
            </tr>
            <tr>
              <th>Dose</th>
              <td>${product1.dose}</td>
              <td>${product2.dose}</td>
            </tr>
            <tr>
              <th>Best Time</th>
              <td>${product1.dose.split(" ")[2] || "Daily"}</td>
              <td>${product2.dose.split(" ")[2] || "Daily"}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>$${product1.price.toFixed(2)}</td>
              <td>$${product2.price.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Suitable For</th>
              <td>${product1.suitable}</td>
              <td>${product2.suitable}</td>
            </tr>
          </table>
        `;
      }
    });
  }
}

/* ========================================
   SHOP PAGE
   ======================================== */

function initShopPage() {
  // Read URL params
  const urlParams = new URLSearchParams(window.location.search);
  const goalParam = urlParams.get("goal");
  
  if (goalParam) {
    const goalFilter = document.getElementById("goalFilter");
    if (goalFilter) {
      // Map URL param to display value
      const goalMap = {
        "muscle-gain": "Muscle Gain",
        "fat-loss": "Fat Loss",
        "endurance": "Endurance",
        "recovery": "Recovery",
        "energy": "Energy",
        "general-health": "General Health"
      };
      goalFilter.value = goalMap[goalParam] || "";
    }
  }
  
  // Render initial products
  renderProducts(products);
  
  // Setup filters
  setupShopFilters();
  
  // Setup modal
  initProductModal();
}

function renderProducts(productsArray) {
  const grid = document.getElementById("productGrid");
  const noResults = document.getElementById("noResults");
  
  if (!grid) return;
  
  if (productsArray.length === 0) {
    grid.innerHTML = "";
    if (noResults) noResults.style.display = "block";
    return;
  }
  
  if (noResults) noResults.style.display = "none";
  
  grid.innerHTML = productsArray.map(p => `
    <div class="product-card">
      <div class="product-card__header">
        <div class="product-card__badges">
          <span class="badge product-card__type-badge">${p.type}</span>
          <span class="badge product-card__goal-badge">${p.goal}</span>
        </div>
        <h3 class="product-card__name">${p.name}</h3>
        <span class="badge badge--${p.suitable.toLowerCase().replace(" ", "-")}">${p.suitable}</span>
      </div>
      <div class="product-card__price">$${p.price.toFixed(2)}</div>
      <p class="product-card__ingredients">${p.ingredients}</p>
      <div class="product-card__actions">
        <button class="btn-outline" onclick="openProductModal('${p.name}')">Details</button>
        <button class="btn-primary" onclick="addToCartFromShop('${p.name}')">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

function addToCartFromShop(productName) {
  const product = products.find(p => p.name === productName);
  if (product) {
    addToCart(product);
  }
}

function setupShopFilters() {
  const searchInput = document.getElementById("searchInput");
  const goalFilter = document.getElementById("goalFilter");
  const typeFilter = document.getElementById("typeFilter");
  const sortFilter = document.getElementById("sortFilter");
  
  const filterInputs = [searchInput, goalFilter, typeFilter, sortFilter];
  
  filterInputs.forEach(input => {
    if (input) {
      input.addEventListener("input", applyFilters);
    }
  });
}

function applyFilters() {
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const goal = document.getElementById("goalFilter")?.value || "";
  const type = document.getElementById("typeFilter")?.value || "";
  const sort = document.getElementById("sortFilter")?.value || "default";
  
  let filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search) || 
                         p.ingredients.toLowerCase().includes(search);
    const matchesGoal = !goal || p.goal === goal;
    const matchesType = !type || p.type === type;
    
    return matchesSearch && matchesGoal && matchesType;
  });
  
  // Sort
  if (sort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "name-az") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  renderProducts(filtered);
}

let currentModalQty = 1;

function initProductModal() {
  const modal = document.getElementById("productModal");
  const closeBtn = document.getElementById("modalClose");
  
  if (closeBtn) {
    closeBtn.addEventListener("click", closeProductModal);
  }
  
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProductModal();
      }
    });
  }
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
    }
  });
}

function openProductModal(productName) {
  const product = products.find(p => p.name === productName);
  const modal = document.getElementById("productModal");
  const content = document.getElementById("modalContent");
  
  if (!product || !content || !modal) return;
  
  currentModalQty = 1;
  
  content.innerHTML = `
    <div class="modal__header">
      <div class="modal__badges">
        <span class="badge product-card__type-badge">${product.type}</span>
        <span class="badge product-card__goal-badge">${product.goal}</span>
      </div>
      <h2 class="modal__title">${product.name}</h2>
      <span class="badge badge--${product.suitable.toLowerCase().replace(" ", "-")}">${product.suitable}</span>
    </div>
    <div class="modal__price">$${product.price.toFixed(2)}</div>
    <div class="modal__details">
      <div class="modal__detail-row">
        <span class="modal__detail-label">Ingredients</span>
        <span class="modal__detail-value">${product.ingredients}</span>
      </div>
      <div class="modal__detail-row">
        <span class="modal__detail-label">Dosage</span>
        <span class="modal__detail-value">${product.dose}</span>
      </div>
      <div class="modal__detail-row">
        <span class="modal__detail-label">Best Time</span>
        <span class="modal__detail-value">${product.dose.split(" ")[2] || "Daily"}</span>
      </div>
      <div class="modal__detail-row">
        <span class="modal__detail-label">Suitable For</span>
        <span class="modal__detail-value">${product.suitable}</span>
      </div>
    </div>
    <div class="modal__qty">
      <label class="modal__qty-label">Quantity</label>
      <div class="qty-stepper">
        <button type="button" class="qty-stepper__btn" onclick="updateModalQty(-1)">−</button>
        <span class="qty-stepper__value" id="modalQtyValue">1</span>
        <button type="button" class="qty-stepper__btn" onclick="updateModalQty(1)">+</button>
      </div>
    </div>
    <div class="modal__actions">
      <button class="btn-primary" onclick="addModalToCart('${product.name}')">Add to Cart</button>
    </div>
  `;
  
  modal.classList.add("open");
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) {
    modal.classList.remove("open");
  }
}

function updateModalQty(change) {
  currentModalQty += change;
  if (currentModalQty < 1) currentModalQty = 1;
  if (currentModalQty > 10) currentModalQty = 10;
  
  const qtyEl = document.getElementById("modalQtyValue");
  if (qtyEl) qtyEl.textContent = currentModalQty;
}

function addModalToCart(productName) {
  const product = products.find(p => p.name === productName);
  if (product) {
    addToCart(product, currentModalQty);
    closeProductModal();
  }
}

/* ========================================
   GUIDES PAGE
   ======================================== */

function initGuidesPage() {
  renderGuides(guides);
  setupGuideFilters();
  setupAccordions();
  setupStackButtons();
}

function renderGuides(guidesArray) {
  const grid = document.getElementById("guideGrid");
  const noResults = document.getElementById("noResults");
  
  if (!grid) return;
  
  if (guidesArray.length === 0) {
    grid.innerHTML = "";
    if (noResults) noResults.style.display = "block";
    return;
  }
  
  if (noResults) noResults.style.display = "none";
  
  grid.innerHTML = guidesArray.map((g, index) => `
    <div class="guide-card">
      <div class="guide-card__header">
        <span class="guide-card__icon">${g.icon}</span>
        <div class="guide-card__meta">
          <span class="badge badge--${g.level.toLowerCase()}">${g.level}</span>
          <span class="guide-card__time">⏱ ${g.time}</span>
        </div>
      </div>
      <h3 class="guide-card__title">${g.title}</h3>
      <p class="guide-card__summary">${g.summary}</p>
      <button class="btn-outline guide-card__btn" onclick="toggleGuideAccordion(${index})">Read Guide</button>
      <div class="guide-accordion" id="guide-accordion-${index}">
        <div class="guide-accordion__content">
          <h4 class="guide-accordion__title">Key Takeaways</h4>
          <ul class="guide-accordion__list">
            ${g.takeaways.map(t => `<li>${t}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `).join("");
}

let openAccordionIndex = null;

function toggleGuideAccordion(index) {
  const accordion = document.getElementById(`guide-accordion-${index}`);
  const btn = document.querySelectorAll(".guide-card__btn")[index];
  
  if (!accordion || !btn) return;
  
  if (openAccordionIndex !== null && openAccordionIndex !== index) {
    const prevAccordion = document.getElementById(`guide-accordion-${openAccordionIndex}`);
    const prevBtn = document.querySelectorAll(".guide-card__btn")[openAccordionIndex];
    if (prevAccordion) prevAccordion.classList.remove("open");
    if (prevBtn) {
      prevBtn.classList.remove("open");
      prevBtn.textContent = "Read Guide";
    }
  }
  
  const isOpen = accordion.classList.contains("open");
  
  if (isOpen) {
    accordion.classList.remove("open");
    btn.classList.remove("open");
    btn.textContent = "Read Guide";
    openAccordionIndex = null;
  } else {
    accordion.classList.add("open");
    btn.classList.add("open");
    btn.textContent = "Close Guide";
    openAccordionIndex = index;
  }
}

function setupGuideFilters() {
  const searchInput = document.getElementById("searchInput");
  const filterPills = document.querySelectorAll(".filter-pill");
  
  if (searchInput) {
    searchInput.addEventListener("input", applyGuideFilters);
  }
  
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("filter-pill--active"));
      pill.classList.add("filter-pill--active");
      applyGuideFilters();
    });
  });
}

function applyGuideFilters() {
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const activePill = document.querySelector(".filter-pill--active");
  const category = activePill?.dataset.category || "all";
  
  const filtered = guides.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(search) || 
                          g.summary.toLowerCase().includes(search);
    const matchesCategory = category === "all" || 
                           g.category === category || 
                           g.level === category;
    
    return matchesSearch && matchesCategory;
  });
  
  renderGuides(filtered);
}

function setupStackButtons() {
  const stackBtns = document.querySelectorAll(".stack-card__btn");
  
  stackBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const stackType = btn.dataset.stack;
      const stackProducts = stacks[stackType];
      
      if (stackProducts) {
        stackProducts.forEach(productName => {
          const product = products.find(p => p.name === productName);
          if (product) {
            addToCart(product);
          }
        });
        showToast("Stack added ✅");
      }
    });
  });
}

function setupAccordions() {
  // FAQ Accordions
  const faqItems = document.querySelectorAll(".faq-item");
  
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-item__question");
    const answer = item.querySelector(".faq-item__answer");
    
    if (question && answer) {
      question.addEventListener("click", () => {
        const isOpen = question.classList.contains("open");
        
        // Close all others
        faqItems.forEach(otherItem => {
          const otherQuestion = otherItem.querySelector(".faq-item__question");
          const otherAnswer = otherItem.querySelector(".faq-item__answer");
          if (otherQuestion && otherQuestion !== question) {
            otherQuestion.classList.remove("open");
          }
          if (otherAnswer && otherAnswer !== answer) {
            otherAnswer.classList.remove("open");
          }
        });
        
        if (isOpen) {
          question.classList.remove("open");
          answer.classList.remove("open");
        } else {
          question.classList.add("open");
          answer.classList.add("open");
        }
      });
    }
  });
}

/* ========================================
   SELL PAGE
   ======================================== */

function initSellPage() {
  const form = document.getElementById("sellForm");
  if (!form) return;
  
  const fields = {
    productName: { el: document.getElementById("productName"), required: true },
    brand: { el: document.getElementById("brand"), required: true },
    category: { el: document.getElementById("category"), required: true },
    goal: { el: document.getElementById("goal"), required: true },
    condition: { el: document.getElementById("condition"), required: true },
    expiryDate: { el: document.getElementById("expiryDate"), required: true },
    quantity: { el: document.getElementById("quantity"), required: true, min: 1 },
    price: { el: document.getElementById("price"), required: true, min: 0.01 },
    description: { el: document.getElementById("description"), required: true, minLength: 30 },
    photoUpload: { el: document.getElementById("photoUpload"), required: true, type: "image" },
    yourName: { el: document.getElementById("yourName"), required: true },
    yourEmail: { el: document.getElementById("yourEmail"), required: true, email: true },
    phone: { el: document.getElementById("phone"), required: false }
  };
  
  // Character counter
  const descriptionEl = fields.description.el;
  const charCount = document.getElementById("charCount");
  
  if (descriptionEl && charCount) {
    descriptionEl.addEventListener("input", () => {
      const count = descriptionEl.value.length;
      charCount.textContent = count;
      
      const counter = charCount.parentElement;
      if (count >= 30) {
        counter.classList.add("valid");
        counter.classList.remove("warning");
      } else if (count >= 20) {
        counter.classList.add("warning");
        counter.classList.remove("valid");
      } else {
        counter.classList.remove("warning", "valid");
      }
      
      validateField("description");
      updateSubmitButton();
    });
  }
  
  // Blur validation
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (field.el) {
      field.el.addEventListener("blur", () => validateField(key));
    }
  });
  
  function validateField(key) {
    const field = fields[key];
    const value = field.el?.value?.trim() || "";
    const errorEl = document.getElementById(`${key}Error`);
    
    let error = "";
    
    if (field.required && !value) {
      error = "This field is required";
    } else if (key === "expiryDate" && value) {
      const inputDate = new Date(value);
      const today = new Date();
      today.setDate(today.getDate() + 30);
      if (inputDate < today) {
        error = "Expiry date must be at least 30 days from today";
      }
    } else if (key === "quantity" && value) {
      if (parseFloat(value) < 1) {
        error = "Quantity must be at least 1";
      }
    } else if (key === "price" && value) {
      if (parseFloat(value) <= 0) {
        error = "Price must be greater than 0";
      }
    } else if (key === "description" && value) {
      if (value.length < 30) {
        error = `Description must be at least 30 characters (${30 - value.length} more)`;
      }
    } else if (key === "photoUpload" && field.el?.files?.length) {
      const file = field.el.files[0];
      if (!file.type.startsWith("image/")) {
        error = "Please upload an image file";
      }
    } else if (key === "yourEmail" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    }
    
    if (errorEl) {
      errorEl.textContent = error;
    }
    if (field.el) {
      field.el.classList.toggle("input-error", !!error);
    }
    
    return !error;
  }
  
  function updateSubmitButton() {
    const submitBtn = document.getElementById("submitBtn");
    if (!submitBtn) return;
    
    let allValid = true;
    
    for (const key in fields) {
      if (fields[key].required && !validateField(key)) {
        allValid = false;
        break;
      }
    }
    
    submitBtn.disabled = !allValid;
  }
  
  // Expiry date min
  const expiryDateEl = fields.expiryDate.el;
  if (expiryDateEl) {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    expiryDateEl.min = today.toISOString().split("T")[0];
  }
  
  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let allValid = true;
    for (const key in fields) {
      if (!validateField(key)) {
        allValid = false;
      }
    }
    
    if (!allValid) return;
    
    // Add to products array
    const newProduct = {
      name: fields.productName.el.value,
      type: fields.category.el.value,
      goal: fields.goal.el.value,
      price: parseFloat(fields.price.el.value),
      dose: `${fields.quantity.el.value} ${fields.condition.el.value.toLowerCase()}`,
      ingredients: fields.description.el.value.substring(0, 50),
      suitable: "All Levels"
    };
    
    products.push(newProduct);
    
    // Show success
    form.style.display = "none";
    const successMsg = document.getElementById("successMessage");
    if (successMsg) {
      successMsg.style.display = "block";
    }
  });
}

/* ========================================
   CONTACT PAGE
   ======================================== */

function initContactPage() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  
  const fields = {
    fullName: { el: document.getElementById("fullName"), required: true },
    email: { el: document.getElementById("email"), required: true, email: true },
    subject: { el: document.getElementById("subject"), required: true },
    message: { el: document.getElementById("message"), required: true }
  };
  
  // Blur validation
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (field.el) {
      field.el.addEventListener("blur", () => validateContactField(key));
    }
  });
  
  function validateContactField(key) {
    const field = fields[key];
    const value = field.el?.value?.trim() || "";
    const errorEl = document.getElementById(`${key}Error`);
    
    let error = "";
    
    if (field.required && !value) {
      error = "This field is required";
    } else if (key === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    }
    
    if (errorEl) {
      errorEl.textContent = error;
    }
    if (field.el) {
      field.el.classList.toggle("input-error", !!error);
    }
    
    return !error;
  }
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let allValid = true;
    for (const key in fields) {
      if (!validateContactField(key)) {
        allValid = false;
      }
    }
    
    if (!allValid) return;
    
    // Show success
    form.style.display = "none";
    const successMsg = document.getElementById("contactSuccess");
    if (successMsg) {
      successMsg.style.display = "block";
    }
  });
  
  // FAQ already handled in setupAccordions
}

/* ========================================
   INITIALIZATION
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Common initializations
  initNavbar();
  initCart();
  initScroll();
  
  // Page-specific initializations
  const path = window.location.pathname;
  
  if (path.includes("index.html") || path === "/" || path.endsWith("/")) {
    initHomePage();
  } else if (path.includes("shop.html")) {
    initShopPage();
  } else if (path.includes("guides.html")) {
    initGuidesPage();
  } else if (path.includes("sell.html")) {
    initSellPage();
  } else if (path.includes("contact.html")) {
    initContactPage();
  }
});

