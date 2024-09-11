import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import dataReducer from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const store = configureStore({
  reducer: {
    reduxStore: dataReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
