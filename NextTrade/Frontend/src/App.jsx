import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Components/Layout";
import Dashboard from "./pages2/Dashboard";
import Stocks from "./pages2/Stocks/Stocks";
import Portfolio from "./pages2/Portfolio/Portfolio";
import Trading from "./pages2/Trading/Trading";
import Watchlist from "./pages2/Watchlist/Watchlist";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";

import useTheme, { ThemeProvider } from "./Context/ThemeContext";
import Profile from "./pages2/DashboardHeader/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "stocks", element: <Stocks /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "trading", element: <Trading /> },
      { path: "watchlist", element: <Watchlist /> },
       { path: "profile", element: <Profile/> }, 
    ],
  },
]);

const AppContent = () => {
  const { darkmode } = useTheme();

  return (
    <div className={darkmode ? "dark" : ""}>
      <RouterProvider router={router} />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;