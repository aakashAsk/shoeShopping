import React, { useState, useEffect } from "react";
import NavBar from "./common/navigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:4000/";

export default function ShowReservation() {
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
    axios
      .get(
        `${BASE_URL}reservation/getAllReservationByUserId?retailer=${sessionStorage.getItem(
          "token"
        )}`
      )
      .then((result) => {
        console.log(result);
        setTableData(result.data.result);
      });
  }

  function sell(data) {
    console.log(data._id)
    axios
      .post(
        `${BASE_URL}product/updateQuantity`, { productId: data.productId._id, quantity:data.productId.quantity -1 }
      )
      .then((result) => {
        if(result.data.status){
          deleteReservation(data)
        }
      });

  }

  function deleteReservation(data){
    axios
      .post(
        `${BASE_URL}reservation/deleteReservation`, { id: data._id}
      )
      .then((result) => {
        if(result.data.status){
          getAllReservation();
        }
      });
  }

  function notSell(data) {
    deleteReservation(data)
  }
  return (
    <>
    <NavBar activeTab="showReservation" role="vender"/>
      {tableData.length != 0 ? (<div className="tableBox">
        <h1 style={{textAlign: 'center'}}>All Reservation List</h1>
        {/* <Table data={tableData} columns={[{"title": 'Title'}, {'price': 'Price'}, {'disPrice': 'Discount Price'}, {'brand': 'Brand'}, {'quantity': 'Quantity'}, {operation: 'Operation'}]} /> */}
        <table>
          <tr>
            <td>Product Id</td>
            <td>Title</td>
            <td>Brand</td>
            <td>Name</td>
            <td>Email Id</td>
            <td>Number</td>
            <td>Operation</td>
          </tr>
          {tableData.map((i, j) => {
            if(i.productId && i.userId){
              return (
                  <tr>
                    <td>{i.productId.ProductId}</td>
                    <td>{i.productId.title}</td>
                    <td>{i.productId.brand}</td>
                    <td>{i.userId.name}</td>
                    <td>{i.userId.email}</td>
                    <td>{i.userId.number}</td>
                    <td>
                      <div className="operationBox">
                        <button onClick={() => sell(i)}>Sell</button>
                        <button onClick={() => notSell(i)}>Not sell</button>
                      </div>
                    </td>
                  </tr>
              );
            }
          })}
        </table>
      </div>) : <p style={{textAlign: 'center'}}>No reservation available.</p>}
    </>
  );
}
