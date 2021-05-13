import React, { StrictMode } from "react";
import { render } from "react-dom";

import { App } from "./app";
import "webext-base-css";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("OPTIONS_ROOT")
);
