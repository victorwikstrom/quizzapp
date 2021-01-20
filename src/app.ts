import { onReady } from "./onReady.js";

const main = () => {
  let heading = document.createElement("h1");
  heading.innerText = "hejhejhej";
  document.body.appendChild(heading);
};

onReady(main);
