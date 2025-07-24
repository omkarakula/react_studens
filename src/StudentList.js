import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    axios.get('http://localhost:3001/students')
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      axios.delete(`http://localhost:3001/students/${id}`)
        .then(() => fetchStudents())
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/add">Add Student</Link>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.fee}</td>
              <td>
                <Link to={`/edit/${student.id}`}>Edit</Link> |
                <button  onClick={() => deleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
