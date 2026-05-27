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
        description: "Heavyweight 240 GSM unbleached carded cotton silhouette. Crafted with drop-shoulder aesthetics, boxy fits, and clean tactical hems that frame movement perfectly.",
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
let userProfile = {
    name: "",
    email: "",
    address: "C/O Vitasha HQ, Desk 42, Cyber Hub"
};

// Ratings dynamic tracking state variables
let activeRatings = {
    home: 0,
    order: 0
};

// Switch active layout views
function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
    document.getElementById(`${viewId}-view`).classList.remove('hidden');
    
    if(window.location.hash !== "#shop-grid" || viewId !== 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Modal View Toggles
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

// Toggle floating homepage feedback overlay panel views
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

// Handle global outside window click closures
window.addEventListener('click', function(e) {
    const container = document.getElementById('nav-auth-container');
    const menu = document.getElementById('user-dropdown-menu');
    if (container && !container.contains(e.target) && menu) {
        menu.classList.add('hidden');
    }
});

function updateAuthNavbar() {
    const container = document.getElementById('nav-auth-container');
    if (isLoggedIn) {
        container.innerHTML = `
            <button onclick="toggleUserDropdown()" class="text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 px-4 py-2.5 rounded-full font-mono flex items-center gap-2 cursor-pointer select-none tracking-wider transition-all duration-300">
                <span class="w-1.5 h-1.5 bg-lime-400 rounded-full"></span> @${userProfile.name} <span class="text-[9px] text-zinc-500">▼</span>
            </button>
            <div id="user-dropdown-menu" class="hidden absolute right-0 mt-3 w-44 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-1.5 z-50 animate-fade-in backdrop-blur-md">
                <button onclick="showView('profile'); toggleUserDropdown();" class="w-full text-left px-4 py-2.5 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer flex items-center gap-2"><i data-lucide="settings" class="w-3.5 h-3.5 text-zinc-500"></i> Settings Log</button>
                <hr class="border-zinc-800 my-1">
                <button onclick="handleLogout()" class="w-full text-left px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 transition font-bold cursor-pointer flex items-center gap-2"><i data-lucide="log-out" class="w-3.5 h-3.5"></i> Clear Protocol</button>
            </div>
        `;
    } else {
        container.innerHTML = `
            <button onclick="openSignupModal()" class="bg-white text-black px-5 py-2.5 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-lime-400 hover:text-black hover:scale-105 transition-all duration-300 shadow-xl shadow-lime-400/10 cursor-pointer">Join Club</button>
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
    closeSignupModal();

    if (currentSelectedProduct) {
        goToCheckout();
    }
}

function handleLogout() {
    isLoggedIn = false;
    userProfile.name = "";
    userProfile.email = "";
    currentSelectedProduct = null;

    document.getElementById('prof-name').value = "";
    document.getElementById('prof-email').value = "";
    document.getElementById('signup-form').reset();

    updateAuthNavbar();
    showView('home');
}

function saveProfile() {
    userProfile.name = document.getElementById('prof-name').value;
    userProfile.email = document.getElementById('prof-email').value;
    userProfile.address = document.getElementById('prof-address').value;
    updateAuthNavbar();
}

function renderHomepage() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="bg-zinc-900/30 border border-zinc-900 rounded-3xl overflow-hidden group hover:border-zinc-800 transition-all duration-500 flex flex-col justify-between shadow-lg shadow-black/20">
            <div class="p-5">
                <div class="w-full h-72 bg-zinc-950/80 rounded-2xl overflow-hidden mb-5 relative flex items-center justify-center border border-zinc-900">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <span class="absolute top-4 left-4 bg-zinc-950/90 border border-zinc-900 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-mono tracking-widest text-lime-400 uppercase">${product.category}</span>
                </div>
                <h3 class="font-bold text-lg text-white mb-1.5 group-hover:text-lime-400 transition-colors duration-300 tracking-tight uppercase">${product.name}</h3>
                <p class="text-zinc-500 text-xs leading-relaxed line-clamp-2">${product.description}</p>
            </div>
            <div class="p-5 pt-0 flex justify-between items-center">
                <span class="text-xl font-black text-white font-mono">$${product.price}</span>
                <button onclick="viewProduct(${product.id})" class="bg-zinc-900 hover:bg-white hover:text-black border border-zinc-800 hover:border-white text-zinc-300 text-[10px] font-black tracking-widest px-5 py-2.5 rounded-xl transition-all duration-300 uppercase cursor-pointer flex items-center gap-1">Inspect <i data-lucide="scan" class="w-3 h-3"></i></button>
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

function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    currentSelectedProduct = product;
    
    const container = document.getElementById('product-detail-container');
    container.innerHTML = `
        <div class="lg:col-span-7 bg-zinc-900/20 p-6 rounded-3xl border border-zinc-900 flex flex-col justify-between items-center min-h-[460px] backdrop-blur-md shadow-2xl">
            <div class="w-full h-80 bg-zinc-950/60 rounded-2xl overflow-hidden relative flex items-center justify-center border border-zinc-900/40">
                <img id="viewer-360-frame" src="${product.frames[0]}" alt="${product.name}" class="w-full h-full object-contain mix-blend-screen select-none pointer-events-none">
                <span class="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur-md text-[9px] font-mono border border-zinc-800 px-3 py-1 rounded-full text-zinc-400 tracking-widest uppercase flex items-center gap-1.5 shadow-xl"><span class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span> Interactive 360 Object</span>
            </div>
            <div class="w-full px-2 mt-6">
                <div class="flex justify-between text-[10px] uppercase font-mono font-bold tracking-widest text-zinc-500 mb-2">
                    <span>◄ Drag Track to Rotate Object</span>
                    <span>Perspectives: 0${product.frames.length}</span>
                </div>
                <input type="range" min="0" max="${product.frames.length - 1}" value="0" 
                       class="w-full accent-lime-400 h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer"
                       oninput="rotate360Frame(this.value)">
            </div>
        </div>

        <div class="lg:col-span-5 flex flex-col justify-center pt-4 lg:pt-8">
            <span class="text-lime-400 font-mono font-bold tracking-widest text-[10px] uppercase mb-3">// Category: ${product.category}</span>
            <h1 class="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">${product.name}</h1>
            <p class="text-3xl font-black text-white font-mono mb-6 border-b border-zinc-900 pb-4">$${product.price}.00 <span class="text-[10px] text-zinc-500 font-normal font-sans tracking-normal">USD Global Access</span></p>
            <p class="text-zinc-400 text-xs md:text-sm mb-10 leading-relaxed text-justify">${product.description}</p>
            
            <button onclick="attemptPurchase()" class="w-full bg-lime-400 text-black font-black px-8 py-4 rounded-xl text-center uppercase tracking-widest hover:bg-lime-300 hover:scale-[1.02] transition-all duration-300 text-xs cursor-pointer shadow-xl shadow-lime-400/5 flex items-center justify-center gap-2">
                Secure Allocation Node <i data-lucide="shield-check" class="w-4 h-4"></i>
            </button>
        </div>
    `;
    showView('product');
    lucide.createIcons();
}

function attemptPurchase() {
    if (!isLoggedIn) {
        openSignupModal();
    } else {
        goToCheckout();
    }
}

function goToCheckout() {
    if(!currentSelectedProduct) return;
    
    document.getElementById('checkout-summary').innerHTML = `
        <div class="flex justify-between items-center font-mono text-xs">
            <div>
                <h4 class="font-bold uppercase tracking-tight text-white">${currentSelectedProduct.name}</h4>
                <p class="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">${currentSelectedProduct.category} Drop Object</p>
            </div>
            <span class="font-black text-lime-400 text-sm">$${currentSelectedProduct.price}.00</span>
        </div>
    `;

    document.getElementById('order-name').value = userProfile.name;
    document.getElementById('order-address').value = userProfile.address;
    
    showView('order');
}

function processOrder(event) {
    event.preventDefault();
    const address = document.getElementById('order-address').value;
    const payment = document.getElementById('payment-method').value;
    const orderID = "VT-" + Math.floor(100000 + Math.random() * 900000);
    const tax = Math.round(currentSelectedProduct.price * 0.08);
    const total = currentSelectedProduct.price + tax;

    document.getElementById('bill-details').innerHTML = `
        <div class="flex justify-between text-[10px] text-zinc-500 border-b border-zinc-900 pb-3 mb-3">
            <span>NODE ID: <strong>${orderID}</strong></span>
            <span>GATE: <strong>${payment}</strong></span>
        </div>
        <div class="flex justify-between font-bold text-xs text-white uppercase">
            <span>Allocation Object: ${currentSelectedProduct.name}</span>
            <span>$${currentSelectedProduct.price}.00</span>
        </div>
        <div class="flex justify-between text-xs text-zinc-500 mt-1">
            <span>State VAT Clearance (8%)</span>
            <span>$${tax}.00</span>
        </div>
        <div class="flex justify-between text-xs text-zinc-500 border-b border-zinc-900 pb-3 mb-3 mt-1">
            <span>Cargo Dispatch Transit</span>
            <span class="text-lime-400 font-bold tracking-wider">COMPLIMENTARY</span>
        </div>
        <div class="flex justify-between font-black text-base text-lime-400 pt-1">
            <span>TOTAL SECURED SETTLEMENT</span>
            <span>$${total}.00</span>
        </div>
        <div class="text-[10px] text-zinc-500 mt-6 text-center leading-relaxed border-t border-zinc-900/60 pt-4">
            Security log packet fired cleanly to <strong>${userProfile.email}</strong>.<br>Routing trajectory assigned to: <br><span class="text-zinc-400 text-[11px] font-sans mt-1 block">${address}</span>
        </div>
    `;
    
    // Reset individual checkout feedback view variables state on entry
    activeRatings.order = 0;
    resetStarGraphics('order');
    document.getElementById('order-feedback-msg').value = "";
    document.getElementById('order-checkout-feedback-container').classList.remove('hidden');

    currentSelectedProduct = null;
    showView('bill');
    lucide.createIcons();
}

// Interactive Feedback Star Rating Color Engine
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

// Reset star graphical visual metrics to baseline default configurations
function resetStarGraphics(context) {
    const rowId = (context === 'home') ? 'home-star-row' : 'order-star-row';
    const buttons = document.getElementById(rowId).getElementsByTagName('button');
    for (let button of buttons) {
        button.classList.remove('text-lime-400');
        button.classList.add('text-zinc-700');
    }
}

// Dispatch final rating logs alert data feedback pipeline pack execution
function submitGlobalFeedback(context) {
    const finalScore = activeRatings[context];
    if(finalScore === 0) {
        alert("Please pick a star level rating metrics before transmission dispatch.");
        return;
    }
    
    if(context === 'home') {
        const textMsg = document.getElementById('home-feedback-msg').value;
        alert(`Transmission Stable! Thank you for the ${finalScore}-star rating log packet.`);
        toggleHomepageFeedback(false);
    } else if(context === 'order') {
        alert(`Order Cycle metrics locked at ${finalScore} stars. Feedback secure!`);
        // Transform block container out cleanly upon capture
        document.getElementById('order-checkout-feedback-container').classList.add('hidden');
    }
}

window.onload = () => {
    renderHomepage();
};