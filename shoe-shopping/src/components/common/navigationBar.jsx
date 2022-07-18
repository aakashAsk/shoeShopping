import TextBox from './textBox';
import React, {useState} from 'react';
import './style.css';
import { Link } from "react-router-dom";

export default function NavBar({role="user"}) {
  const [searchItem, searchSearchItem] = useState("");
  const search = () => {
    console.log("Hello");
  };
  return (
    // <React.Fragment>
    <div className="box">
      <div style={{ backgroundColor: "#fff" }}>
        <div className="wrapper">
         {
          role === "user" ? ( <div className="header">
            <div className="logo">
              <img src="images/logo.png" alt="" className="logo" />
            </div>
            <div className="searchBox">
              <TextBox
                icon="zmdi-search"
                type="text"
                name="search"
                placeholder="Search Shoe"
                callbackFunction={search}
                value={searchItem}
              />
            </div>
            <div className="carIcons">
              <i className="zmdi zmdi-shopping-basket"></i>
            </div>
          </div>) : null
         }
        </div>
      </div>
      <div className="navbar">
        <nav>
          {role === "user" ? (
            <ul className="navList">
              <li>
                <Link className="active" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="" to="/">
                  Brands
                </Link>
              </li>
              <li>
                <Link className="" to="/">
                  Shops
                </Link>
              </li>
              <li>
                <Link className="" to="/">
                  Clearance
                </Link>
              </li>
              <li>
                <Link className="" to="/">
                  Cart
                </Link>
              </li>
            </ul>
          ) : null}

          {role === "vender" ? (
            <ul className="navList">
              <li>
                <Link className="active" to="/addProduct">
                  Add Product
                </Link>
              </li>
              <li>
                <Link className="" to="/">
                  Add Inventery
                </Link>
              </li>
            </ul>
          ) : null}
        </nav>
      </div>
    </div>
    // </React.Fragment>
  );
}