import NavBar from "./common/navigationBar";
import Product from "./common/product";
import Footer from "./common/footer";
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Home(){
  const productList = [1,2,3,4,5];
  return (
    <React.Fragment>
      <NavBar />
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
              return <Product />;
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