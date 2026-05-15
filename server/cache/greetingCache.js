let cachedGreeting = null;
let lastGenerated = null;

export const getGreeting = () => cachedGreeting;

export const setGreeting = (greeting) => {
  cachedGreeting = greeting;
  lastGenerated = Date.now();
};

export const shouldRegenerateGreeting = () => {
  if (!cachedGreeting) return true;

  const ONE_DAY = 24 * 60 * 60 * 1000;
  return Date.now() - lastGenerated > ONE_DAY;
};