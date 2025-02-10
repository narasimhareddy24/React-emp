import "./App.css";
import { useState } from "react";

function App() {
  const [values, setValues] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    email: "",
    phone: ""

  });

  const handleChanges = (e) => {
    console.log(e,"inhandle change function")
    setValues({
      ...values,
      [e.target.name]: e.target.value, // ✅ Fix: Corrected name and value assignment
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="container">
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name} 
          onChange={handleChanges}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          min="1"
          max="100"
          value={values.age} // ✅ Fix: Added value attribute
          onChange={handleChanges}
          required
        />

        <label>Gender:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={values.gender === "male"} // ✅ Fix: Added checked attribute
              onChange={handleChanges}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={values.gender === "female"} // ✅ Fix: Added checked attribute
              onChange={handleChanges}
            />{" "}
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={values.gender === "other"} // ✅ Fix: Added checked attribute
              onChange={handleChanges}
            />{" "}
            Other
          </label>
        </div>

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={values.dob} // ✅ Fix: Added value attribute
          onChange={handleChanges}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email} // ✅ Fix: Added value attribute
          onChange={handleChanges}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="\d{10}"
          value={values.phone} // ✅ Fix: Added value attribute
          onChange={handleChanges}
          required
        />

        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
