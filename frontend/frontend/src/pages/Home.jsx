import * as React from 'react';

import './Home.css';
import Courses from "../components/Cards";
import Navbar from "../components/Navbar"

function Home (){
    return(
        <>
            <Navbar/>
            <Courses/>
        </>
    )
}

export default Home;