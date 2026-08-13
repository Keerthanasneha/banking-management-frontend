// provides a typed/centralized access point for environment-specific configuration such as the API Gateway URL."

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const env = {
  apiBaseUrl,
};