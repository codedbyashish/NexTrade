in fututre file structure 

Frontend file structure

src/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── layouts/
│   ├── MainLayout.jsx
│   ├── AuthLayout.jsx
│   └── DashboardLayout.jsx
│
├── pages/
│   │
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   │
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── Auth.css
│   │
│   ├── Dashboard/
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.css
│   │
│   ├── Stocks/
│   │   ├── Stocks.jsx
│   │   └── Stocks.css
│   │
│   ├── StockDetails/
│   │   ├── StockDetails.jsx
│   │   └── StockDetails.css
│   │
│   ├── Trading/
│   │   ├── Trade.jsx
│   │   └── Trading.css
│   │
│   ├── Portfolio/
│   │   ├── Portfolio.jsx
│   │   └── Portfolio.css
│   │
│   ├── Watchlist/
│   │   ├── Watchlist.jsx
│   │   └── Watchlist.css
│   │
│   ├── History/
│   │   ├── History.jsx
│   │   └── History.css
│   │
│   ├── News/
│   │   ├── News.jsx
│   │   └── News.css
│   │
│   └── Profile/
│       ├── Profile.jsx
│       └── Profile.css
│
├── features/
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── AuthButton.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   │
│   │   └── services/
│   │       └── authApi.js
│   │
│   ├── stocks/
│   │   ├── components/
│   │   │   ├── StockCard.jsx
│   │   │   ├── StockTable.jsx
│   │   │   ├── StockRow.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── FilterBar.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useStocks.js
│   │   │
│   │   └── services/
│   │       └── stockApi.js
│   │
│   ├── trading/
│   │   ├── components/
│   │   │   ├── OrderPanel.jsx
│   │   │   ├── BuyForm.jsx
│   │   │   ├── SellForm.jsx
│   │   │   ├── PositionCard.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   ├── TradeHistory.jsx
│   │   │   └── TradeConfirmationModal.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useTrade.js
│   │   │
│   │   └── services/
│   │       └── tradeApi.js
│   │
│   ├── portfolio/
│   │   ├── components/
│   │   │   ├── BalanceCard.jsx
│   │   │   ├── HoldingsTable.jsx
│   │   │   ├── AllocationChart.jsx
│   │   │   └── ProfitLossCard.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── usePortfolio.js
│   │   │
│   │   └── services/
│   │       └── portfolioApi.js
│   │
│   ├── watchlist/
│   │   ├── components/
│   │   │   ├── WatchlistTable.jsx
│   │   │   └── WatchlistCard.jsx
│   │   │
│   │   └── services/
│   │       └── watchlistApi.js
│   │
│   ├── news/
│   │   ├── components/
│   │   │   ├── NewsCard.jsx
│   │   │   |
│   │   │   └── NewsFilter.jsx
│   │   │
│   │   └── services/
│   │       └── newsApi.js
│   │
│   └── charts/
│       ├── components/
│       │   ├── TradingViewChart.jsx
│       │   ├── MarketOverview.jsx
│       │   ├
│       │   └── ScreenerWidget.jsx
│
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
│   ├── Loader.jsx
│   └── Button.jsx
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── styles/
│   ├── global.css
│   ├── variables.css
│   ├── reset.css
│   └── responsive.css
│
├── utils/
│   ├── formatCurrency.js
│   ├── calculateProfit.js
│   ├── constants.js
│     
│
├── App.jsx
└── main.jsx
