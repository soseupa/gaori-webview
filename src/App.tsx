import React from "react";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Map } from "./pages/map";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map/:planId" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
