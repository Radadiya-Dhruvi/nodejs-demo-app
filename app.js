const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const commonStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
  body {
    background-color: #120905;
    background-image: linear-gradient(rgba(18, 9, 5, 0.88), rgba(43, 24, 16, 0.92)), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: #f7ebe1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  header {
    background: rgba(15, 8, 4, 0.85);
    backdrop-filter: blur(14px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 36px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .brand {
    font-size: 22px;
    font-weight: 700;
    color: #ffb74d;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  nav { display: flex; gap: 15px; align-items: center; }
  nav a {
    color: #f7ebe1;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 20px;
    transition: 0.2s;
  }
  nav a:hover, nav a.active { background: #ff9800; color: #fff; }
  .cart-badge {
    background: #e65100;
    color: white;
    border-radius: 50%;
    padding: 2px 7px;
    font-size: 11px;
    margin-left: 4px;
  }
  .container { max-width: 1100px; width: 100%; margin: 30px auto; padding: 0 20px; flex: 1; }
  .card {
    background: rgba(30, 18, 12, 0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 18px;
    padding: 28px;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
  }
  .grid-horizontal {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 22px;
    margin-top: 15px;
    margin-bottom: 25px;
  }
  .menu-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .menu-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(255, 152, 0, 0.2);
  }
  .btn {
    background: linear-gradient(45deg, #ff9800, #f57c00);
    color: #fff;
    border: none;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 25px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
  }
  .btn:hover { box-shadow: 0 4px 15px rgba(245, 124, 0, 0.4); }
  .category-title {
    color: #ffcc80;
    font-size: 22px;
    margin: 30px 0 10px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 2px solid rgba(255, 152, 0, 0.3);
    padding-bottom: 6px;
  }
  input {
    width: 100%;
    padding: 12px;
    margin: 8px 0 14px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    box-sizing: border-box;
  }
  .payment-tab-btn {
    flex: 1;
    padding: 12px;
    border-radius: 25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }
  .payment-tab-btn.active {
    background: #ff9800;
    color: #fff;
    border-color: #ff9800;
  }
  footer {
    background: rgba(10, 5, 2, 0.9);
    padding: 30px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 40px;
  }
  .footer-content {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  .footer-col h4 { color: #ffb74d; margin-bottom: 12px; font-size: 16px; }
  .footer-col p { font-size: 13px; color: #bbb; line-height: 1.6; }
`;

function renderNav(activeTab) {
  return `
    <header>
      <a href="/overview" class="brand">☕ Cozy Bean Café</a>
      <nav>
        <a href="/overview" class="${activeTab === 'overview' ? 'active' : ''}">Overview</a>
        <a href="/menu" class="${activeTab === 'menu' ? 'active' : ''}">Menu</a>
        <a href="/cart" class="${activeTab === 'cart' ? 'active' : ''}">Cart <span class="cart-badge" id="navCart">0</span></a>
        <a href="#" onclick="handleLogout()" style="color:#ef5350;">Logout</a>
      </nav>
    </header>
    <script>
      const user = localStorage.getItem('cafe_user');
      if (!user && window.location.pathname !== '/') {
        window.location.href = '/';
      }
      function updateNavCount() {
        const cart = JSON.parse(localStorage.getItem('cafe_cart') || '[]');
        const navCart = document.getElementById('navCart');
        if (navCart) navCart.innerText = cart.length;
      }
      updateNavCount();

      function handleLogout() {
        localStorage.removeItem('cafe_user');
        localStorage.removeItem('cafe_cart');
        alert('You have logged out.');
        window.location.href = '/';
      }
    </script>
  `;
}

function renderFooter() {
  return `
    <footer>
      <div class="footer-content">
        <div class="footer-col">
          <h4>☕ Cozy Bean Café</h4>
          <p>Experience the aroma of artisanal brews and soulful vibes.</p>
        </div>
        <div class="footer-col">
          <h4>📍 Location</h4>
          <p>240 Flinders Street, Melbourne VIC 3000, Australia</p>
        </div>
        <div class="footer-col">
          <h4>📞 Contact Us</h4>
          <p>Phone: +61 3 9876 5432<br/>Email: contact@cozybeancafe.com.au</p>
        </div>
        <div class="footer-col">
          <h4>⏰ Opening Hours</h4>
          <p>Mon - Sun: 07:00 AM - 10:00 PM</p>
        </div>
      </div>
      <p style="text-align:center; font-size:12px; color:#666; margin-top:20px;">© 2026 Cozy Bean Café. All rights reserved.</p>
    </footer>
  `;
}

// 1. PAGE: Login Page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Login - Cozy Bean Café</title>
      <style>${commonStyles}</style>
    </head>
    <body style="justify-content: center; align-items: center; display: flex;">
      <div class="card" style="max-width: 400px; width: 100%; text-align: center;">
        <div style="font-size: 50px; margin-bottom: 10px;">☕</div>
        <h2 style="color: #ffcc80; margin-bottom: 6px;">Cozy Bean Café</h2>
        <p style="font-size: 13px; color: #ccc; margin-bottom: 20px;">Please login to enter our café experience</p>
        
        <form onsubmit="doLogin(event)" style="text-align: left;">
          <label style="font-size: 13px; color: #ddd;">Email Address</label>
          <input type="email" id="email" placeholder="customer@example.com" required />
          
          <label style="font-size: 13px; color: #ddd;">Password</label>
          <input type="password" id="pass" placeholder="••••••••" required />
          
          <button type="submit" class="btn" style="width: 100%; padding: 12px; font-size: 15px; margin-top: 10px;">Enter Café</button>
        </form>
      </div>

      <script>
        if (localStorage.getItem('cafe_user')) {
          window.location.href = '/overview';
        }
        function doLogin(e) {
          e.preventDefault();
          const email = document.getElementById('email').value;
          localStorage.setItem('cafe_user', email);
          alert('Welcome to Cozy Bean Café!');
          window.location.href = '/overview';
        }
      </script>
    </body>
    </html>
  `);
});

// 2. PAGE: Overview with Scrollable Hero Background
app.get('/overview', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cozy Bean Café - Overview</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${renderNav('overview')}
      <div class="container">
        
        <!-- Big Hero Visual Banner -->
        <div class="card" style="text-align: center; padding: 60px 25px; margin-bottom: 35px; background: linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80') center/cover; border: 1px solid rgba(255,183,77,0.3);">
          <h1 style="font-size: 38px; color: #ffcc80; margin-bottom: 12px; text-shadow: 0 4px 10px rgba(0,0,0,0.7);">Warmth in Every Cup, Joy in Every Bite</h1>
          <p style="color: #f5ebe6; max-width: 680px; margin: 0 auto 25px; font-size: 16px; line-height: 1.6;">
            A soulful sanctuary in Melbourne crafted with ambient warm lighting, acoustic melodies, specialty roasts, gourmet burgers, and artisan sodas.
          </p>
          <a href="/menu" class="btn" style="padding: 14px 32px; font-size: 16px;">Check Out Our Menu 🍔☕</a>
        </div>

        <h3 style="color:#ffb74d; margin-bottom: 15px;">Café Highlights & Ambiance</h3>
        <div class="grid-horizontal">
          <div class="card" style="text-align: center;">
            <div style="font-size: 40px; margin-bottom: 8px;">🛋️</div>
            <h4 style="color:#ffe082;">Cozy Workspaces</h4>
            <p style="font-size: 13px; color:#ccc; margin-top: 6px;">High-speed Wi-Fi, comfortable aesthetic seating, and mellow background tracks.</p>
          </div>
          <div class="card" style="text-align: center;">
            <div style="font-size: 40px; margin-bottom: 8px;">🌱</div>
            <h4 style="color:#ffe082;">Organic Roast</h4>
            <p style="font-size: 13px; color:#ccc; margin-top: 6px;">Single-origin Arabica beans ethically sourced and brewed to fine perfection.</p>
          </div>
          <div class="card" style="text-align: center;">
            <div style="font-size: 40px; margin-bottom: 8px;">👨‍‍🍳</div>
            <h4 style="color:#ffe082;">Gourmet Kitchen</h4>
            <p style="font-size: 13px; color:#ccc; margin-top: 6px;">Freshly grilled burgers, hand-stretched pizzas, and artisan pastries on demand.</p>
          </div>
        </div>
      </div>
      ${renderFooter()}
    </body>
    </html>
  `);
});

// 3. PAGE: Menu with Horizontal Card Layout
app.get('/menu', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cozy Bean Café - Menu</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${renderNav('menu')}
      <div class="container">
        
        <!-- Category: Coffee -->
        <div class="category-title">☕ Artisanal Coffees</div>
        <div class="grid-horizontal">
          <div class="menu-card">
            <div>
              <div style="font-size: 42px; margin-bottom: 8px;">☕</div>
              <h4 style="color:#ffe082; font-size: 18px;">Caramel Macchiato</h4>
              <p style="font-size: 13px; color:#ccc; margin: 8px 0;">Velvety steamed milk with rich espresso and pure vanilla caramel.</p>
            </div>
            <div>
              <div style="font-weight:bold; color:#ffb74d; font-size: 18px; margin: 12px 0;">₹180</div>
              <button class="btn" style="width:100%;" onclick="addToCart('Caramel Macchiato', 180)">+ Add to Cart</button>
            </div>
          </div>

          <div class="menu-card">
            <div>
              <div style="font-size: 42px; margin-bottom: 8px;">🧊</div>
              <h4 style="color:#ffe082; font-size: 18px;">Vanilla Cold Brew</h4>
              <p style="font-size: 13px; color:#ccc; margin: 8px 0;">18-hour slow-dripped cold brew infused with organic vanilla.</p>
            </div>
            <div>
              <div style="font-weight:bold; color:#ffb74d; font-size: 18px; margin: 12px 0;">₹210</div>
              <button class="btn" style="width:100%;" onclick="addToCart('Vanilla Cold Brew', 210)">+ Add to Cart</button>
            </div>
          </div>

          <div class="menu-card">
            <div>
              <div style="font-size: 42px; margin-bottom: 8px;">🌰</div>
              <h4 style="color:#ffe082; font-size: 18px;">Hazelnut Latte</h4>
              <p style="font-size: 13px; color:#ccc; margin: 8px 0;">Smooth double espresso blended with roasted hazelnut syrup.</p>
            </div>
            <div>
              <div style="font-weight:bold; color:#ffb74d; font-size: 18px; margin: 12px 0;">₹190</div>
              <button class="btn" style="width:100%;" onclick="addToCart('Hazelnut Latte', 190)">+ Add to Cart</button>
            </div>
          </div>
        </div>

        <!-- Category: Burgers -->
        <div class="category-title">🍔 Sizzling Burgers</div>
        <div class="grid-horizontal">
          <div class="menu-card">
            <div>
              <div style="font-size: 42px; margin-bottom: 8px;">🍔</div>
              <h4 style="color:#ffe082; font-size: 18px;">Crispy Paneer Burger</h4>
              <p style="font-size: 13px; color:#ccc; margin: 8px 0;">Golden paneer patty with spicy chipotle sauce in brioche buns.</p>
            </div>
            <div>
              <div style="font-weight:bold; color:#ffb74d; font-size: 18px; margin: 12px 0;">₹160</div>
              <button class="btn" style="width:100%;" onclick="addToCart('Crispy Paneer Burger', 160)">+ Add to Cart</button>
            </div>
          </div>

          <div class="menu-card">
            <div>
              <div style="font-size: 42px; margin-bottom: 8px;">🧀</div>
              <h4 style="color:#ffe082; font-size: 18px;">Double Cheese Crunch</h4>
              <p style="font-size: 13px; color:#ccc; margin: 8px 0;">Melted gouda and cheddar over herb-spiced crispy patty.</p>
            </div>
            <div>
              <div style="font-weight:bold; color:#ffb74d; font-size: 18px; margin: 12px 0;">₹190</div>
              <button class="btn" style="width:100%;" onclick="addToCart('Double Cheese Crunch Burger', 190)">+ Add to Cart</button>
            </div>
          </div>
        </div>

        <!-- Category: Refreshing Sodas -->
        <div class="category-title">🍹 Sparkling Sodas & Coolers</div>
        <div class="grid-horizontal">
          <div class="menu-card">
            <div>
              <div style="font-size: 42px; margin-bottom: 8px;">🌊</div>
              <h4 style="color:#ffe082; font-size: 18px;">Blue Lagoon Soda</h4>
              <p style="font-size: 13px; color:#ccc; margin: 8px 0;">Citrus curaçao infused bubbly soda with freshly cut lemon.</p>
            </div>
            <div>
              <div style="font-weight:bold; color:#ffb74d; font-size: 18px; margin: 12px 0;">₹140</div>
              <button class="btn" style="width:100%;" onclick="addToCart('Blue Lagoon Soda', 140)">+ Add to Cart</button>
            </div>
          </div>

          <div class="menu-card">
            <div>
              <div style="font-size: 42px; margin-bottom: 8px;">🍃</div>
              <h4 style="color:#ffe082; font-size: 18px;">Virgin Mint Mojito</h4>
              <p style="font-size: 13px; color:#ccc; margin: 8px 0;">Hand-muddled garden mint leaves, chilled lime, and sparkling soda.</p>
            </div>
            <div>
              <div style="font-weight:bold; color:#ffb74d; font-size: 18px; margin: 12px 0;">₹150</div>
              <button class="btn" style="width:100%;" onclick="addToCart('Virgin Mint Mojito', 150)">+ Add to Cart</button>
            </div>
          </div>
        </div>

      </div>

      <script>
        function addToCart(title, price) {
          let cart = [];
          try {
            cart = JSON.parse(localStorage.getItem('cafe_cart')) || [];
          } catch(e) { cart = []; }

          cart.push({ title: title, price: Number(price) });
          localStorage.setItem('cafe_cart', JSON.stringify(cart));
          
          const navCart = document.getElementById('navCart');
          if (navCart) navCart.innerText = cart.length;

          alert('✅ ' + title + ' (₹' + price + ') added to your Cart!');
        }
      </script>
      ${renderFooter()}
    </body>
    </html>
  `);
});

// 4. PAGE: Cart & Payment (Fixed Total Calculation + Working QR and Card Option)
app.get('/cart', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cart & Payment - Cozy Bean Café</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${renderNav('cart')}
      <div class="container" style="max-width: 650px;">
        <div class="card">
          <h2 style="color: #ffcc80; margin-bottom: 15px;">Your Order Summary</h2>
          
          <!-- Items List Container -->
          <div id="cartItemsList" style="margin-bottom: 18px;"></div>
          
          <!-- Grand Total Row -->
          <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 14px; display: flex; justify-content: space-between; font-size: 20px; font-weight: bold;">
            <span>Total Payable:</span>
            <span id="grandTotalText" style="color: #81c784;">₹0</span>
          </div>

          <!-- Payment Methods Container -->
          <div id="paymentBox" style="margin-top: 25px; display: none;">
            <h3 style="color: #ffb74d; margin-bottom: 15px;">Choose Payment Method</h3>
            
            <div style="display: flex; gap: 12px; margin-bottom: 20px;">
              <button id="btnQR" class="payment-tab-btn active" onclick="switchPayment('qr')">📲 UPI / QR Code</button>
              <button id="btnCard" class="payment-tab-btn" onclick="switchPayment('card')">💳 Debit / Credit Card</button>
            </div>

            <!-- 1. UPI QR Code Section -->
            <div id="qrSection" style="text-align: center; background: rgba(255,255,255,0.04); padding: 22px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
              <h4 style="color: #ffcc80; margin-bottom: 10px;">Scan QR via PhonePe / GooglePay / Paytm</h4>
              <img id="qrImage" src="" alt="UPI QR Code" style="border: 6px solid #fff; border-radius: 10px; margin: 12px auto; display: block; width: 180px; height: 180px;" />
              <p style="font-size: 13px; color: #ccc;">UPI ID: <b style="color:#ffb74d;">cozybean@okaxis</b></p>
              <button class="btn" onclick="completePayment('QR Code')" style="background: #2e7d32; width: 100%; margin-top: 18px; padding: 13px; font-size: 15px;">I Have Paid via QR</button>
            </div>

            <!-- 2. Debit / Credit Card Section -->
            <div id="cardSection" style="display: none; background: rgba(255,255,255,0.04); padding: 22px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
              <h4 style="color: #ffcc80; margin-bottom: 14px;">Enter Card Details</h4>
              <input type="text" id="cardNumber" placeholder="Card Number (XXXX XXXX XXXX XXXX)" maxlength="19" />
              <div style="display: flex; gap: 12px;">
                <input type="text" id="cardExpiry" placeholder="MM/YY" maxlength="5" />
                <input type="password" id="cardCVV" placeholder="CVV" maxlength="3" />
              </div>
              <input type="text" id="cardHolder" placeholder="Cardholder Name" />
              <button class="btn" onclick="completePayment('Debit/Credit Card')" style="background: #2e7d32; width: 100%; padding: 13px; font-size: 15px; margin-top: 6px;">Pay With Card</button>
            </div>
          </div>

          <!-- Empty Cart Message -->
          <div id="emptyTrayMessage" style="text-align: center; padding: 25px; display: none;">
            <p style="color: #bbb; font-size: 16px;">Your tray is currently empty!</p>
            <a href="/menu" class="btn" style="margin-top: 14px;">Browse Menu & Order</a>
          </div>

        </div>
      </div>

      <script>
        let cart = [];
        try {
          cart = JSON.parse(localStorage.getItem('cafe_cart')) || [];
        } catch(e) { cart = []; }

        const listContainer = document.getElementById('cartItemsList');
        const grandTotalSpan = document.getElementById('grandTotalText');
        const paymentArea = document.getElementById('paymentBox');
        const emptyMsg = document.getElementById('emptyTrayMessage');
        const qrImageTag = document.getElementById('qrImage');

        let calculatedTotal = 0;

        if (!Array.isArray(cart) || cart.length === 0) {
          emptyMsg.style.display = 'block';
          paymentArea.style.display = 'none';
        } else {
          paymentArea.style.display = 'block';
          emptyMsg.style.display = 'none';

          let rows = '';
          cart.forEach(function(item) {
            let pr = Number(item.price) || 0;
            calculatedTotal += pr;
            rows += '<div style="display:flex; justify-content:space-between; padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.08); font-size:15px;">' +
                      '<span>☕ ' + (item.title || 'Café Item') + '</span>' +
                      '<span style="color:#ffb74d; font-weight:600;">₹' + pr + '</span>' +
                    '</div>';
          });

          listContainer.innerHTML = rows;
          grandTotalSpan.innerText = '₹' + calculatedTotal;
          qrImageTag.src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=cozybean@okaxis&pn=CozyBeanCafe&am=' + calculatedTotal;
        }

        function switchPayment(tab) {
          const qrSec = document.getElementById('qrSection');
          const cardSec = document.getElementById('cardSection');
          const btnQ = document.getElementById('btnQR');
          const btnC = document.getElementById('btnCard');

          if (tab === 'qr') {
            qrSec.style.display = 'block';
            cardSec.style.display = 'none';
            btnQ.classList.add('active');
            btnC.classList.remove('active');
          } else {
            qrSec.style.display = 'none';
            cardSec.style.display = 'block';
            btnC.classList.add('active');
            btnQ.classList.remove('active');
          }
        }

        function completePayment(methodName) {
          if (methodName === 'Debit/Credit Card') {
            const num = document.getElementById('cardNumber').value.trim();
            const exp = document.getElementById('cardExpiry').value.trim();
            const cvv = document.getElementById('cardCVV').value.trim();
            if (!num || !exp || !cvv) {
              alert('⚠️ Please fill out all card details (Card Number, Expiry, and CVV).');
              return;
            }
          }
          alert('🎉 Payment of ₹' + calculatedTotal + ' Successful via ' + methodName + '!\\n\\nYour delicious order is now being prepared.');
          localStorage.removeItem('cafe_cart');
          window.location.href = '/overview';
        }
      </script>
      ${renderFooter()}
    </body>
    </html>
  `);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Café website running on http://localhost:${PORT}`);
  });
}

module.exports = app;