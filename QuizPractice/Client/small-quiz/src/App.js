import './App.css';
import Login from './pages/Login.js';
import React   from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeTest from './pages/HomeTest';
import List_question from './pages/List_question';
import SignUp from './pages/SignUp';
import { HelloUser } from './pages/HelloUser';

function App() {

  const token = localStorage.getItem("token");

  

  return (
   <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} /> 
      <Route path='/home' element={<HomeTest />} /> 
      <Route path= '/list_question' element={!token ? <Navigate to="/" replace /> : <List_question />}/>
      <Route path= '/signup' element={<SignUp />}/>
      <Route path= '/user' element={!token ? <Navigate to="/" replace /> : <HelloUser />}/>
   </Routes>
  // <div>
  //      <BrowserRouter>
  //       <Route exact path="/login" component={Login} />
	// 	<Route exact path="/" component={HomeTest} />
  //     </BrowserRouter>
  // </div>
  );
}

export default App;
