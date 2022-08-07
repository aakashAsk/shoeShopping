import NavBar from "./common/navigationBar";
import Product from "./common/product";
import Footer from "./common/footer";
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = "http://localhost:4000";

export default function Reservation(){
    const [productList, setProductList] = useState([]);
    let navigate = useNavigate();
  useEffect(() => {
    
    if(sessionStorage.getItem("token")){
        axios.get(`${BASE_URL}/reservation/getAllReservationByUser?userId=${sessionStorage.getItem("token")}`).then((result) => {
          setProductList(result.data.result);
        });
    }else{
        navigate("/signin");
    }
  }, [])
    return (
        <React.Fragment>
      <NavBar activeTab="shoeReservation"/>
      <div className="main" style={{ padding: 0 }}>
       

        <div className="productWrapper" style={{ textAlign: "center" }}>
          <h2>{productList.length != 0 ? 'Your Reservation' : null}</h2>
          <div className="productList">
            {productList.length != 0 ? productList.map((product) => {
                console.log(product)
              return <Product showButton={false} data={product.productId} key={product._id}/>;
            }) : <div className="noProduct">No reservation</div>}
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
    )
}