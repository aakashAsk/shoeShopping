import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import TextBox from "./common/textBox";
import Dropdown from "./common/dropdown";
import Table from "./common/table";
import Button from "./common/button";
import Footer from "./common/footer";
import NavBar from "./common/navigationBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:4000/";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    disPrice: "",
    quantity: "",
    mall: "",
    brand: "",
    retailer: "",
    image: "",
    color:"",
    size:"",
    location:""
  });

  let quantityRef = useRef();

  const [quantity, setQuantity] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [productId, setProductId] = useState(false);
  const [retailerList, setRetailerList] = useState([]);
  const [formError, setFormError] = useState({});
  let [productImg, setProductImg] = useState();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // if (sessionStorage.getItem("token")) {
      getAllProducts();
      getAllRetailers();
      setFormData({ ...formData, retailer: sessionStorage.getItem("token") });
      console.log(retailerList);
    // }
    // else{
    //   window.location.href = '/signin'
    // }
  }, []);

  function getAllRetailers(){
    axios.get(`${BASE_URL}getAllUsersAdmin?role=retailer`).then((result) => {
      setRetailerList(result.data.data);
    });
  }
  function getAllProducts() {
    axios
      .get(
        `${BASE_URL}product/getAllProductsUser`
      )
      .then((result) => {
        setTableData(result.data.result);
      });
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function onFileChange(e) {
    const formData = new FormData();
    console.log(e.target.files);
    formData.append("file", e.target.files[0]);
    const res = await axios.post(`${BASE_URL}uploadImage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data.filePath);
    setProductImg(`${BASE_URL}${res.data.filePath}`);
  }

  function editProduct(data) {
    setQuantity(data.quantity);
    setProductId(data._id);
    setShowPopup(true);
  }

  function submitForm(e) {
    e.preventDefault();
    let count = 0;
    setFormError((error) => {
      const modifiedValue = validate(formData);
     
      if (Object.keys(modifiedValue).length === 0 && count === 0) {
        count++;
        axios
          .post(`${BASE_URL}product/addProduct`, {
            ...formData,
            image: productImg,
          })
          .then((result) => {
            if (!result.data.status) {
            } else {
              // sessionStorage.setItem("isUserLogged", true);
              // sessionStorage.setItem("token", result.data.token);
              // window.location.href = "/";
              getAllProducts();
              setFormData({
                title: "",
                price: "",
                disPrice: "",
                quantity: "",
                mall: "",
                brand: "",
                retailer: "",
                image: "",
                color: "",
                size: "",
              });
            }
          });
      }
      return modifiedValue;
    });
  }

  function changeValue(e){
    setFormData({ ...formData, retailer: e.target.value });
  }

  function validate(values) {
    console.log(values);
    const errors = {};
    // title: "",
    // price: "",
    // disPrice: "",
    // quantity: "",
    // mall: "",
    // brand: "",
    // retailer: "",
    // image: "",
    if (!values.title) {
      errors.title = "Please enter title";
    } 


    if (!values.price) {
      errors.price = "Please enter price";
    }
    else if(values.price < 0){
      errors.price = "Please enter valid price";
    }

    if (!values.size) {
      errors.size = "Please enter size";
    } else if (values.size < 0) {
      errors.size = "Please enter valid size";
    }

    if (!values.disPrice) {
      errors.disPrice = "Please enter price";
    } else if (values.disPrice < 0) {
      errors.disPrice = "Please enter valid price";
    }

    if (!values.quantity) {
      errors.quantity = "Please enter quantity";
    } else if (values.quantity < 0) {
      errors.quantity = "Please enter valid quantity";
    }

    if (!values.brand) {
      errors.brand = "Please enter brand";
    } 

      // if (!values.image) {
      //   errors.image = "Please upload image";
      // } 

    if (!values.color) {
      errors.color = "Please enter color";
    } 

    if (!values.sku) {
      errors.sku = "Please enter sku";
    } 


    if (!values.location) {
      errors.location = "Please enter map url";
    } 
    else if (
      values.location.split("/")[2] != "g.page" ||
      values.location.split("/").pop().split("?").pop() != "share"
    ){
      errors.location = "Please enter valid map url";
    }
      return errors;
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
    <React.Fragment>
      <NavBar role="admin" activeTab="addProduct" />
      <ToastContainer />
      <div className="main" style={{ padding: 0 }}>
        <div className="mainPage">
          <div className="card">
            <h2>Add Products</h2>
            <div className="formContent">
              <form
                noValidate
                onSubmit={submitForm}
                className="register-form"
                id="register-form"
              >
                <TextBox
                  type="text"
                  icon="tag"
                  name="title"
                  placeholder="Please enter title"
                  value={formData.name}
                  callbackFunction={handleChange}
                  error={formError.title}
                />

                <TextBox
                  type="number"
                  icon="usd"
                  name="disPrice"
                  placeholder="Please enter discount price"
                  value={formData.disPrice}
                  callbackFunction={handleChange}
                  error={formError.disPrice}
                />

                <TextBox
                  type="number"
                  icon="usd"
                  name="price"
                  placeholder="Please enter price"
                  value={formData.price}
                  error={formError.price}
                  callbackFunction={handleChange}
                />

                <TextBox
                  type="text"
                  icon="tag"
                  name="color"
                  placeholder="Please enter color"
                  value={formData.color}
                  error={formError.color}
                  callbackFunction={handleChange}
                />

                <TextBox
                  type="number"
                  icon="tag"
                  name="size"
                  placeholder="Please enter size"
                  value={formData.size}
                  error={formError.size}
                  callbackFunction={handleChange}
                />

                <TextBox
                  type="number"
                  icon="cog"
                  name="quantity"
                  placeholder="Please enter quantity"
                  value={formData.quantity}
                  error={formError.quantity}
                  callbackFunction={handleChange}
                />

                <TextBox
                  type="text"
                  icon="cog"
                  name="brand"
                  placeholder="Please enter brand"
                  value={formData.brand}
                  error={formError.brand}
                  callbackFunction={handleChange}
                />

                <TextBox
                  type="text"
                  icon="cog"
                  name="sku"
                  placeholder="Please enter sku"
                  value={formData.sku}
                  error={formError.sku}
                  callbackFunction={handleChange}
                />

                <select
                  name="retailer"
                  id="retailer"
                  style={{
                    width: "80%",
                    padding: "10px",
                    marginBottom: "15px",
                  }}
                  onChange={changeValue}
                >
                  {retailerList.length > 0 &&
                    retailerList.map((i, j) => {
                      return <option value={i._id}>{i.name}</option>;
                    })}
                </select>

                <TextBox
                  type="text"
                  icon="map-marker"
                  name="location"
                  placeholder="Please enter map url"
                  value={formData.location}
                  error={formError.location}
                  callbackFunction={handleChange}
                />

                <div className="wrapper" style={{ marginBottom: "25px" }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <input type="file" multiple onChange={onFileChange} />
                  </div>
                </div>

                <Button
                  name="addProduct"
                  className="form-submit"
                  value="Add Product"
                />
              </form>
            </div>
          </div>

          {tableData.length > 0 && (
            <div className="tableBox">
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
        </div>

        <Footer />
      </div>

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
    </React.Fragment>
  );
}
