import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { Fragment } from "react";

import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Fragment>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}> {/*Объясняем Provider что есть хранилище store из ./redux/store */}
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </Fragment>
);
