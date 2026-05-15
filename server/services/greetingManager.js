import {
  getGreeting,
  setGreeting,
  shouldRegenerateGreeting,
} from "../cache/greetingCache.js";

import { generateGreeting } from "./generateGreeting.js";

//MAIN LOGIC FOR STORING ONE GREETING CALL AND REUSING IT

export const getOrCreateGreeting = async () => {
  // return cached if exists
  const cached = getGreeting();
  if (cached && !shouldRegenerateGreeting()) {
    return cached;
  }

  // generate new one
  const newGreeting = await generateGreeting();

  // store it
  setGreeting(newGreeting);

  return newGreeting;
};