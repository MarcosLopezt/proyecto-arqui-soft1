import React, { useState } from 'react';

import './Home.css';
import Courses from "../components/Courses";
import Navbar from "../components/Navbar"
import './Home.css';




function Home (){
    return(
      <>
        <Navbar></Navbar>
        <Courses></Courses>
      </>
    )}

export default Home;