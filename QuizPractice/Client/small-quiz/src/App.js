import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChangePassword from "./pages/ChangePassword";
import { DenyAcess } from "./pages/DenyAcess";
import { HelloUser } from "./pages/HelloUser";
import HomeTest from "./pages/HomeTest";
import { ListUserTestHistory } from "./pages/ListUserTestHistory";
import List_question from "./pages/List_question";
import Login from "./pages/Login.js";
import Quiz from "./pages/Quiz";
import SignUp from "./pages/SignUp";
import { UserAnswer } from "./pages/UserAnswer";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";
function App() {

  return (
    <Routes>
      <Route path="/" element={<HomeTest />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomeTest />} />
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/list_question" element={<List_question />} />
      </Route>
      <Route path="/viewusertest" element={<ListUserTestHistory />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/user" element={<HelloUser />} />
      <Route path="/deny" element={<DenyAcess />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/useranswer/:testId" element={<UserAnswer />} />
      <Route path="/changepassword" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
