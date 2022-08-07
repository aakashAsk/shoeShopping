import { useState, useEffect } from "react";
import "./style.css";
import TextBox from "./common/textBox";
import Button from "./common/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:4000/";

export default function Signup() {
  const [role, setRole] = useState(window.location.href.split('=').length != 1 ? window.location.href.split('=').pop() : 'user');
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    name:"",number:"",
    email: "",
    password: "",
    role: "",
    adminApprove: false,
  });
  useEffect(() => {
    sessionStorage.clear();
      setFormData({ ...formData, role: role });
      console.log(formData);
  }, [])
  function handleChange(e) {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function validate(values) {
    console.log(values);
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const errors = {};
    if (!values.number) {
      errors.number = "Please enter number";
    } else if (values.number.length !== 10) {
      errors.number = "Please enter valid number";
    }

    if (!values.password) {
      errors.password = "Please enter password";
    }

    if (!values.name) {
      errors.name = "Please enter name";
    }

    if (!values.email) {
      errors.email = "Please enter email";
    }
    else if (!regex.test(values.email)){errors.email = "Please enter valid email";}



    return errors;
  }

  async function submitForm(e) {
    e.preventDefault();
    let count = 0;
   setFormError((error) => {
    const modifiedValue = validate(formData);
    console.log(modifiedValue);
      if (Object.keys(modifiedValue).length === 0 && count === 0) {
        count++;
        axios.post(`${BASE_URL}signup`, { ...formData }).then((result) => {
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
            sessionStorage.setItem("isUserLogged", true);
            sessionStorage.setItem("token", result.data.token);
            if(role === 'user')
              window.location.href = "/";
            else if(role==='retailer')  
              window.location.href = "/addProduct";
            else if(role === 'admin')
              window.location.href = "/"; 
          }
        });
      }

      return modifiedValue;
   })
      
  }

  return (
    <section className="signup">
      <ToastContainer />
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form
              noValidate
              onSubmit={submitForm}
              className="register-form"
              id="register-form"
            >
              <TextBox
                type="name"
                icon="user"
                name="name"
                placeholder="Please enter name"
                value={formData.name}
                error={formError.name}
                callbackFunction={handleChange}
              />
              <TextBox
                type="email"
                icon="envelope"
                name="email"
                placeholder="Please enter email"
                value={formData.email}
                error={formError.email}
                callbackFunction={handleChange}
              />
              <TextBox
                type="number"
                icon="phone"
                name="number"
                placeholder="Please enter number"
                value={formData.number}
                callbackFunction={handleChange}
                error={formError.number}
              />
              <TextBox
                type="password"
                icon="lock"
                name="password"
                value={formData.password}
                error={formError.password}
                placeholder="Please enter password"
                callbackFunction={handleChange}
              />

              <Button name="signup" className="form-submit" value="Sign Up" />
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img src="images/signup-image.jpg" alt="sing up image" />
            </figure>
            <Link
              className="signup-image-link"
              to="/signin"
              style={{ margin: "auto" }}
            >
              I am already member
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
