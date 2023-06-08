import React from "react";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Map } from "./pages/map";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "./pages/home";

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
