import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Edit() {
  const [showAlert, setShowAlert] = useState(false)
  const { sno } = useParams();
  const [values, setValues] = useState({
    sno:"",
    status: "",
    completion_date: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/view?sno=${sno}`)
      .then((res) => {
        setValues((prevValues) => ({
          ...prevValues,
          status: res.data.status,
          completion_date: res.data.completion_date,
        }));
      })
      .catch((err) => console.log(err));
  }, [sno]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:4000/update?sno=${sno}`, values)
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-yellow-1000 justify-content-center align-items-center">
    <div className="w-50  bg-yellow rounded-lg p-4 shadow">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Todo List Update</h2>
        <div className="mb-4">
          <select className="form-select" aria-label="Select status" id="status" name="status" value={values.status} onChange={(e) => setValues({ ...values, status: e.target.value })}>
            <option value="select">Select Status</option>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="completion_date" className="form-label">Completion Date</label>
          <input type="date" className="form-control" id="completion_date" name="completion_date" value={values.completion_date} onChange={(e) => setValues({ ...values, completion_date: e.target.value })} />
        </div>
        <div className="d-grid">
        <button type="submit" className="btn btn-lg btn-success" >
Update Task
</button>
{showAlert === true ? <Alert severity="success" style={{marginTop:'10px'}} >
        <AlertTitle>Success</AlertTitle>
        This is a success Alert with an encouraging title.
      </Alert> : null}

        </div>
      </form>
    </div>
  </div>
  );
}

export default Edit;
