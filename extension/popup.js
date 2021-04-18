const ROOT_ENDPOINT = "https://productivity.pchancs.com/";
const LOGIN_ENDPOINT = "https://productivity.pchancs.com/api/login";
const REGISTER_ENDPOINT = "https://productivity.pchancs.com/api/register";
const IS_LOGGED_IN_ENDPOINT =
  "https://productivity.pchancs.com/api/is_logged_in";

let backgroundIsLoggedIn = null;
let backgroundUsername = null;

const port = chrome.extension.connect({
  name: "Popup",
});
port.onMessage.addListener((msg) => {
  if (msg.startsWith("Username: ")) {
    backgroundIsLoggedIn = true;
    backgroundUsername = msg.match(/Username: (.+)/)[1];
  } else if (msg !== "true" && msg !== "false") {
    backgroundIsLoggedIn = false;
  }
});

async function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username);

  const resp = await fetch(ROOT_ENDPOINT, (response) => response);

  fetch(LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": resp.headers.get("X-CSRF-TOKEN"),
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((response) => console.log(response));

  port.postMessage("Activate event listener");
  port.postMessage(`Username: ${username}`);
  window.location.href = "logged_in.html";
}

async function register(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const resp = await fetch(ROOT_ENDPOINT, (response) => response);

  fetch(REGISTER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": resp.headers.get("X-CSRF-TOKEN"),
    },
    body: JSON.stringify({
      username,
      password,
      confirmationPassword: password,
    }),
  });
}

async function checkIfLoggedIn() {
  const isLoggedIn = await fetch(IS_LOGGED_IN_ENDPOINT)
    .then((resp) => resp.json())
    .then((resp) => resp.isLoggedIn);
  if (isLoggedIn === "true") {
    window.location.href = "logged_in.html";
  } else {
    port.postMessage("Give me username");
    setTimeout(() => {
      if (backgroundIsLoggedIn) {
        window.location.href = "logged_in.html";
      }
    }, 100);
  }
}

document.getElementById("login").addEventListener("click", login);
document.getElementById("register").addEventListener("click", register);

checkIfLoggedIn();
