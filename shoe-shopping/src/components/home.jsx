import NavBar from "./common/navigationBar";
import Product from "./common/product";
import Footer from "./common/footer";
import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = "http://localhost:4000";

export default function Home(){
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    
    axios.get(`${BASE_URL}/product/getAllProductsUser`).then((result) => {
      setProductList(result.data.result);
    });
  }, []);

  function showToaster(data){
    if(data.status){
      console.log(data)
      toast(data.message)
    }
    else{
      console.log(data)
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
  return (
    <React.Fragment>
      <NavBar activeTab="home"/>
      <ToastContainer />
      <div className="main" style={{ padding: 0 }}>
        <div className="mainPage">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            Autoplay={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <img src="/images/slider/slider1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/slider/slider2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/slider/slider3.jpg" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="productWrapper" style={{ textAlign: "center" }}>
          <h2>Top Products</h2>
          <div className="productList">
            {productList.map((product) => {
              return <Product data={product} key={product._id} callBack={showToaster}/>;
            })}
          </div>
        </div>

        <div className="topBrandSection" style={{textAlign: 'center', paddingTop: '30px'}}>
          <h2>Top Brands</h2>
          <Swiper
            spaceBetween={50}
            slidesPerView={5}
            Autoplay={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <img src="/images/brands/brand1.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brands/brand2.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brands/brand3.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brands/brand4.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brands/brand5.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brands/brand6.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brands/brand7.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brands/brand8.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brands/brand9.png" />
            </SwiperSlide>
          </Swiper>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
}