import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {
  Home,
  Register,
  Productd,
  Addproduct,
} from "./components";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productd" element={<Productd />} />
      <Route path="/addproduct" element={<Addproduct />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();
