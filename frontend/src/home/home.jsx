import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Home() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  async function getData() {
    let apiURL = "http://localhost:4000/view";
    let result = await fetch(apiURL);
    let finalData = await result.json();
    setData(finalData);
  }

  useEffect(() => {
    getData();
  }, []);
  async function handleDelete(sno) {
    try {
      await axios.delete(`http://localhost:4000/delete?sno=${sno}`);
      getData();

    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <>


      <div>
        <div>
          <div>
            <div
              className="p-4 d-flex justify-content-between align-items-center shadow"

              style={{
                background: "#EFD150",
                borderRadius: "8px",

              }}

            >
              <h2 className="mb-5 ">Todo List</h2>
              <Link to="/create">
                <button
                  type="button"
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  style={{
                    border: "1px solid #EFD150",
                    background: "#DFA343",
                    padding: "0.75rem 1.5rem",
                    fontSize: "px",
                    borderRadius: "65px",
                  }}
                >
                  Add Task
                </button>
                <div />
                <br />
                <br />


              </Link>
            </div>
            <div className="mt-4">
              <div
                className="shadow"
                style={{
                  padding: "2rem",
                  background: "#F1ECC2",
                  borderRadius: "8px",
                }}
              >
                {/* Table content */}
              </div>
            </div>
          </div>
          <table
            className="table table-striped table-hover"
            style={{
              fontFamily: "Gill Sans Extrabold",
              fontSize: "20px",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead style={{ backgroundColor: "#f2f2f2", fontWeight: "bold" }}>
              <tr>
                <th scope="col">S No.</th>
                <th scope="col" style={{ width: "250px" }}>
                  Task
                </th>
                <th scope="col">Status</th>
                <th scope="col">Last date</th>
                <th scope="col">Complete Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "2px solid #ddd",
                    padding: "10px 0",
                  }}
                >
                  <td>{item.sno}</td>
                  <td>{item.task}</td>
                  <td>{item.status}</td>
                  <td>{item.due_date}</td>
                  <td>{item.completion_date}</td>
                  <td>
                    <Link to={`/edit/${item.sno}`}>
                      <Button
                        type="button"
                        style={{
                          padding: "5px 10px",
                          fontSize: "16px",
                          marginRight:'20px'

                        }}
                        variant="outlined"
                        color="secondary"
                      >
                        Update
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      onClick={() => {
                        setItem(item)
                        handleClickOpen()
                      }}
                      style={{
                        padding: "5px 10px",
                        fontSize: "16px",
                      }}
                      variant="outlined"
                       color="error"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete?"}
        </DialogTitle>
       
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="success">No</Button>
          <Button onClick={() => {
            handleDelete(item.sno);
            handleClose()
          }} autoFocus variant="contained" color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
