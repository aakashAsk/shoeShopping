import { useState } from "react";
import "./style.css";
import TextBox from "./common/textBox";
import Button from "./common/button";
import { Link } from "react-router-dom";
import axios from "axios";
const BASE_URL = "http://localhost:4000/";

export default function Signup() {
  const [formData, setFormData] = useState({
    name:"",number:"",
    email: "",
    password: "",
  });
  function handleChange(e) {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
  }

  async function submitForm(e) {
    e.preventDefault();
   
    axios.post(`${BASE_URL}/signup`, { ...formData }).then((result) => {
      console.log(result.data);
      console.log(result.data.status);
      if (!result.data.status) {
        // setisShowToaster(true);
        // setErrorMessage(result.data.message);
      } else {
        sessionStorage.setItem("isUserLogged", true);
        sessionStorage.setItem("token", result.data.token);
        window.location.href = "/";
      }
    });
      
  }

  return (
    <section className="signup">
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
                icon="zmdi-account"
                name="name"
                placeholder="Please enter name"
                value={formData.name}
                callbackFunction={handleChange}
              />
              <TextBox
                type="email"
                icon="zmdi-email"
                name="email"
                placeholder="Please enter email"
                value={formData.email}
                callbackFunction={handleChange}
              />
              <TextBox
                type="number"
                icon="zmdi-dock"
                name="number"
                placeholder="Please enter number"
                value={formData.number}
                callbackFunction={handleChange}
              />
              <TextBox
                type="password"
                icon="zmdi-lock"
                name="password"
                value={formData.password}
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
              to="/"
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
