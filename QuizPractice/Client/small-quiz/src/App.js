import "./App.css";
import Login from "./pages/Login.js";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeTest from "./pages/HomeTest";
import List_question from "./pages/List_question";
import SignUp from "./pages/SignUp";
import { HelloUser } from "./pages/HelloUser";
import jwt_decode from "jwt-decode";
import { DenyAcess } from "./pages/DenyAcess";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomeTest />} />
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/list_question" element={<List_question />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/user" element={<HelloUser />} />
      <Route path="/deny" element={<DenyAcess />} />
    </Routes>
  );
}

export default App;
