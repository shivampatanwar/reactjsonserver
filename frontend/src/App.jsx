import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const App = () => {

  const message = useRef();
  const msg = useRef();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    course: "",
  });

  const { name, email, phone, address, course } = student;

  let navigate = useNavigate();

  const [studentdata, setStudentdata] = useState([]);

  const fetchData = async () => {
    let data = await axios.get("http://localhost:3000/student");
    setStudentdata(data.data);
    return data;
  };

  console.log(studentdata);

  useEffect(() => {
    fetchData();
  }, [studentdata]);


  const handleChange = (e) => {
    let { name, value } = e.target;

    setStudent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await axios.post("http://localhost:3000/student", student);
      message.current.style.display="block";
      msg.current.textContent = `Student ${name} Saved successfully.... ` ;
      window.scrollTo(0, 0)
      setTimeout(() => {
        message.current.style.display="none";
      }, 10000);
      
    } catch (err) {
      console.log(err);
    }
  };


 

  let handleDelete = async (id) => {
    let data = await axios.delete(`http://localhost:3000/student/${id}`);
    message.current.style.display="block";
    msg.current.textContent = `Student ${data.data.name} deleted successfully.... ` ;
    setTimeout(() => {
      message.current.style.display="none";
    }, 10000);
    window.scrollTo(0, 0)
  };

  return (
    <div className="parent">
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
          <button>Submit</button>
        </div>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Course</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {studentdata.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.address}</td>
                  <td>{student.course}</td>
                  <td className="edit">
                    <button onClick={()=>{navigate(`/edit/${student.id}`)}}>Edit</button>
                  </td>
                  <td className="delete">
                    <button onClick={()=>{handleDelete(student.id)}}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div ref={message} id="message">
        <p ref={msg}></p>
        <button onClick={()=>{message.current.style.display="none"}}>X</button>
      </div>
    </div>  
  );
};

export default App;
