import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();

  const message = useRef();


  const [studentUpdated, setStudentUpdated] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    course: "",
  });


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let data = await axios.get(`http://localhost:3000/student/${id}`);
      setStudentUpdated(data.data);
    };
    fetchData();
  }, []);

  const { name, email, phone, address, course } = studentUpdated;

  const handleChange = (e) => {
    setStudentUpdated({ ...studentUpdated, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/student/${id}`, studentUpdated);
    message.current.style.display = "block";
    setTimeout(() => {
        navigate(-1); // Navigate back to the previous page
    }, 4000);
    
  };

  return (
    <div className="parent" id="parent1">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            name="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            value={phone}
            name="phone"
            id="phone"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={address}
            name="address"
            id="address"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="course">Course</label>
          <input
            type="text"
            value={course}
            name="course"
            id="course"
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Update</button>
        </div>
      </form>
      <div ref={message} id="message">
        <p>Student updated successfully....  </p>
      </div>
    </div>
  );
};

export default Edit;
