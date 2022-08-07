import React, { useState, useEffect } from "react";
import NavBar from "./common/navigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:4000/";

export default function RetailersList() {
  const [tableData, setTableData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getAllRetailers();
    } else {
      navigate("/signin");
    }
  }, []);

  function getAllRetailers() {
    axios.get(`${BASE_URL}getAllUsersAdmin?role=retailer`).then((result) => {
      console.log(result);
      setTableData(result.data.data);
    });
  }

  function approve(id){
    axios
      .post(`${BASE_URL}approveOrRejectRetailer`, { id: id, status: true })
      .then((result) => {
        console.log(result)
        if (!result.data.status) {
          toast.error(`${result.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast(`${result.data.message}`);
          getAllRetailers();
        }
      });
  }

  function reject(id){
axios
  .post(`${BASE_URL}approveOrRejectRetailer`, { id: id, status: false })
  .then((result) => {
    console.log(result);
    if (!result.data.status) {
      toast.error(`${result.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(`${result.data.message}`);
      getAllRetailers();
    }
  });
  }

  return (
    <>
      <ToastContainer />
      <NavBar activeTab="retailersList" role="admin" />
      {tableData.length != 0 ? (
        <div className="tableBox">
          <h1 style={{ textAlign: "center" }}>All Users List</h1>
          <table>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Email</td>
              <td>Number</td>
              <td>Status</td>
              <td>Operation</td>
            </tr>
            {tableData.map((i, j) => {
              console.log(i.adminApprove);
              return (
                <tr>
                  <td>{++j}</td>
                  <td>{i.name}</td>
                  <td>{i.email}</td>
                  <td>{i.number}</td>
                  <td>{i.adminApprove ? "Approve" : "Rejected"}</td>
                  <td>
                    <div className="btnBox">
                      <button
                        onClick={() => {
                          approve(i._id);
                        }}
                        className="btn btn-approve"
                      >
                        Approve
                      </button>
                      <button onClick={() => {reject(i._id)}} className="btn btn-reject">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No User Available.</p>
      )}
    </>
  );
}
