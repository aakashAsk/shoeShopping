import {useState} from 'react'
import './style.css';
import TextBox from './common/textBox';
import Button from "./common/button";
import { Link } from "react-router-dom";
import * as yup from "yup";
import {Formik, Form} from 'formik';
import axios from "axios";
const BASE_URL = "http://localhost:4000/";

export default function Signin(){
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  function handleChange (e){
    console.log(e.target.value)
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  function submitForm(e){
    e.preventDefault();
    axios.post(`${BASE_URL}signin`, { ...formData }).then((result) => {
      
      if (!result.data.status) {
        // setisShowToaster(true);
        // setErrorMessage(result.data.message);
      } else {
        sessionStorage.setItem("isUserLogged", true);
        sessionStorage.setItem("token", result.data.token);
        window.location.href = "/addProduct";
      }
    });
    
  }

  return (
    <section className="sign-in displayFlex">
      <div className="container">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src="/images/signin-image.jpg" alt="sing up image" />
            </figure>
            <Link
              className="signup-image-link"
              to="/signup"
              style={{ margin: "auto" }}
            >
              Create an account
            </Link>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Sign In</h2>
            <form
              noValidate
              onSubmit={submitForm}
              className="register-form"
              id="register-form"
            >
              <TextBox
                type="email"
                icon="user"
                name="email"
                placeholder="Please enter email"
                value={formData.email}
                callbackFunction={handleChange}
              />
              <TextBox
                type="password"
                icon="lock"
                name="password"
                value={formData.password}
                placeholder="Please enter password"
                callbackFunction={handleChange}
              />

              <Button name="signin" className="form-submit" value="Sign In" />
            </form>
            ;
          </div>
        </div>
      </div>
    </section>
  );
}