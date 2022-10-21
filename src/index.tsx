/* @refresh reload */
import { Router } from "solid-app-router";
import { render } from "solid-js/web";

import "@unocss/reset/tailwind.css";
import "uno.css";

import App from "./App";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
