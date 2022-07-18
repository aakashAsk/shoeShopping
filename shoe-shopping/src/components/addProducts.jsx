import React, { useState, useEffect } from "react";
import "./style.css";
import TextBox from "./common/textBox";
import Dropdown from "./common/dropdown";
import Table from "./common/table";
import Button from "./common/button";
import Footer from "./common/footer";
import NavBar from "./common/navigationBar";
import axios from "axios";
const BASE_URL = "http://localhost:4000/";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    disPrice: "",
    quantity: "",
    mall: "",
    brand:"",
  });

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    axios.get(`${BASE_URL}product/getAllProducts`).then((result) => {
      setTableData(result.data.result);
    });
  }
  function handleChange(e) {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();
    axios
      .post(`${BASE_URL}product/addProduct`, { ...formData })
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
          });
        }
      });
  }
  return (
    <React.Fragment>
      <NavBar role="vender" />
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
                />

                <TextBox
                  type="text"
                  icon="inr"
                  name="disPrice"
                  placeholder="Please enter discount price"
                  value={formData.name}
                  callbackFunction={handleChange}
                />

                <TextBox
                  type="text"
                  icon="inr"
                  name="price"
                  placeholder="Please enter price"
                  value={formData.name}
                  callbackFunction={handleChange}
                />

                <TextBox
                  type="text"
                  icon="cog"
                  name="quantity"
                  placeholder="Please enter quantity"
                  value={formData.name}
                  callbackFunction={handleChange}
                />

                <Dropdown
                  options={[
                    { value: "0", text: "Select Brand" },
                    { value: "brand1", text: "Brand 1" },
                  ]}
                  id="brand"
                  value={formData.name}
                  callbackFunction={handleChange}
                />
                <Dropdown
                  options={[
                    { value: "0", text: "Select Mall" },
                    { value: "mall1", text: "Mall 1" },
                  ]}
                  id="mall"
                  value={formData.name}
                  callbackFunction={handleChange}
                />

                <Button
                  name="addProduct"
                  className="form-submit"
                  value="Add Product"
                />
              </form>
            </div>
          </div>

          {/* 
            <Table heading={["col1", "col2", "col3"]} data={tableData} />
           */}

          {tableData.length > 0 && (
            <div className="tableBox">
              <Table data={tableData} />
            </div>
          )}
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
}
