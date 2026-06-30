import axios from "axios";

const API_KEY =
  import.meta.env.VITE_FINNHUB_API_KEY ||
  "d8tutd1r01qinhuemfr0d8tutd1r01qinhuemfrg";

const finnhubClient = axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: API_KEY,
  },
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getstocksprice = async (symbol) => {
  try {
    const response = await finnhubClient.get("/quote", {
      params: { symbol },
    });

    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch stock price for ${symbol}:`,
      error.message
    );
    return null;
  }
};

export const getCompanyProfile = async (symbol) => {
  try {
    const response = await finnhubClient.get("/stock/profile2", {
      params: { symbol },
    });

    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch company profile for ${symbol}:`,
      error.message
    );
    return null;
  }
};

export const getBasicFinancials = async (symbol) => {
  try {
    const response = await finnhubClient.get("/stock/metric", {
      params: {
        symbol,
        metric: "all",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch financials for ${symbol}:`,
      error.message
    );
    return null;
  }
};

export const getCompanyNews = async (symbol, from, to) => {
  try {
    const response = await finnhubClient.get("/company-news", {
      params: {
        symbol,
        from,
        to,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch news for ${symbol}:`, error.message);
    return [];
  }
};

export const getCandles = async (symbol, days = 14) => {
  try {
    const to = Math.floor(Date.now() / 1000);
    const from = to - days * 24 * 60 * 60;

    const response = await finnhubClient.get("/stock/candle", {
      params: {
        symbol,
        resolution: "D",
        from,
        to,
      },
    });

    if (response.data.s !== "ok") return null;

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch candles for ${symbol}:`, error.message);
    return null;
  }
};

export const searchSymbols = async (query) => {
  try {
    const response = await finnhubClient.get("/search", {
      params: { q: query },
    });

    return response.data.result || [];
  } catch (error) {
    console.error("Error searching symbols:", error.message);
    return [];
  }
};

export const getMultipleStocksData = async (
  symbols,
  delayMs = 150
) => {
  const results = [];

  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];

    const [quote, profile] = await Promise.all([
      getstocksprice(symbol),
      getCompanyProfile(symbol),
    ]);

    results.push({ symbol, quote, profile });

    if (i < symbols.length - 1) {
      await delay(delayMs);
    }
  }

  return results;
};