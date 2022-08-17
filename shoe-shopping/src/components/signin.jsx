import {useState, useEffect} from 'react'
import './style.css';
import TextBox from './common/textBox';
import Button from "./common/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:4000/";

export default function Signin(){
  const [formData, setFormData] = useState({
    number: "",
    password: ""
  });
  const [formError, setFormError] = useState({});

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  function validate(values){
    console.log(values);
    const errors = {};
    if(!values.number){
      errors.number = "Please enter number"
    }
    else if(values.number.length !== 10){
      errors.number = "Please enter valid number";
    }
    if(!values.password){
      errors.password = "Please enter password";
    }

    return errors;
  }

  function handleChange (e){
    console.log(e.target.value)
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  async function submitForm(e){
    let count = 0;
    e.preventDefault();
    setFormError((error) => {
      const modifiedValue = validate(formData);
      if (Object.keys(modifiedValue).length === 0 && count === 0) {
        count++;
        axios.post(`${BASE_URL}signin`, { ...formData }).then((result) => {
          if (!result.data.status) {
            toast.error(`${result.data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            let role = result.data.user.role;
            sessionStorage.setItem("isUserLogged", true);
            sessionStorage.setItem("token", result.data.token);
            sessionStorage.setItem("userName", result.data.user.name);
            if (role === "user") window.location.href = "/";
            else if (role === "retailer") window.location.href = "/venderProductList";
            else if (role === "admin") window.location.href = "/usersList";
          }
        });
      }
      return modifiedValue;
    });
  }

  return (
    <section className="sign-in displayFlex">
      <ToastContainer />
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
                type="number"
                icon="user"
                name="number"
                placeholder="Please enter number"
                value={formData.number}
                callbackFunction={handleChange}
                error={formError.number}
              />
              {/* <span className="error">{formError.number}</span> */}

              <TextBox
                type="password"
                icon="lock"
                name="password"
                value={formData.password}
                placeholder="Please enter password"
                callbackFunction={handleChange}
                error={formError.password}
              />
              {/* <span className="error">{formError.password}</span> */}

              <Button
                name="signin"
                className="form-submit"
                value="Sign In"
              />
            </form>
            ;
          </div>
        </div>
      </div>
    </section>
  );
}