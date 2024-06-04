import { InputBase } from '@mui/material';
import React, { useState, useContext } from 'react';
// Import the SearchContext (explained later)
//import { SearchContext } from './SearchContext'; // Assuming SearchContext.js is in the same directory

export const SearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const [courses, setCourses] = useState([]);

    const handleChange = (event) =>{
        setSearchText(event.target.value);
    }

    const handleSubmit = () =>{
        const name = searchText;
        //console.log(name);
        if(name == null){
            console.log("Ingrese un texto")
        }else{
            search(name);
        }

    }

    const search = async (name) =>{
        console.log(name);
        const response = await fetch(`http://localhost:8080/cursos/${name}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            //body: JSON.stringify({ "email": email, "password": password })
          });
          
          if(response.status === 200){
            const data = await response.json();
            //console.log(data[0]);
            setCourses(data);
          }else{
            console.log("No existe el curso");
          }
    }
 
  return (
    <form onSubmit={handleSubmit}>
    <InputBase
      placeholder="Buscar..."
      inputProps={{ 'aria-label': 'buscar' }}
      style={{ marginLeft: '10px' }}
      value={searchText}
      onChange={handleChange}
    />
    </form>
  );
}