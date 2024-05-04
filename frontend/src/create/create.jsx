import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    sno: "",
    task: "",
    status: "",
    due_date: "",
    completion_date: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:4000/add", values);
      if (result) {

        navigate('/');

      } else {
        console.log("error");
      }
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <>
  <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
  <div
    className="w-50 bg-transparent rounded-3 p-4"
    style={{
      backgroundColor: "#FAED7F",
      border: "2px solid #EFD150",
      boxShadow: "0 5px 150px rgba(237, 226, 129, 0.9)",
    }}
  >

    <form onSubmit={handleSubmit}>
      <h2 className="text-warning text-center">Todo list</h2>
      <div className="mb-3">
        <label htmlFor="sno" className="form-label text-warning">
          Serial Number
        </label>
        <input
          type="text"
          className="form-control shadow-sm"
          id="sno"
          name="sno"
          value={values.sno}
          onChange={handleChange}
          style={{
            backgroundColor: "rgb(249, 242, 178, 0.3)",
            border: "1px solid #EFD150",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="task" className="form-label text-warning">
          Task
        </label>
        <input
          type="text"
          className="form-control shadow-sm"
          id="task"
          name="task"
          value={values.task}
          onChange={handleChange}
          style={{
            backgroundColor: "rgb(249, 242, 178, 0.3)",
            border: "1px solid #EFD150",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label text-warning">
          Status
        </label>
        <input
          type="text"
          className="form-control shadow-sm"
          id="status"
          name="status"
          value={values.status}
          onChange={handleChange}
          style={{
            backgroundColor: "rgb(249, 242, 178, 0.3)",
            border: "1px solid #EFD150",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="due_date" className="form-label text-warning">
          Due
        </label>
        <input
          type="date"
          className="form-control shadow-sm"
          id="due_date"
          name="due_date"
          value={values.due_date}
          onChange={handleChange}
          style={{
            backgroundColor: "rgb(249, 242, 178, 0.3)",
            border: "1px solid #EFD150",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="completion_date" className="form-label text-warning">
          Completion
        </label>
        <input
          type="date"
          className="form-control shadow-sm"
          id="completion_date"
          name="completion_date"
          value={values.completion_date}
          onChange={handleChange}
          style={{
            backgroundColor: "rgb(249, 242, 178, 0.3)",
            border: "1px solid #EFD150",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-sm btn-info"
          style={{
            backgroundColor: "#F3E66D",
            color: "#fff",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
    </>
  );
}

export default Create;
