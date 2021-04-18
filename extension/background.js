"use strict";

const ROOT_ENDPOINT = "https://productivity.pchancs.com/";
const IS_LOGGED_IN_ENDPOINT =
  "https://productivity.pchancs.com/api/is_logged_in";
// Add url to the list of urls that user visit
const ADD_URL_ENDPOINT = "https://productivity.pchancs.com/api/add_url";
// Check if the given url is in the list of sites that are unproductive
const GET_URLLIST_ENDPOINT = "https://productivity.pchancs.com/api/get_urls";
const CHECK_IF_UNPRODUCTIVE_URL_ENDPOINT =
  "https://productivity.pchancs.com/api/is_unproductive";

let username = null;
let lastTabUrl = "";
let elapsedTime = 0;
let startTime = 0;
let productivity = false;
let timerFunction = null;

// Triggers when content.js sends a message to background
chrome.runtime.onConnect.addListener((port) => {
  console.log("[DEBUG] Connected to content!");
});

chrome.extension.onConnect.addListener((port) => {
  console.log("[DEBUG] Connected to popup!");
  port.onMessage.addListener((msg) => {
    if (msg === "Activate event listener") {
      console.log("[DEBUG] Activating event listener");
      chrome.tabs.onActivated.addListener(onActivatedEventListener);
      chrome.tabs.onUpdated.addListener(onUpdatedEventListener);
    } else if (msg === "Deactivate event listener") {
      console.log("[DEBUG] Deactivating event listener");
      chrome.tabs.onActivated.removeListener(onActivatedEventListener);
      chrome.tabs.onUpdated.removeListener(onUpdatedEventListener);
      username = null;
    } else if (msg.startsWith("Username: ")) {
      username = msg.match(/Username: (.+)/)[1];
    } else if (msg === "Give me username") {
      if (username === null) {
        port.postMessage("User not logged in");
      } else {
        port.postMessage(`Username: ${username}`);
        port.postMessage(`${productivity}`);
      }
    } else if (msg === "Toggle Productivity") {
      if (lastTabUrl !== "") {
        sendUrlToServer(lastTabUrl, elapsedTime);
      }
      elapsedTime = 0;
      productivity = !productivity;
      startTimer();
    }
  });
});

// When the user switch between tab, you want to stop the timer for the previous
// tab and then start the timer again for the new tab.
function onActivatedEventListener(activeInfo) {
  console.log("[DEBUG] Tab activated!");

  const { tabId } = activeInfo;
  const port = chrome.tabs.connect(tabId);
  chrome.tabs.get(tabId, (tab) => {
    const { url } = tab;
    console.log(url);
    if (lastTabUrl !== "") {
      sendUrlToServer(lastTabUrl, elapsedTime);
    }
    lastTabUrl = url;
    elapsedTime = 0;
    startTimer();
  });
}

// When the user switch to a new tab or they load up a new url in a new tab,
// send the url to the server
function onUpdatedEventListener(tabId, changeInfo, tab) {
  console.log("[DEBUG] Tab updated!");

  const url = changeInfo.url;
  if (lastTabUrl !== "") {
    sendUrlToServer(lastTabUrl, elapsedTime);
  }
  lastTabUrl = url;
  elapsedTime = 0;
  startTimer();
}

async function getUrlList() {
  const resp = await fetch(ROOT_ENDPOINT, (response) => response);

  const params = new URLSearchParams();
  params.append("username", username);

  fetch(GET_URLLIST_ENDPOINT, {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": resp.headers.get("X-CSRF-TOKEN"),
    },
    body: params,
  })
    .then((resp) => resp.json())
    .then((resp) => console.log(resp));
}

// Send the specified url to the server
async function sendUrlToServer(url, elapsedTime) {
  // TODO (after MVP): sync the encrypted blob with the server instead of sending the
  // url to address privacy concerns
  const resp = await fetch(ROOT_ENDPOINT, (response) => response);

  const params = new URLSearchParams();
  params.append("url", url);
  params.append("elapsedTime", elapsedTime);
  params.append("username", username);
  params.append("productivity", productivity);

  console.log(`${elapsedTime} elapsed for ${url}`);

  fetch(ADD_URL_ENDPOINT, {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": resp.headers.get("X-CSRF-TOKEN"),
    },
    body: params,
  }).then(() => {
    console.log("Sent url!");
  });
}

function startTimer() {
  if (timerFunction !== null) {
    clearInterval(timerFunction);
  }

  startTime = Date.now();
  timerFunction = setInterval(() => {
    let endTime = Date.now();
    let delta = endTime - startTime;
    startTime = endTime;

    elapsedTime += delta;
    console.log(`${elapsedTime} elapsed!`);
  }, 1000);
}
