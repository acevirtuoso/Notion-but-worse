import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import View from "./View";
import Edit from "./Edit";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<p id="rightplaceholder">create a note or select one</p>}
          ></Route>
          <Route path="/:ID" element={<View />}></Route>
          <Route path="/:ID/edit" element={<Edit />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
