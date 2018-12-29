import { onReady } from "./onReady.js";

const main = () => {
  const titleEl = document.createElement("h1");
  titleEl.textContent = "Hello Boilerplate";
  document.body.appendChild(titleEl);
};

onReady(main);
