<div align="center">

# 📈 NexTrade

**A full-stack stock trading dashboard for the US markets (NASDAQ/NYSE)**

Built with the MERN stack, featuring live market data, portfolio tracking, and a simulated trading engine. 🚀
<img width="1559" height="784" alt="image" src="https://github.com/user-attachments/assets/ff1409a7-f164-4618-9d52-6c1309c4c97e" />
<img width="1549" height="784" alt="image" src="https://github.com/user-attachments/assets/12ee8c3c-c448-4d8b-bce0-49fb4338c669" />
<img width="1556" height="784" alt="image" src="https://github.com/user-attachments/assets/5def680d-caad-4f0b-9083-b984371b6f79" />
<img width="1543" height="784" alt="image" src="https://github.com/user-attachments/assets/fb634e30-a4d0-4f63-90b6-73375637907f" />
<img width="1549" height="784" alt="image" src="https://github.com/user-attachments/assets/31a821b8-e207-430e-a59e-9dd4ebea682e" />





[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://nextrade-frontend-m0s1.onrender.com/)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

[Live Demo](https://nextrade-frontend-m0s1.onrender.com/) · [Report a Bug](https://github.com/codedbyashish/NexTrade/issues) · [Request a Feature](https://github.com/codedbyashish/NexTrade/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Application Routes](#application-routes)
- [Roadmap](#roadmap)
- [Disclaimer](#disclaimer)
- [License](#license)
- [Author](#author)

---

## 🔍 Overview

NexTrade is a full-stack trading terminal that simulates the experience of investing in the US stock market. It combines a real-time data pipeline (via the Finnhub API) with a persistent backend for user accounts, portfolios, and trade history — delivered through a fast, responsive interface inspired by modern fintech platforms like Zerodha and Groww.

The project was built to demonstrate end-to-end full-stack development: RESTful API design, database modeling, authentication, third-party API integration, and production-grade frontend engineering with React.

## ✨ Features

| Module | Description |
|---|---|
| 🔐 **Authentication** | Secure signup and login flows with form validation |
| 📊 **Dashboard** | Most traded stocks, live TradingView candlestick charts, top gainers/losers, recent trades |
| 🔎 **Stock Explorer** | Search any NASDAQ/NYSE symbol; view live price, day/52-week range, key stats, and place orders |
| 💼 **Portfolio** | Total portfolio value, cash balance, real-time P&L, and asset allocation breakdown |
| 📈 **Trading Activity** | Active positions with live P&L, execution analytics, and full order history |
| ⭐ **Watchlist** | Track favorite symbols with live price, day change %, and 7-day trend sparklines |
| 🙍 **Profile** | Avatar upload and inline profile editing |
| 🌗 **Theming** | Persistent dark/light mode across the entire application |

## 🛠️ Tech Stack

### 🎨 Frontend

| Technology | Purpose |
|---|---|
| React + Vite | Core UI framework and build tooling |
| React Router v6 | Client-side routing |
| CSS Modules + Tailwind CSS v4 | Component styling |
| Lucide React | Icon library |
| TradingView Advanced Chart Widget | Live candlestick charting |
| Axios | HTTP client |

### ⚙️ Backend

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and object modeling |
| JWT | Authentication and session management |
| MVC Architecture | `controller`, `models`, `routes`, `middleware`, `services`, `config` |

### 🔌 External Services

| Service | Purpose |
|---|---|
| Finnhub API | Real-time stock prices, company profiles, and financials |

### ☁️ Deployment

| Layer | Platform |
|---|---|
| Frontend & Backend | Render |

## 📂 Project Structure

```
NexTrade/
├── Frontend/
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── Context/         # ThemeContext (dark/light theme)
│   │   ├── api/               # Finnhub API utilities
│   │   ├── assets/            # Images and static assets
│   │   ├── pages/              # Route-level pages
│   │   ├── pages2/              # Additional page views
│   │   ├── props/                 # Shared prop definitions/config
│   │   ├── stockscahrts/           # Stock chart components
│   │   ├── utils/                    # Helper functions
│   │   ├── App.jsx                    # Router configuration
│   │   ├── index.css                   # Theme tokens
│   │   └── main.jsx                     # App entry point
│   ├── public/
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── config/              # Database and environment configuration
│   ├── controller/           # Route handler logic
│   ├── middleware/            # Auth and request middleware
│   ├── models/                 # Mongoose schemas
│   ├── routes/                  # API route definitions
│   ├── services/                 # Business logic layer
│   ├── app.js                     # Express app setup
│   ├── server.js                   # Server entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

Follow these steps to run NexTrade locally.

### 📋 Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas cluster)
- A free [Finnhub API key](https://finnhub.io/register)

### ⚙️ Backend Setup

```bash
git clone https://github.com/codedbyashish/NexTrade.git
cd NexTrade/backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
node server.js
```

### 🎨 Frontend Setup

```bash
cd NexTrade/Frontend
npm install
```

Create a `.env` file inside `Frontend/`:

```env
VITE_FINNHUB_API_KEY=your_finnhub_api_key_here
VITE_API_BASE_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🗺️ Application Routes

| Path | Description |
|---|---|
| `/` | Landing page |
| `/login` | Login |
| `/signup` | Signup |
| `/dashboard` | Main dashboard |
| `/dashboard/stocks?symbol=EXCHANGE:TICKER` | Stock detail and trading panel |
| `/dashboard/portfolio` | Portfolio overview |
| `/dashboard/trading` | Trading activity and order history |
| `/dashboard/watchlist` | Watchlist |

## 🔮 Roadmap

- [ ] 🔑 JWT-based session persistence across the frontend
- [ ] ⚡ Real-time price updates via WebSockets
- [ ] 📉 Advanced order types (limit, stop-loss)
- [ ] 🧪 Unit and integration test coverage
- [ ] 🔁 CI/CD pipeline for automated deployment

## ⚠️ Disclaimer

NexTrade is a simulation and educational project. It does not execute real trades, is not connected to any brokerage, and should not be used for actual investment decisions. Market data is provided via the Finnhub free tier and may be delayed.



## 👤 Author

**Ashish** — Frontend
GitHub: [@codedbyashish](https://github.com/codedbyashish)

**Harshdeep Singh** — Backend
GitHub: [@Code-by-Harshdeep](https://github.com/Code-by-Harshdeep)

---

<div align="center">

⭐ If you find this project interesting, consider giving it a star!

</div>
