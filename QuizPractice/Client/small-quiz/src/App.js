import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ChangePassword from "./pages/ChangePassword";
import { DenyAcess } from "./pages/DenyAcess";
import HomeTest from "./pages/HomeTest";
import { ListUserTestHistory } from "./pages/ListUserTestHistory";
import List_question from "./pages/List_question";
import Login from "./pages/Login.js";
import Quiz from "./pages/Quiz";
import SignUp from "./pages/SignUp";
import { UserAnswer } from "./pages/UserAnswer";
import { PrivateRoute } from "./route/PrivateRoute";
import { ProtectedAdminRoute } from "./route/ProtectedAdminRoute";
import { ProtectedUserRoute } from "./route/ProtectedUserRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeTest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeTest />} />
        <Route element={<PrivateRoute />}>
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/list_question" element={<List_question />} />
          </Route>
          <Route element={<ProtectedUserRoute />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/viewusertest" element={<ListUserTestHistory />} />
            <Route path="/useranswer/:testId" element={<UserAnswer />} />
          </Route>
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/deny" element={<DenyAcess />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
