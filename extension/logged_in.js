const ROOT_ENDPOINT = "https://productivity.pchancs.com/";
const IS_LOGGED_IN_ENDPOINT =
  "https://productivity.pchancs.com/api/is_logged_in";
const LOGOUT_ENDPOINT = "https://productivity.pchancs.com/api/logout";

let backgroundIsLoggedIn = null;
let backgroundUsername = null;

const port = chrome.extension.connect({
  name: "Logged In",
});
port.onMessage.addListener((msg) => {
  if (msg.startsWith("Username: ")) {
    backgroundIsLoggedIn = true;
    backgroundUsername = msg.match(/Username: (.+)/)[1];
  } else if (msg === "true" || msg === "false") {
    backgroundIsLoggedIn = true;
    const productivityButton = document.getElementById("setProductivity");
    if (msg === "true") {
      productivityButton.innerText = "I am not being productive on this site";
    } else {
      productivityButton.innerText = "I am being productive on this site";
    }
  } else {
    console.log(msg);
    backgroundIsLoggedIn = false;
  }
});

async function logout() {
  const resp = await fetch(ROOT_ENDPOINT, (response) => response);

  await fetch(LOGOUT_ENDPOINT, {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": resp.headers.get("X-CSRF-TOKEN"),
    },
  });

  port.postMessage("Deactivate event listener");
  window.location.href = "popup.html";
}

function setProductivity() {
  port.postMessage("Toggle Productivity");

  const productivityButton = document.getElementById("setProductivity");
  if (productivityButton.innerText === "I am being productive on this site") {
    productivityButton.innerText = "I am not being productive on this site";
  } else {
    productivityButton.innerText = "I am being productive on this site";
  }
}

async function insert_username() {
  const username = await fetch(IS_LOGGED_IN_ENDPOINT)
    .then((resp) => resp.json())
    .then((resp) => resp.username);

  if (username.trim() === "") {
    port.postMessage("Give me username");
    setTimeout(() => {
      const statusMessage = document.getElementById("status-message");
      statusMessage.innerText = `Welcome ${backgroundUsername}!`;
    }, 200);
  }

  const statusMessage = document.getElementById("status-message");
  statusMessage.innerText = `Welcome ${username}!`;
}

document.getElementById("logout").addEventListener("click", logout);
document
  .getElementById("setProductivity")
  .addEventListener("click", setProductivity);
insert_username();
