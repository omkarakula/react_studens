import React from 'react';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import {  Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<StudentForm />} />
        <Route path="/edit/:id" element={<StudentForm />} />
      </Routes>
    
  );
};

export default App;
