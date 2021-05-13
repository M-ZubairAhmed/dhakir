import React, { StrictMode } from "react";
import { render } from "react-dom";

import { App } from "./app";
import "./styles.scss";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("NEW_TAB_ROOT")
);
