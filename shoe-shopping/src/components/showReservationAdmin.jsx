import React, { useState, useEffect } from "react";
import NavBar from "./common/navigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:4000/";

export default function ShowReservationAdmin() {
  const [tableData, setTableData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if(sessionStorage.getItem("token")){
      getAllReservation();
    }else{
      navigate("/signin");
    }
  }, []);
  function getAllReservation() {
    axios.get(`${BASE_URL}reservation/getAllReservation`).then((result) => {
      setTableData(result.data.result);
    });
  }

  
  return (
    <>
      <NavBar activeTab="showReservationAdmin" role="admin" />
      {tableData.length != 0 ? (
        <div className="tableBox">
          <h1 style={{ textAlign: "center" }}>All Reservation List</h1>
          <table>
            <tr>
              <td>Product Id</td>
              <td>Title</td>
              <td>Brand</td>
              <td>Name</td>
              <td>Email Id</td>
              <td>Number</td>
            </tr>
            {tableData.map((i, j) => {
              if (i.productId && i.userId) {
                return (
                  <tr>
                    <td>{i.productId.ProductId}</td>
                    <td>{i.productId.title}</td>
                    <td>{i.productId.brand}</td>
                    <td>{i.userId.name}</td>
                    <td>{i.userId.email}</td>
                    <td>{i.userId.number}</td>
                  </tr>
                );
              }
            })}
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No reservation available.</p>
      )}
    </>
  );
}
