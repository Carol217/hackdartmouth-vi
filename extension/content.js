"use strict";

// Triggers when background.js sends message to content
chrome.runtime.onConnect.addListener((port) => {
  console.log("[DEBUG] Connected!");
});
