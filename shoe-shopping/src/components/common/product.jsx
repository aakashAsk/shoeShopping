import {useState} from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = "http://localhost:4000";

export default function Product({data, showButton=true, callBack}){
  const [productId, setProductIdId] = useState(data._id)

  function reserveShoe(){
    if(sessionStorage.getItem("token")){
      axios.post(`${BASE_URL}/reservation/reserveProduct`, { productId: productId, userId: sessionStorage.getItem("token"), retailer:  data.retailer}).then((result) => {
        // console.log(result.data.result.message)
        // console.log(result.data.result.status)
        console.log(result)
        // if(result.data.status){
          callBack(result.data)
        // }
      });
    }
    else{
      toast.error(`Please Login First`, {
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

  return (
    <div className="productBox">
      <ToastContainer />
      <div className="imageBox">
        <img src={data.image} />
      </div>
      <div className="infoBox">
        <p className="title">{data.title}</p>
        <p style={{fontWeight: 'bold'}}>Only {data.quantity} remaining</p>
        <p style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{data.color} Color and {data.size} Size Available</p>
        <div className="priceBox">
          <p className="disPrice" style={{ textDecoration: "line-through" }}>
            &#8377; {data.price}
          </p>
          <p className="price">
            &#8377; {data.disPrice}
          </p>
        </div>
      </div>
      {
        showButton ? <div className="buttonBox">
        <button onClick={reserveShoe} className="reserveButton">reserve</button>
      </div> : null
      }
    </div>
  );
}