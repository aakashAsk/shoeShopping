import React, { useState, useEffect } from "react";
import NavBar from "./common/navigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:4000/";

export default function UsersList() {
  const [tableData, setTableData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getAllUsers();
    } else {
      navigate("/signin");
    }
  }, []);

  function getAllUsers() {
    axios
      .get(
        `${BASE_URL}getAllUsersAdmin?role=user`
      )
      .then((result) => {
        console.log(result);
        setTableData(result.data.data);
      });
  }

  return (
    <>
      <NavBar activeTab="usersList" role="admin" />
      {tableData.length != 0 ? (
        <div className="tableBox">
          <h1 style={{ textAlign: "center" }}>All Users List</h1>
          <table>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Email</td>
              <td>Number</td>
            </tr>
            {tableData.map((i, j) => {
                return (
                  <tr>
                    <td>{++j}</td>
                    <td>{i.name}</td>
                    <td>{i.email}</td>
                    <td>{i.number}</td>
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
