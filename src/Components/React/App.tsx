import "../Css/App.css";
// React
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Downloads } from "../../Screens/React/Downloads";
import { Store } from "../../Screens/React/Store";
import { Library } from "../../Screens/React/Library";
import { Home } from "../../Screens/React/Admin/Home";
import { AddGame } from "../../Screens/React/Admin/AddGame";
import { Wish } from "../../Screens/React/Wish";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { RemoveGame } from "../../Screens/React/Admin/RemoveGame";
import { EditGame } from "../../Screens/React/Admin/EditGame";

export default function App() {
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <div className="App" style={theme.bodyStyle}>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/download" element={<Downloads />} />
          <Route path="/library" element={<Library />} />
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/addgame" element={<AddGame />} />
          <Route path="/admin/removegame" element={<RemoveGame />} />
          <Route path="/admin/editgame" element={<EditGame />} />
          <Route path="/wish" element={<Wish />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
