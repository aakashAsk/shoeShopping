import Signin from "./components/signin";
import Signup from "./components/signup";
import React from 'react'
import Home from './components/home';
import AddProduct from './components/addProducts';
import NavBar from './components/common/navigationBar'
import Brand from './components/brand';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        {/* <NavBar /> */}
        <React.Fragment>
          <Route path="/" element={<Home />} />
          {/* <Route path="/brand" element={<Brand />} /> */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </React.Fragment>
      </Routes>
    </Router>
  );
}

export default App;
