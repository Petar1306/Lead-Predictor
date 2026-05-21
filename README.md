# LeadPredictor

A simple, interactive sales funnel calculator that helps you plan a marketing campaign by predicting how many **prospects**, **leads**, and **customers** you need in order to reach a target revenue.

You enter your **total revenue goal**, **average order value**, and your **response rates** for prospects and leads — the app instantly calculates the size of the funnel and visualizes the cumulative growth over a 6-month campaign in a horizontal bar chart.

🔗 **Live demo:** *https://your-site-name.netlify.app* (replace with your Netlify URL after deployment)

---

## ✨ Features

- 📊 **Live calculation** of the full sales funnel (Customers → Leads → Prospects)
- 📈 **Interactive chart** showing cumulative growth across 6 months
- 🎚️ **Range sliders** for fine-tuning Lead Response Rate and Prospect Response Rate
- 🌍 **Multi-language support** — English and Bulgarian (Български)
- 💰 Currency-aware revenue and order-value inputs
- 🌙 Clean, modern dark UI

---

## 🧮 How it works — the formulas

The calculator works backwards from your revenue goal. Given a target **Total Revenue**, an **Average Order Value**, and the two response rates, it derives the size of each stage of the funnel.

### Formula 1 — Customers needed

The number of customers required to reach the target revenue is the revenue divided by the average order value:

```
Customers = Total Revenue / Average Order Value
```

### Formula 2 — Leads needed

Not every lead becomes a customer. The number of leads required is the number of customers scaled up by the **Lead Response Rate** (the percentage of leads that convert into customers):

```
Leads = (Customers × 100) / Lead Response Rate (%)
```

### Formula 3 — Prospects needed

Similarly, not every prospect becomes a lead. The number of prospects to reach out to is the number of leads scaled up by the **Prospect Response Rate**:

```
Prospects = (Leads × 100) / Prospect Response Rate (%)
```

### Worked example

With the default values from the screenshot:

| Input | Value |
|---|---|
| Total Revenue | $10,000 |
| Average Order Value | $1,000 |
| Lead Response Rate | 40% |
| Prospect Response Rate | 20% |

The calculator produces:

- **Customers** = 10,000 / 1,000 = **10**
- **Leads** = (10 × 100) / 40 = **25**
- **Prospects** = (25 × 100) / 20 = **125**

So to earn $10,000 in revenue you need to reach out to **125 prospects**, of which **25** are expected to become leads, and **10** of those leads will turn into paying customers.

---

## 🛠️ Tech stack

- **HTML5** — semantic structure
- **CSS3** — custom properties (CSS variables) and a responsive grid layout
- **Vanilla JavaScript (ES6+)** — no frameworks, no build step
- **[Chart.js](https://www.chartjs.org/)** — loaded via CDN for the bar chart

---

## 🚀 Running locally

No build tools are required — just open the file in a browser.

```bash
# Clone the repository
git clone https://github.com/Petar1306/Lead-Predictor.git
cd Lead-Predictor

# Open in your browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

Or, for a slightly better dev experience with auto-reload, serve the folder with any static server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .
```

Then open http://localhost:8000 in your browser.

---

## 📁 Project structure

```
Lead-Predictor/
├── index.html      # Layout and DOM markup
├── styles.css      # Theme variables, layout, sliders, cards
├── script.js       # Calculations, chart rendering, i18n
└── README.md       # You are here
```

---

## 👤 Author

Recreated by **Petar1306** as a hands-on exercise in Git, GitHub workflows (branches, pull requests, reverts) and Netlify deployment.

## 📄 License

This project is released under the MIT License — feel free to use, modify, and share.