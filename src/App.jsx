import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [values, setValues] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    //const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const storedEmployees = JSON.parse(sessionStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleChanges = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[A-Za-z\s]+$/.test(values.name)) {
      alert("Name should only contain alphabets.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (values.dob >= today) {
      alert("Date of Birth cannot be today or in the future.");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      alert("Enter a valid email (e.g., example123@gmail.com).");
      return;
    }

    if (!/^\d{10}$/.test(values.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const emailExists = employees.some((emp) => emp.email === values.email);
    if (emailExists) {
      alert("Email already exists. Please use a different email.");
      return;
    }

    const updatedEmployees = [...employees, values];
    //localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    sessionStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);

    setValues({
      name: "",
      age: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="container">
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={values.name} onChange={handleChanges} required />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" min="1" max="100" value={values.age} onChange={handleChanges} required />

        <label>Gender:</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="male" checked={values.gender === "male"} onChange={handleChanges} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={values.gender === "female"} onChange={handleChanges} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" checked={values.gender === "other"} onChange={handleChanges} />
            Other
          </label>
        </div>

        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" value={values.dob} onChange={handleChanges} max={new Date().toISOString().split("T")[0]} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={values.email} onChange={handleChanges} required />

        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" value={values.phone} onChange={handleChanges} required />

        <div className="button-container">
          <button type="submit">Submit</button>
        </div>

        <div>
          <button onClick={toggleVisibility}>{isVisible ? "Hide Table" : "Show Table"}</button>
        </div>
      </form>

      <h2>Employee List</h2>
      {employees.length > 0 && isVisible ? (
        <table border="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.age}</td>
                <td>{employee.gender}</td>
                <td>{employee.dob}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) :employees.length <= 0 ?  (
        <p>No employees added yet.</p>
      ):null}
    </div>
  );
}

export default App;
