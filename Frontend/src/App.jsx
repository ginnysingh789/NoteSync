
import React  from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import  {  SignUp } from "./Componets/SignUp";
import { SignIn } from "./Componets/SignIn";
import { Dashboard } from "./Componets/Dashboard";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path='/sign-in' element={<SignIn/>}></Route>
      <Route path ='/dashboard' element={<Dashboard/>}></Route>
    </Routes> 
    </BrowserRouter>
    
  );
 
}

export default App;
