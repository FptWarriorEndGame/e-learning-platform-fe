// Production
// export const BACKEND_URL = `https://e-learning-api-dev.trannhatsang.com`; // Dev API site
// export const BACKEND_URL = `https://e-learning-api.trannhatsang.com`; // Production API site
// export const BACKEND_URL = `https://e-learning-api-dev.trannhatsang.com`;
// Development
// export const BACKEND_URL = process.env.BACKEND_URL; // local API URL
// backend-domain.ts
   let BACKEND_API: string;
if (process.env.NODE_ENV === 'development') {
    // Development
    // BACKEND_API = 'https://e-learning-api-dev.trannhatsang.com'; // Dev API site
    // BACKEND_API = 'https://e-learning-api-prod.trannhatsang.com'; // Dev API site
    BACKEND_API = 'http://localhost:9000'; // Local or Development API URL
  } else {
    // Production (assume process.env.BACKEND_URL is set on your server)
    BACKEND_API = process.env.BACKEND_URL ?? "https://e-learning-api.trannhatsang.com"; 
  }
  export const BACKEND_URL = BACKEND_API