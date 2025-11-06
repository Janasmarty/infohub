import axios from "axios";

/**
 * Try GET request to `url`. If it fails (network or 4xx/5xx),
 * and `fallback` is provided, returns fallback() result.
 * Otherwise throws.
 */
export async function fetchWithFallback(url, fallback = null, timeout = 8000) {
  try {
    const source = axios.CancelToken.source();
    const timer = setTimeout(() => source.cancel(), timeout);

    const res = await axios.get(url, { cancelToken: source.token });
    clearTimeout(timer);
    return res.data;
  } catch (err) {
    // If fallback provided, return its value (can be sync or async)
    if (fallback) {
      try {
        return typeof fallback === "function" ? await fallback() : fallback;
      } catch (fErr) {
        throw fErr;
      }
    }
    // Re-throw original error for caller to display
    throw err;
  }
}
