// Premium Mock Product Array with accurate assets
const products = [
    {
        id: 1,
        name: "AeroBounce-X Cyber Kicks",
        category: "Shoes",
        price: 129,
        description: "Zero-gravity comfort meets structural techwear profiles. Breathable architectural mesh frames paired with radioactive neon kinetic stabilization modules make this a definitive street artifact.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        frames: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80", 
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80", 
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80", 
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80"  
        ]
    },
    {
        id: 2,
        name: "Retro-Future Boxy Tee",
        category: "T-Shirts",
        price: 45,
        description: "Heavyweight 240 GSM unbleached carded cotton cotton silhouette. Crafted with drop-shoulder aesthetics, boxy fits, and clean tactical hems that frame movement perfectly.",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        frames: [
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80", 
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80", 
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80", 
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"  
        ]
    },
    {
        id: 3,
        name: "Vandal Matrix Sunglasses",
        category: "Accessories",
        price: 35,
        description: "Advanced UV400 spectrum armor wrapped inside an ultra-sleek rimless framework. Designed for extreme visual clarity in bright sun or dark underground settings.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        frames: [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80", 
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80", 
            "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80", 
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"  
        ]
    }
];

// App global state configuration
let isLoggedIn = false; 
let currentSelectedProduct = null;
let shoppingCart = []; 
let userProfile = {
    name: "",
    email: "",
    address: "C/O Vitasha HQ, Desk 42, Cyber Hub"
};

let activeRatings = {
    home: 0,
    order: 0
};

let activeDiscount = {
    code: "",
    type: "none",
    value: 0
};

let userWalletBalance = 0.00; 
let gatewayFlowContext = "checkout"; 
let pendingWalletTopUpAmount = 0;
let currentAppTheme = "dark"; 

let activeCheckoutSession = {
    name: "",
    address: "",
    paymentMethod: "",
    calculatedTotal: 0
};

let upiCountdownTimer = null;

// Dynamic Image Cover URL Resource Node
const lifestyleCoverUrl = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80";

function paintDynamicHeroCover() {
    const heroElement = document.getElementById('main-hero-banner');
    if (!heroElement) return;

    if (currentAppTheme === "dark") {
        heroElement.style.backgroundImage = `linear-gradient(to right, rgba(9, 9, 11, 0.95) 40%, rgba(9, 9, 11, 0.25) 100%), url('${lifestyleCoverUrl}')`;
        heroElement.style.borderColor = "#18181b";
    } else {
        heroElement.style.backgroundImage = `linear-gradient(to right, rgba(255, 255, 255, 0.95) 45%, rgba(255, 255, 255, 0.15) 100%), url('${lifestyleCoverUrl}')`;
        heroElement.style.borderColor = "#e4e4e7";
    }
}

function toggleThemeConfigurationProtocol() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle-btn');
    
    if (currentAppTheme === "dark") {
        currentAppTheme = "light";
        body.classList.remove('theme-dark', 'bg-zinc-950', 'text-zinc-50');
        body.classList.add('theme-light', 'bg-zinc-50', 'text-zinc-900');
        themeBtn.innerHTML = `<i data-lucide="moon" class="w-4 h-4"></i>`;
    } else {
        currentAppTheme = "dark";
        body.classList.remove('theme-light', 'bg-zinc-50', 'text-zinc-900');
        body.classList.add('theme-dark', 'bg-zinc-950', 'text-zinc-50');
        themeBtn.innerHTML = `<i data-lucide="sun" class="w-4 h-4"></i>`;
    }
    
    paintDynamicHeroCover();
    lucide.createIcons();
    renderHomepage();
    
    if(currentSelectedProduct) {
        viewProduct(currentSelectedProduct.id);
    }
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
    document.getElementById(`${viewId}-view`).classList.remove('hidden');
    
    if(viewId !== 'payment-gateway' && upiCountdownTimer) {
        clearInterval(upiCountdownTimer);
    }

    if(window.location.hash !== "#shop-grid" || viewId !== 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function openSignupModal() {
    document.getElementById('signup-modal').classList.remove('hidden');
}

function closeSignupModal() {
    document.getElementById('signup-modal').classList.add('hidden');
}

function toggleUserDropdown() {
    const menu = document.getElementById('user-dropdown-menu');
    if (menu) menu.classList.toggle('hidden');
}

function toggleHomepageFeedback(shouldOpen) {
    const modal = document.getElementById('homepage-feedback-modal');
    if (shouldOpen) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
        resetStarGraphics('home');
        document.getElementById('home-feedback-msg').value = "";
    }
}

function toggleCartDrawer(shouldOpen) {
    const drawer = document.getElementById('cart-drawer-overlay');
    if (shouldOpen) {
        renderCartDrawer();
        drawer.classList.remove('hidden');
    } else {
        drawer.classList.add('hidden');
    }
}

window.addEventListener('click', function(e) {
    const container = document.getElementById('nav-auth-container');
    const menu = document.getElementById('user-dropdown-menu');
    if (container && !container.contains(e.target) && menu) {
        menu.classList.add('hidden');
    }
});

function updateAuthNavbar() {
    const container = document.getElementById('nav-auth-container');
    const isDark = (currentAppTheme === "dark");
    if (isLoggedIn) {
        container.innerHTML = `
            <button onclick="toggleUserDropdown()" class="text-[10px] sm:text-xs ${isDark ? 'bg-zinc-900/90 border-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-800 border-zinc-300'} border hover:opacity-85 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-mono flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none tracking-wider transition-all duration-300">
                <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-lime-400 rounded-full"></span> @${userProfile.name} <span class="text-[8px] sm:text-[9px] text-zinc-500">▼</span>
            </button>
            <div id="user-dropdown-menu" class="hidden absolute right-0 mt-3 w-44 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'} border rounded-2xl overflow-hidden py-1.5 z-50 animate-fade-in backdrop-blur-md">
                <button onclick="showView('profile'); toggleUserDropdown();" class="w-full text-left px-4 py-2.5 text-xs ${isDark ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'text-zinc-700 hover:bg-zinc-100 hover:text-black'} transition cursor-pointer flex items-center gap-2"><i data-lucide="settings" class="w-3.5 h-3.5 text-zinc-500"></i> Settings Log</button>
                <hr class="${isDark ? 'border-zinc-800' : 'border-zinc-200'} my-1">
                <button onclick="handleLogout()" class="w-full text-left px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 transition font-bold cursor-pointer flex items-center gap-2"><i data-lucide="log-out" class="w-3.5 h-3.5"></i> Clear Protocol</button>
            </div>
        `;
    } else {
        container.innerHTML = `
            <button onclick="openSignupModal()" class="bg-white text-black px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-[9px] sm:text-[10px] tracking-widest uppercase hover:bg-lime-400 hover:text-black hover:scale-105 transition-all duration-300 shadow-xl shadow-lime-400/10 cursor-pointer">Join</button>
        `;
    }
    lucide.createIcons();
}

function handleSignup(event) {
    event.preventDefault();
    userProfile.name = document.getElementById('signup-username').value.replace(/[^a-zA-Z0-9_]/g, '');
    userProfile.email = document.getElementById('signup-email').value;
    isLoggedIn = true;
    
    document.getElementById('prof-name').value = userProfile.name;
    document.getElementById('prof-email').value = userProfile.email;
    document.getElementById('prof-address').value = userProfile.address;

    updateAuthNavbar();
    syncWalletDOMDisplay();
    closeSignupModal();

    if (shoppingCart.length > 0) {
        goToCheckout();
    }
}

function handleLogout() {
    isLoggedIn = false;
    userProfile.name = "";
    userProfile.email = "";
    shoppingCart = [];
    resetPromoState();
    updateCartBadge();

    document.getElementById('prof-name').value = "";
    document.getElementById('prof-email').value = "";
    document.getElementById('signup-form').reset();

    updateAuthNavbar();
    showView('home');
}

// Save profile fields updates details value properties
function saveProfile() {
    userProfile.name = document.getElementById('prof-name').value;
    userProfile.email = document.getElementById('prof-email').value;
    userProfile.address = document.getElementById('prof-address').value;
    updateAuthNavbar();
    alert("Identity files written successfully.");
}

function renderHomepage() {
    const productList = document.getElementById('product-list');
    const isDark = (currentAppTheme === "dark");
    
    productList.innerHTML = products.map(product => `
        <div class="bg-zinc-900/30 border border-zinc-900 rounded-3xl overflow-hidden group hover:border-zinc-800 transition-all duration-500 flex flex-col justify-between shadow-lg shadow-black/20">
            <div class="p-5">
                <div class="w-full h-64 sm:h-72 ${isDark ? 'bg-zinc-950/80 border-zinc-900' : 'bg-zinc-100 border-zinc-200'} rounded-2xl overflow-hidden mb-5 relative flex items-center justify-center border">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <span class="absolute top-4 left-4 bg-zinc-950/90 border border-zinc-900 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-mono tracking-widest text-lime-400 uppercase card-tag-pill">${product.category}</span>
                </div>
                <h3 class="font-bold text-lg text-white mb-1.5 group-hover:text-lime-400 transition-colors duration-300 tracking-tight uppercase">${product.name}</h3>
                <p class="text-zinc-500 text-xs leading-relaxed line-clamp-2">${product.description}</p>
            </div>
            <div class="p-5 pt-0 flex justify-between items-center">
                <span class="text-xl font-black text-white font-mono">$${product.price}</span>
                <button onclick="viewProduct(${product.id})" class="bg-zinc-900 hover:bg-white hover:text-black border border-zinc-800 hover:border-white text-zinc-300 text-[10px] font-black tracking-widest px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-300 uppercase cursor-pointer flex items-center gap-1">Inspect <i data-lucide="scan" class="w-3 h-3"></i></button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function rotate360Frame(frameIndex) {
    if(!currentSelectedProduct) return;
    const viewImg = document.getElementById('viewer-360-frame');
    if (viewImg && currentSelectedProduct.frames[frameIndex]) {
        viewImg.src = currentSelectedProduct.frames[frameIndex];
    }
}

// FIXED cross device adaptive 360 viewer shell responsive columns layout
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    currentSelectedProduct = product;
    const isDark = (currentAppTheme === "dark");
    
    const container = document.getElementById('product-detail-container');
    container.innerHTML = `
        <div class="lg:col-span-7 bg-zinc-900 p-4 sm:p-6 rounded-3xl border border-zinc-800 flex flex-col justify-between items-center min-h-[340px] sm:min-h-[460px] shadow-2xl w-full">
            <div class="w-full h-60 sm:h-80 bg-zinc-950 rounded-2xl overflow-hidden relative flex items-center justify-center border border-zinc-900/60">
                <img id="viewer-360-frame" src="${product.frames[0]}" alt="${product.name}" 
                     class="w-full h-full object-contain select-none pointer-events-none ${isDark ? 'mix-blend-screen' : ''}">
                <span class="absolute top-3 right-3 bg-zinc-900/90 border border-zinc-800 text-zinc-400 backdrop-blur-md text-[8px] sm:text-[9px] font-mono px-2 sm:px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1.5 shadow-xl font-bold"><span class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span> 360° Object</span>
            </div>
            <div class="w-full px-1 mt-4 sm:mt-6">
                <div class="flex justify-between text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-widest text-zinc-500 mb-2">
                    <span>◄ Drag Track to Rotate Object</span>
                    <span>Perspectives: 0${product.frames.length}</span>
                </div>
                <input type="range" min="0" max="${product.frames.length - 1}" value="0" 
                       class="w-full accent-lime-400 h-1.5 bg-zinc-950 rounded-lg appearance-none cursor-pointer"
                       oninput="rotate360Frame(this.value)">
            </div>
        </div>

        <div class="lg:col-span-5 flex flex-col justify-center pt-2 lg:pt-8 w-full">
            <span class="text-lime-400 font-mono font-bold tracking-widest text-[10px] uppercase mb-2 sm:mb-3">// Category: ${product.category}</span>
            <h1 class="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-3 sm:mb-4 text-white">${product.name}</h1>
            <p class="text-2xl sm:text-3xl font-black text-white font-mono mb-4 sm:mb-6 border-b border-zinc-900 pb-4">$${product.price}.00 <span class="text-[10px] text-zinc-500 font-normal font-sans tracking-normal">USD Global Access</span></p>
            <p class="text-zinc-400 text-xs sm:text-sm mb-6 sm:mb-10 leading-relaxed text-justify">${product.description}</p>
            
            <button onclick="addItemToCart(${product.id})" class="w-full bg-lime-400 text-black font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-center uppercase tracking-widest hover:bg-lime-300 hover:scale-[1.02] transition-all duration-300 text-xs cursor-pointer shadow-xl shadow-lime-400/5 flex items-center justify-center gap-2">
                Add To Allocation Bag <i data-lucide="plus-circle" class="w-4 h-4"></i>
            </button>
        </div>
    `;
    showView('product');
    lucide.createIcons();
}

function addItemToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingInCart = shoppingCart.find(item => item.id === productId);
    
    if (existingInCart) {
        existingInCart.qty += 1;
    } else {
        shoppingCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            qty: 1
        });
    }
    
    updateCartBadge();
    toggleCartDrawer(true); 
}

function changeCartQty(productId, amount) {
    const item = shoppingCart.find(item => item.id === productId);
    if (!item) return;
    
    item.qty += amount;
    if (item.qty <= 0) {
        shoppingCart = shoppingCart.filter(item => item.id !== productId);
    }
    
    updateCartBadge();
    renderCartDrawer();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalCount = shoppingCart.reduce((sum, item) => sum + item.qty, 0);
    
    if (totalCount > 0) {
        badge.innerText = totalCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function calculateCartSubtotal() {
    return shoppingCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function renderCartDrawer() {
    const container = document.getElementById('cart-items-container');
    const subtotalText = document.getElementById('cart-subtotal');
    const isDark = (currentAppTheme === "dark");
    
    if (shoppingCart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 text-zinc-600 font-mono text-xs uppercase tracking-widest">
                <i data-lucide="ghost" class="w-8 h-8 mx-auto mb-3 opacity-40"></i>
                Bag Is Empty
            </div>
        `;
        subtotalText.innerText = "$0.00";
        lucide.createIcons();
        return;
    }
    
    container.innerHTML = shoppingCart.map(item => `
        <div class="flex gap-4 p-3 bg-zinc-900/40 border border-zinc-900 rounded-2xl items-center justify-between animate-fade-in text-row">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-zinc-950 border border-zinc-900/60 rounded-xl overflow-hidden flex-shrink-0 border">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="max-w-[120px] sm:max-w-[160px]">
                    <h4 class="text-xs font-black text-white uppercase tracking-tight line-clamp-1">${item.name}</h4>
                    <p class="text-[10px] text-zinc-500 font-mono mt-0.5">$${item.price} × ${item.qty}</p>
                </div>
            </div>
            <div class="flex items-center bg-zinc-950 border border-zinc-900 rounded-lg p-1 font-mono text-xs text-counter-row">
                <button onclick="changeCartQty(${item.id}, -1)" class="px-2 text-zinc-500 hover:text-rose-400 cursor-pointer transition font-black">-</button>
                <span class="px-1.5 text-white font-bold select-none">${item.qty}</span>
                <button onclick="changeCartQty(${item.id}, 1)" class="px-2 text-zinc-500 hover:text-lime-400 cursor-pointer transition font-black">+</button>
            </div>
        </div>
    `).join('');
    
    subtotalText.innerText = `$${calculateCartSubtotal()}.00`;
    lucide.createIcons();
}

function attemptCartCheckout() {
    if (shoppingCart.length === 0) {
        alert("Your allocation bag is empty.");
        return;
    }
    toggleCartDrawer(false);
    
    if (!isLoggedIn) {
        openSignupModal();
    } else {
        goToCheckout();
    }
}

function resetPromoState() {
    activeDiscount.code = "";
    activeDiscount.type = "none";
    activeDiscount.value = 0;
}

function applyPromoCodeProtocol() {
    const rawInput = document.getElementById('promo-input').value.trim().toUpperCase();
    const statusMsg = document.getElementById('promo-status-msg');
    
    statusMsg.classList.remove('hidden', 'text-lime-400', 'text-rose-400');
    
    if (rawInput === "VITASHA20") {
        activeDiscount.code = "VITASHA20";
        activeDiscount.type = "percentage";
        activeDiscount.value = 0.20; 
        statusMsg.innerText = "✓ CODE LOGGED: 20% BUNDLE SLASH APPLIED.";
        statusMsg.classList.add('text-lime-400');
    } else if (rawInput === "EARLYDROP") {
        activeDiscount.code = "EARLYDROP";
        activeDiscount.type = "flat";
        activeDiscount.value = 15; 
        statusMsg.innerText = "✓ CODE LOGGED: $15.00 COGNITIVE CREDIT MERGED.";
        statusMsg.classList.add('text-lime-400');
    } else {
        resetPromoState();
        statusMsg.innerText = "✕ PROTOCOL ERROR: INVALID VOUCHER PARAMETER.";
        statusMsg.classList.add('text-rose-400');
    }
    
    goToCheckout();
}

function syncWalletDOMDisplay() {
    const indicator = document.getElementById('wallet-balance-indicator');
    if (indicator) {
        indicator.innerText = `$${userWalletBalance}.00`;
    }
}

function triggerWalletTopUpPipeline() {
    if (!isLoggedIn) {
        alert("Authentication required to engage wallet pipelines.");
        openSignupModal();
        return;
    }
    
    const amountInput = document.getElementById('wallet-load-amount');
    const amount = parseInt(amountInput.value);
    
    if (isNaN(amount) || amount < 10) {
        alert("Minimum entry node parameters limit fixed at $10.00.");
        return;
    }
    
    gatewayFlowContext = "wallet-topup";
    pendingWalletTopUpAmount = amount;
    
    const gatewayMethod = document.getElementById('wallet-load-method').value;
    document.getElementById('gateway-total-badge').innerText = `$${amount}.00`;
    document.getElementById('gateway-title-label').innerText = "// Wallet Load Node";
    
    const targetContainer = document.getElementById('dynamic-payment-interface-target');
    
    if (gatewayMethod.includes("UPI")) {
        targetContainer.innerHTML = `
            <div class="text-center space-y-4 py-4 font-mono">
                <p class="text-[10px] uppercase text-zinc-400 tracking-wider">Scan QR To Inject Wallet Credits</p>
                <div class="w-40 h-44 bg-white p-3 mx-auto rounded-2xl flex flex-wrap gap-1 items-center justify-center shadow-2xl relative overflow-hidden border border-zinc-200">
                    <div class="grid grid-cols-4 gap-2 w-full h-full p-2 opacity-90">
                        <div class="bg-black rounded-sm"></div><div class="bg-zinc-300 rounded-sm"></div><div class="bg-black rounded-sm"></div><div class="bg-black rounded-sm"></div>
                        <div class="bg-black rounded-sm"></div><div class="bg-black rounded-sm"></div><div class="bg-zinc-300 rounded-sm"></div><div class="bg-zinc-300 rounded-sm"></div>
                    </div>
                </div>
                <div class="text-center">
                    <span id="upi-ticker" class="text-xs font-black text-cyan-400 block mt-1">30s remaining</span>
                </div>
            </div>
        `;
        startUpiCountdownTicker();
    } else {
        targetContainer.innerHTML = `
            <div class="space-y-4 font-mono animate-fade-in text-left">
                <div>
                    <label class="block text-[9px] uppercase text-zinc-500 font-bold mb-1">Holder Identity</label>
                    <input type="text" value="CLUB MEMBER" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs uppercase text-white focus:outline-none placeholder-zinc-700 form-input">
                </div>
                <div>
                    <label class="block text-[9px] uppercase text-zinc-500 font-bold mb-1">Matrix Card number</label>
                    <input type="text" id="card-num-mask" placeholder="4111 2222 3333 4444" max-length="19" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white tracking-widest focus:outline-none font-mono placeholder-zinc-700 form-input font-bold">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[9px] uppercase text-zinc-500 font-bold mb-1">Expiry Code</label>
                        <input type="text" placeholder="MM/YY" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-center text-white focus:outline-none placeholder-zinc-700 form-input">
                    </div>
                    <div>
                        <label class="block text-[9px] uppercase text-zinc-500 font-bold mb-1">CVV</label>
                        <input type="password" placeholder="•••" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-center text-white tracking-widest focus:outline-none placeholder-zinc-700 form-input">
                    </div>
                </div>
            </div>
        `;
        document.getElementById('card-num-mask').addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
        });
    }
    
    amountInput.value = ""; 
    showView('payment-gateway');
    lucide.createIcons();
}

function goToCheckout() {
    const summaryContainer = document.getElementById('checkout-summary');
    const subtotal = calculateCartSubtotal();
    const isDark = (currentAppTheme === "dark");
    
    let containerHtml = shoppingCart.map(item => `
        <div class="flex justify-between items-center font-mono text-xs ${isDark ? 'border-zinc-900/40' : 'border-zinc-200'} border-b pb-2 last:border-0 last:pb-0 text-white-inverse">
            <div>
                <h4 class="font-bold uppercase tracking-tight text-white">${item.name} <span class="text-zinc-500 text-[10px] font-normal">×${item.qty}</span></h4>
                <p class="text-[9px] text-zinc-600 uppercase tracking-widest">${item.category}</p>
            </div>
            <span class="font-black text-white">${item.price * item.qty}.00</span>
        </div>
    `).join('');

    containerHtml += `
        <div class="flex justify-between items-center font-mono text-xs pt-3 mt-1 ${isDark ? 'border-zinc-900' : 'border-zinc-200'} border-t text-zinc-400">
            <span class="uppercase tracking-widest text-[9px]">Gross Subtotal</span>
            <span>$${subtotal}.00</span>
        </div>
    `;

    let deduction = 0;
    if (activeDiscount.type === "percentage") {
        deduction = Math.round(subtotal * activeDiscount.value);
    } else if (activeDiscount.type === "flat") {
        deduction = Math.min(activeDiscount.value, subtotal); 
    }

    if (deduction > 0) {
        containerHtml += `
            <div class="flex justify-between items-center font-mono text-xs text-lime-500 font-bold">
                <span class="uppercase tracking-widest text-[9px] font-mono">// Voucher Credit (${activeDiscount.code})</span>
                <span>-$${deduction}.00</span>
            </div>
        `;
    }

    const adjustedTotal = subtotal - deduction;
    containerHtml += `
        <div class="flex justify-between items-center font-mono text-xs pt-2 ${isDark ? 'border-zinc-900/60' : 'border-zinc-200'} border-t font-black text-white-inverse">
            <span class="uppercase tracking-widest text-[9px] text-zinc-400">Net Node Subtotal</span>
            <span class="text-lime-500 text-sm">$${adjustedTotal}.00</span>
        </div>
    `;

    summaryContainer.innerHTML = containerHtml;
    document.getElementById('order-name').value = userProfile.name;
    document.getElementById('order-address').value = userProfile.address;
    
    showView('order');
}

function initiatePaymentFlow(event) {
    event.preventDefault();
    gatewayFlowContext = "checkout";
    
    activeCheckoutSession.name = document.getElementById('order-name').value;
    activeCheckoutSession.address = document.getElementById('order-address').value;
    activeCheckoutSession.paymentMethod = document.getElementById('payment-method').value;
    
    const subtotal = calculateCartSubtotal();
    let deduction = 0;
    if (activeDiscount.type === "percentage") {
        deduction = Math.round(subtotal * activeDiscount.value);
    } else if (activeDiscount.type === "flat") {
        deduction = Math.min(activeDiscount.value, subtotal);
    }
    const netSubtotal = subtotal - deduction;
    const tax = Math.round(netSubtotal * 0.08);
    activeCheckoutSession.calculatedTotal = netSubtotal + tax;

    if (activeCheckoutSession.paymentMethod.includes("Wallet")) {
        if (userWalletBalance < activeCheckoutSession.calculatedTotal) {
            alert(`Insufficient funds in Vitasha Wallet! Needed: $${activeCheckoutSession.calculatedTotal}.00 | Balance: $${userWalletBalance}.00. Please load balance first.`);
            showView('profile');
            return;
        }
        
        document.getElementById('gateway-total-badge').innerText = `$${activeCheckoutSession.calculatedTotal}.00`;
        document.getElementById('gateway-title-label').innerText = "// Wallet Deduction Node";
        document.getElementById('dynamic-payment-interface-target').innerHTML = `
            <div class="py-6 text-center space-y-3 font-mono animate-fade-in">
                <div class="w-10 h-10 bg-lime-400/10 text-lime-400 rounded-xl flex items-center justify-center mx-auto"><i data-lucide="check-square" class="w-5 h-5"></i></div>
                <p class="text-xs text-zinc-200 uppercase font-black tracking-wider">Authorized Balance Clearance</p>
                <p class="text-[10px] text-zinc-500 font-mono">Current Balance: $${userWalletBalance}.00<br>Deduction Cut: -$${activeCheckoutSession.calculatedTotal}.00</p>
            </div>
        `;
        showView('payment-gateway');
        lucide.createIcons();
        return;
    }

    document.getElementById('gateway-total-badge').innerText = `$${activeCheckoutSession.calculatedTotal}.00`;
    document.getElementById('gateway-title-label').innerText = "// Secure Sandbox Gate";
    const targetContainer = document.getElementById('dynamic-payment-interface-target');
    
    if (activeCheckoutSession.paymentMethod.includes("UPI")) {
        targetContainer.innerHTML = `
            <div class="text-center space-y-4 py-4 font-mono">
                <p class="text-[10px] uppercase text-zinc-400 tracking-wider">Scan Node To Settle Sandbox Log</p>
                <div class="w-44 h-44 bg-white p-3 mx-auto rounded-2xl flex flex-wrap gap-1 items-center justify-center shadow-2xl relative overflow-hidden border border-zinc-100">
                    <div class="grid grid-cols-4 gap-2 w-full h-full p-2 opacity-90">
                        <div class="bg-black rounded-sm"></div><div class="bg-black rounded-sm"></div><div class="bg-zinc-300 rounded-sm"></div><div class="bg-black rounded-sm"></div>
                    </div>
                </div>
                <div class="text-center">
                    <span id="upi-ticker" class="text-xs font-black text-cyan-400 block mt-1">30s remaining</span>
                </div>
            </div>
        `;
        startUpiCountdownTicker();
    } else if (activeCheckoutSession.paymentMethod.includes("Credit")) {
        targetContainer.innerHTML = `
            <div class="space-y-4 font-mono animate-fade-in text-left">
                <div>
                    <label class="block text-[9px] uppercase text-zinc-500 font-bold mb-1">Card Holder Identity</label>
                    <input type="text" value="${activeCheckoutSession.name}" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs uppercase text-white focus:outline-none">
                </div>
                <div>
                    <label class="block text-[9px] uppercase text-zinc-500 font-bold mb-1">Card number</label>
                    <input type="text" id="card-num-mask" placeholder="4111 2222 3333 4444" max-length="19" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white tracking-widest focus:outline-none font-mono placeholder-zinc-700">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[9px] uppercase text-zinc-500 font-bold mb-1">Expiry</label>
                        <input type="text" placeholder="MM/YY" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-center text-white focus:outline-none placeholder-zinc-700">
                    </div>
                    <div>
                        <label class="block text-[9px] uppercase text-zinc-500 font-bold mb-1">CVV</label>
                        <input type="password" placeholder="•••" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-center text-white tracking-widest focus:outline-none placeholder-zinc-700">
                    </div>
                </div>
            </div>
        `;
        document.getElementById('card-num-mask').addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
        });
    } else {
        targetContainer.innerHTML = `
            <div class="py-6 text-center space-y-3 font-mono animate-fade-in">
                <div class="w-10 h-10 bg-lime-400/10 text-lime-400 rounded-xl flex items-center justify-center mx-auto"><i data-lucide="zap" class="w-5 h-5"></i></div>
                <p class="text-xs text-zinc-200 uppercase font-black">GenZ Pay Later Ledger Connected</p>
            </div>
        `;
    }
    
    showView('payment-gateway');
    lucide.createIcons();
}

function startUpiCountdownTicker() {
    let timeLeft = 30;
    if(upiCountdownTimer) clearInterval(upiCountdownTimer);
    
    upiCountdownTimer = setInterval(() => {
        timeLeft--;
        const ticker = document.getElementById('upi-ticker');
        if (ticker) ticker.innerText = `${timeLeft}s remaining`;
        
        if (timeLeft <= 0) {
            clearInterval(upiCountdownTimer);
            alert("Transaction Session Timeout.");
            abortActiveGatewayPipeline();
        }
    }, 1000);
}

function abortActiveGatewayPipeline() {
    if (gatewayFlowContext === "wallet-topup") {
        showView('profile');
    } else {
        showView('order');
    }
}

function executeFinalPaymentClearance() {
    const btn = document.getElementById('gateway-submit-btn');
    btn.innerHTML = `<span class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span> AUTHORIZING PARAMETERS...`;
    btn.disabled = true;

    if(upiCountdownTimer) clearInterval(upiCountdownTimer);

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `Confirm Secure Payment <i data-lucide="lock" class="w-3.5 h-3.5"></i>`;
        
        if (gatewayFlowContext === "wallet-topup") {
            userWalletBalance += pendingWalletTopUpAmount;
            pendingWalletTopUpAmount = 0;
            syncWalletDOMDisplay();
            alert("Credits successfully injected into your Vitasha Pay Node!");
            showView('profile');
        } else {
            if (activeCheckoutSession.paymentMethod.includes("Wallet")) {
                userWalletBalance -= activeCheckoutSession.calculatedTotal;
                syncWalletDOMDisplay();
            }
            renderInvoiceReceipt();
        }
    }, 1200);
}

function renderInvoiceReceipt() {
    const subtotal = calculateCartSubtotal();
    const isDark = (currentAppTheme === "dark");
    let deduction = 0;
    if (activeDiscount.type === "percentage") {
        deduction = Math.round(subtotal * activeDiscount.value);
    } else if (activeDiscount.type === "flat") {
        deduction = Math.min(activeDiscount.value, subtotal);
    }

    const netSubtotal = subtotal - deduction;
    const tax = Math.round(netSubtotal * 0.08);
    const total = netSubtotal + tax;
    const orderID = "VT-" + Math.floor(100000 + Math.random() * 900000);

    let invoiceItemsHtml = shoppingCart.map(item => `
        <div class="flex justify-between font-bold text-[11px] uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-700'}">
            <span>${item.name} (x${item.qty})</span>
            <span>$${item.price * item.qty}.00</span>
        </div>
    `).join('');

    let voucherLineHtml = "";
    if (deduction > 0) {
        voucherLineHtml = `
            <div class="flex justify-between text-xs text-lime-500 font-bold">
                <span>Voucher Cut applied (${activeDiscount.code})</span>
                <span>-$${deduction}.00</span>
            </div>
        `;
    }

    document.getElementById('bill-details').innerHTML = `
        <div class="flex justify-between text-[10px] text-zinc-500 border-b border-zinc-900 pb-3 mb-3 sub-border-line">
            <span>NODE ID: <strong>${orderID}</strong></span>
            <span>GATEWAY: <strong>${activeCheckoutSession.paymentMethod}</strong></span>
        </div>
        <div class="space-y-2 mb-3 border-b ${isDark ? 'border-zinc-900/60' : 'border-zinc-200'} pb-3">
            ${invoiceItemsHtml}
        </div>
        <div class="space-y-1 pb-2 mb-2 border-b ${isDark ? 'border-zinc-900/40' : 'border-zinc-200'} pb-3">
            <div class="flex justify-between text-xs text-zinc-500">
                <span>Gross Base Subtotal</span>
                <span>$${subtotal}.00</span>
            </div>
            ${voucherLineHtml}
            <div class="flex justify-between text-xs text-zinc-500">
                <span>State VAT Clearance (8%)</span>
                <span>$${tax}.00</span>
            </div>
        </div>
        <div class="flex justify-between text-xs text-zinc-500 border-b ${isDark ? 'border-zinc-900' : 'border-zinc-200'} pb-3 mb-3">
            <span>Cargo Dispatch Transit</span>
            <span class="text-lime-500 font-bold tracking-wider">COMPLIMENTARY</span>
        </div>
        <div class="flex justify-between font-black text-base text-lime-500 pt-1">
            <span>TOTAL SECURED SETTLEMENT</span>
            <span>$${total}.00</span>
        </div>
        <div class="text-[10px] text-zinc-500 mt-6 text-center leading-relaxed border-t ${isDark ? 'border-zinc-900/60' : 'border-zinc-200'} pt-4">
            Security authorization success logs shot over cleanly to <strong>${userProfile.email}</strong>.<br>Routing trajectory assigned to: <br><span class="${isDark ? 'text-zinc-400' : 'text-zinc-700'} text-[11px] font-sans mt-1 block">${activeCheckoutSession.address}</span>
        </div>
    `;
    
    activeRatings.order = 0;
    resetStarGraphics('order');
    document.getElementById('order-feedback-msg').value = "";
    document.getElementById('order-checkout-feedback-container').classList.remove('hidden');

    shoppingCart = [];
    resetPromoState();
    updateCartBadge();
    
    document.getElementById('promo-input').value = "";
    document.getElementById('promo-status-msg').classList.add('hidden');

    showView('bill');
    lucide.createIcons();
}

function setGlobalStarRating(context, score) {
    activeRatings[context] = score;
    const rowId = (context === 'home') ? 'home-star-row' : 'order-star-row';
    const buttons = document.getElementById(rowId).getElementsByTagName('button');
    
    for (let i = 0; i < buttons.length; i++) {
        if (i < score) {
            buttons[i].classList.remove('text-zinc-700');
            buttons[i].classList.add('text-lime-400');
        } else {
            buttons[i].classList.remove('text-lime-400');
            buttons[i].classList.add('text-zinc-700');
        }
    }
}

function resetStarGraphics(context) {
    const rowId = (context === 'home') ? 'home-star-row' : 'order-star-row';
    const buttons = document.getElementById(rowId).getElementsByTagName('button');
    for (let button of buttons) {
        button.classList.remove('text-lime-400');
        button.classList.add('text-zinc-700');
    }
}

function submitGlobalFeedback(context) {
    const finalScore = activeRatings[context];
    if(finalScore === 0) {
        alert("Please pick a star level rating metrics before transmission dispatch.");
        return;
    }
    
    if(context === 'home') {
        alert(`Transmission Stable! Thank you for the ${finalScore}-star rating log packet.`);
        toggleHomepageFeedback(false);
    } else if(context === 'order') {
        alert(`Order Cycle metrics locked at ${finalScore} stars. Feedback secure!`);
        document.getElementById('order-checkout-feedback-container').classList.add('hidden');
    }
}

window.onload = () => {
    renderHomepage();
    paintDynamicHeroCover(); 
};