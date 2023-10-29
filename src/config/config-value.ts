export const ConfigValue = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  REST_API_URL:
    process.env.NEXT_PUBLIC_REST_API_URL || "http://localhost:5000/api",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};
