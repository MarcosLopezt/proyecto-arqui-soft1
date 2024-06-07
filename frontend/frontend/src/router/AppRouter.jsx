import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import CreateCourse from "../pages/CreateCourse";
import ProtectedRoute from "./ProtectedRoute";
import Course from "../pages/Course";
import MyCourses from "../pages/MyCourses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/course" element={<Course />} />
        <Route path="/mycourses" element={<MyCourses />} />
      </Route>
    </Routes>
  );
}

export default App;
