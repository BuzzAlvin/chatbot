import NodeCache from "node-cache";

// TTL = 1 hour (3600 seconds)
const cache = new NodeCache({
  stdTTL: 60 * 60,
  checkperiod: 120,
});

// normalize input so small variations still hit cache
const normalize = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, " ");

// get cached response
export const getCachedResponse = (message) => {
  return cache.get(normalize(message));
};

// store response
export const setCachedResponse = (message, response) => {
  cache.set(normalize(message), response);
};