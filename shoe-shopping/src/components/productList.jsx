import NavBar from "./common/navigationBar";
import Product from "./common/product";
import Footer from "./common/footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:4000";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  function showToaster(data) {
    if (data.status) {
      console.log(data);
      toast(data.message);
    } else {
      console.log(data);
      toast.error(`${data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  useEffect(() => {
    const product =
      window.location.href.split("=").length != 1
        ? window.location.href.split("=").pop()
        : null;
   
    //   axios
    //     .get(`${BASE_URL}/product/getProduct?title=${product}`)
    //     .then((result) => {
    //       console.log(result)
    //       setProductList(result.data.result);
    //     });
    // } else {
      axios
        .get(`${BASE_URL}/product/getAllProductsUser${product ? `?title=${product}` : ''}`)
        .then((result) => {
          setProductList(result.data.result);
        });
    // }
  }, []);
  return (
    <React.Fragment>
      <NavBar activeTab="productList" />
      <ToastContainer />
      <div className="main" style={{ padding: 0 }}>
        <div className="productWrapper" style={{ textAlign: "center" }}>
          <h2>Product List</h2>
          <div className="productList">
            {productList.length != 0 ? (
              productList.map((product) => {
                console.log(product);
                return (
                  <Product
                    data={product}
                    key={product._id}
                    callBack={showToaster}
                  />
                );
              })
            ) : (
              <p>No Product Available</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
