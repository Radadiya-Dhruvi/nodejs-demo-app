const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="gu">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Cozy Bean Café</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body {
          background: linear-gradient(135deg, #1f140e 0%, #3e2723 100%);
          color: #f7ebe1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }
        .cafe-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 35px 30px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }
        .logo-badge {
          font-size: 50px;
          margin-bottom: 10px;
        }
        h1 {
          font-size: 32px;
          color: #ffcc80;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }
        p.tagline {
          font-size: 15px;
          color: #d7ccc8;
          margin-bottom: 25px;
        }
        .menu-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 25px;
        }
        .menu-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 12px 18px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 4px solid #ffab40;
        }
        .item-name { font-size: 16px; font-weight: 500; }
        .item-price { color: #ffe082; font-weight: bold; }
        .order-btn {
          background: linear-gradient(45deg, #ff9800, #f57c00);
          color: #fff;
          border: none;
          padding: 14px 28px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 30px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .order-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(245, 124, 0, 0.4);
        }
        .footer-note {
          margin-top: 20px;
          font-size: 12px;
          color: #a1887f;
        }
      </style>
    </head>
    <body>
      <div class="cafe-card">
        <div class="logo-badge">☕</div>
        <h1>Cozy Bean Café</h1>
        <p class="tagline">Freshly Brewed Coffee & Warm Smiles</p>

        <div class="menu-list">
          <div class="menu-item">
            <span class="item-name">☕ Caramel Macchiato</span>
            <span class="item-price">₹180</span>
          </div>
          <div class="menu-item">
            <span class="item-name">🍫 Hazelnut Mocha</span>
            <span class="item-price">₹210</span>
          </div>
          <div class="menu-item">
            <span class="item-name">🥐 Butter Croissant</span>
            <span class="item-price">₹120</span>
          </div>
        </div>

        <button class="order-btn" onclick="alert('Thank you for ordering at Cozy Bean Café!')">Order Now</button>
        <p class="footer-note">⚡ Automated Deployment via GitHub Actions & Docker</p>
      </div>
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