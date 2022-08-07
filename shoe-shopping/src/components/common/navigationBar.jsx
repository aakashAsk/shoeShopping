

import TextBox from './textBox';
import React, {useState, useEffect} from 'react';
import './style.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = "http://localhost:4000/";

export default function NavBar({role="user", activeTab}) {
  const [searchItem, searchSearchItem] = useState("");
  const [userLoggIn, setUserLoggIn] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [showList, setShowList] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    setUserLoggIn(sessionStorage.getItem("isUserLogged"));
    console.log(searchList.length);
    if(searchList.length != 0 ){
      setShowList(true)
    }
    else{
      setShowList(false);
    }
  }, [searchList]);

  function navigateToProductList(title){
    console.log(title);
    window.location.href = `/productList?product=${title}`;
  }

  const search = (e) => {
    searchSearchItem(e.target.value);
    if(e.target.value){
      axios.post(`${BASE_URL}product/searchProduct?search=${e.target.value}`).then((result) => {
        console.log(searchList);
        setSearchList(result.data.result);
      });
    }
    else{
       setShowList(false);
    }
  };
  function registerAsRetailer(){
    navigate('/signup?role=retailer')
  }
  return (
    // <React.Fragment>
    <div className="box">
      <div style={{ backgroundColor: "#fff" }}>
        <div className="wrapper" style={{ position: "relative" }}>
          {role === "user" ? (
            <div className="header">
              <div className="logo">
                <img src="images/logo.png" alt="" className="logo" />
              </div>
              <div className="searchBox">
                <TextBox
                  icon="search"
                  type="text"
                  name="search"
                  placeholder="Search Shoe"
                  callbackFunction={search}
                  value={searchItem}
                />

                {showList ? (
                  <div className="searchResult">
                    {searchList.map((result, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => navigateToProductList(result.title)}
                          className="resultSearch"
                        >
                          {result.title}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {/* <div className="carIcons">
              {
                userLoggIn ? <h1>Welcome Back</h1> : <Link to="/signup" style={{fontSize: '26px',
                  color: '#000'}}>
                  <i className="fa fa-user"></i>
                </Link>
              }
            </div> */}
              <div className="reatilerButton">
                <button onClick={registerAsRetailer}>
                  Register as retailer
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="navbar">
        <nav>
          {role === "user" ? (
            <ul className="navList">
              <li>
                <Link className={activeTab === "home" ? "active" : ""} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={activeTab === "productList" ? "active" : ""}
                  to="/productList"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className={activeTab === "shoeReservation" ? "active" : ""}
                  to="/reservation"
                >
                  My Reservation
                </Link>
              </li>
              <li>
                <Link to="/signin">
                  {sessionStorage.getItem("token") ? "Logout" : "Signin"}
                </Link>
              </li>
            </ul>
          ) : null}

          {role === "vender" ? (
            <ul className="navList">
              <li>
                <Link
                  className={activeTab === "addProduct" ? "active" : ""}
                  to="/addProduct"
                >
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  className={activeTab === "showReservation" ? "active" : ""}
                  to="/showReservation"
                >
                  Reservation
                </Link>
              </li>
              <li>
                <Link to="/signin">
                  {sessionStorage.getItem("token") ? "Logout" : "Signin"}
                </Link>
              </li>
            </ul>
          ) : null}

          {role === "admin" ? (
            <ul className="navList">
              <li>
                <Link
                  className={activeTab === "usersList" ? "active" : ""}
                  to="/usersList"
                >
                  Users List
                </Link>
              </li>
              <li>
                <Link
                  className={activeTab === "retailersList" ? "active" : ""}
                  to="/retailersList"
                >
                  Retailers List
                </Link>
              </li>
              <li>
                <Link
                  className={
                    activeTab === "showReservationAdmin" ? "active" : ""
                  }
                  to="/showReservationAdmin"
                >
                  Reservation List
                </Link>
              </li>
              <li>
                <Link to="/signin">
                  {sessionStorage.getItem("token") ? "Logout" : "Signin"}
                </Link>
              </li>
            </ul>
          ) : null}

          {sessionStorage.getItem("token") ? <div className="userIcon">
            <a title={sessionStorage.getItem("userName")} className="" href="javascript:void(0)">
              <img src="/images/useriIcon.png"  style={{height:'25px', width:'25px'}}/>
            </a>
          </div> : null}
        </nav>
      </div>
    </div>
    // </React.Fragment>
  );
}