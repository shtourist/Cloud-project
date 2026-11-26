const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_BASE_URL = configuredApiUrl
  ? configuredApiUrl.replace(/\/+$/, "")
  : "http://localhost:5001";
