import './App.css';
import Login from './pages/Login.js';
import React   from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeTest from './pages/HomeTest';
import List_question from './pages/List_question';

function App() {


  return (
   <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} /> 
      <Route path='/home' element={<HomeTest />} /> 
      <Route path= '/list_question' element={<List_question />}/>
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
