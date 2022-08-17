import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import NavBar from "./common/navigationBar";
import Button from "./common/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:4000/";


export default function VenderProductLists() {
  const [tableData, setTableData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [productId, setProductId] = useState(false);
  let quantityRef = useRef(); 
  useEffect(() => {
    getAllProducts();
  }, [])

  function getAllProducts() {
    axios.get(`${BASE_URL}product/getAllProducts?userid=${sessionStorage.getItem('token')}`).then((result) => {
      setTableData(result.data.result);
    });
  }

  

  function editProduct(data) {
    setQuantity(data.quantity);
    setProductId(data._id);
    setShowPopup(true);
  }
  function updateQuantity(e) {
    e.preventDefault();
    // let count = 0;
    // setFormError((error) => {
    //   const modifiedValue = validate(formData);
    //   if (Object.keys(modifiedValue).length === 0 && count === 0) {
    //     count++;
    axios
      .post(`${BASE_URL}product/updateQuantity`, { productId, quantity })
      .then((result) => {
        if (result.data.status) {
          getAllProducts();
          closePopup();
          toast(result.data.message);
        } else {
          toast.error(`${result.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    //   }
    // });
  }

  function closePopup() {
    setShowPopup(false);
  }

  function deleteProduct(id) {
    axios.get(`${BASE_URL}product/deleteProduct?id=${id}`).then((result) => {
      if (result.data.status) {
        getAllProducts();
      }
    });
  }
  return (
    <>
      <NavBar role="vender" activeTab="venderProductList" />

      {tableData.length > 0 && (
        <div className="tableBox">
          <h2 style={{ textAlign: "center", margin: '15px 0' }}>Products Lists</h2>
          {/* <Table data={tableData} columns={[{"title": 'Title'}, {'price': 'Price'}, {'disPrice': 'Discount Price'}, {'brand': 'Brand'}, {'quantity': 'Quantity'}, {operation: 'Operation'}]} /> */}
          <table>
            <tr>
              <td>ProductId</td>
              <td>ProductId</td>
              <td>Title</td>
              <td>Price</td>
              <td>Discount Price</td>
              <td>Brand</td>
              <td>Quantity</td>
              <td>Operation</td>
            </tr>
            {tableData.map((i, j) => {
              console.log(i);
              return (
                <tr key={j}>
                  <td>{i.ProductId}</td>
                  <td>
                    <img src={i.image} style={{ width: "100px" }} />
                  </td>
                  <td>{i.title}</td>
                  <td>{i.price}</td>
                  <td>{i.disPrice}</td>
                  <td>{i.brand}</td>
                  <td>{i.quantity}</td>
                  <td>
                    <div className="operationBox">
                      <button onClick={() => editProduct(i)}>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      <button onClick={() => deleteProduct(i._id)}>
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      )}

      {showPopup ? (
        <div className="popupWrapper">
          <div className="popup">
            <div className="formWrapper">
              <span className="closeIcon" onClick={() => closePopup()}>
                &#xD7;
              </span>
              <h1>Update Quantity</h1>
              <form
                noValidate
                onSubmit={updateQuantity}
                className="register-form"
                id="register-form"
              >
                {/* <TextBox
                  type="nummber"
                  icon="tag"
                  
                  name="quantity"
                  placeholder="Please enter quantity"
                  value={quantity}
                  callbackFunction={handleChange}
                /> */}
                <div className="wrapper" style={{ marginBottom: "25px" }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label htmlFor="quantity">
                      {/* <i className={`zmdi material-icons-name ${icon}`}></i> */}
                      {/* <i class={`fa fa-${icon}`} aria-hidden="true"></i> */}
                    </label>
                    <input
                      type="number"
                      ref={quantityRef}
                      name="quantity"
                      value={quantity}
                      id="quantity"
                      placeholder="Please enter quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  {/* <span className="error">{error}</span> */}
                </div>
                <Button
                  name="quantityUpdate"
                  className="form-submit"
                  value="Update Quantity"
                />
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
