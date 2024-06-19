const devApiUrl = import.meta.env.VITE_DEV_API;
const prodApiUrl = import.meta.env.VITE_PROD_API;
const appEnv = import.meta.env.VITE_APP_ENV;

export const BASE_URL = appEnv === "development" ? devApiUrl : prodApiUrl;
