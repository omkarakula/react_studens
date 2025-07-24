import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const StudentForm = () => {
  const [student, setStudent] = useState({ name: '', course: '', fee: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost:3001/students/${id}`)
        .then(res => {
          setStudent(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:3001/students/${id}`, student)
        .then(() => navigate('/'))
        .catch(err => console.log(err));
    } else {
      axios.post('http://localhost:3001/students', student)
        .then(() => navigate('/'))
        .catch(err => console.log(err));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={student.name || ''} onChange={handleChange} required />
        <input type="text" name="course" placeholder="Course" value={student.course || ''} onChange={handleChange} required />
        <input type="number" name="fee" placeholder="Fee" value={student.fee || ''} onChange={handleChange} required />
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default StudentForm;
