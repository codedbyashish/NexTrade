const axios = require("axios");

const API_KEY = process.env.FINNHUB_API_KEY;

// Finnhub client
const finnhubClient = axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: API_KEY,
  },
});

/**
 * CLEAN SYMBOL FUNCTION
 * Handles: NASDAQ:AAPL, NSE:TCS → AAPL, TCS
 */
const cleanSymbol = (symbol) => {
  if (!symbol) return null;

  return symbol
    .toUpperCase()
    .replace("NASDAQ:", "")
    .replace("NSE:", "")
    .trim();
};

/**
 * GET LIVE STOCK PRICE
 */
const getMarketPrice = async (symbol) => {
  try {
    const clean = cleanSymbol(symbol);

    if (!clean) {
      console.log("Invalid symbol:", symbol);
      return null;
    }

    console.log("Fetching price for:", clean);

    const response = await finnhubClient.get("/quote", {
      params: { symbol: clean },
    });

    const data = response.data;

    console.log("Finnhub response:", data);

    // Finnhub returns:
    // c = current price
    if (!data || typeof data.c !== "number" || data.c <= 0) {
      console.log("Invalid price from API:", data);
      return null;
    }

    return data.c;
  } catch (error) {
    console.error(
      `❌ Price fetch failed for ${symbol}:`,
      error.response?.data || error.message
    );
    return null;
  }
};

module.exports = getMarketPrice;