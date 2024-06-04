import React, { useEffect } from 'react';

import './Home.css';
import Courses from "../components/Courses";
import Navbar from "../components/Navbar"
import './Home.css';
import { useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

//validar permisos para ver que modulos mostramos en la navbar


function Home (){
  const location = useLocation();
  const role = location.state?.role;


    return(
      <>
        <Navbar role={role}></Navbar>
        <Courses></Courses>
      </>
    )}

export default Home;