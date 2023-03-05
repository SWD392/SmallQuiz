import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { DenyAcess } from "./pages/DenyAcess";
import { HelloUser } from "./pages/HelloUser";
import HomeTest from "./pages/HomeTest";
import List_question from "./pages/List_question";
import Login from "./pages/Login.js";
import Quiz from "./pages/Quiz";
import SignUp from "./pages/SignUp";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";
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
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;
