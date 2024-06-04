import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
    
        <Routes>
          <Route path="/" element={<Login/> }/>
          <Route path="/register" element={<Register/>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home/>} />
          </Route>
        
        </Routes>
      
    );
  }
  
  export default App;