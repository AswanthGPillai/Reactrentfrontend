// Remove trailing slash to prevent double-slashes in URLs
export const serverURL = (import.meta.env.VITE_API_URL || 'https://reactrentserver-4.onrender.com').replace(/\/$/, '');