import Signin from "./components/signin";
import Signup from "./components/signup";
import React from 'react'
import Home from './components/home';
import AddProduct from './components/addProducts';
import Reservation from './components/shoeReservation';
import ProductList from './components/productList';
import ShowReservation from './components/showReservation';
import UsersList from './components/usersList';
import RetailersList from './components/retailersList';
import ShowReservationAdmin from './components/showReservationAdmin';
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
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/showReservation" element={<ShowReservation />} />
          <Route path="/usersList" element={<UsersList />} />
          <Route path="/retailersList" element={<RetailersList />} />
          <Route path="/showReservationAdmin" element={<ShowReservationAdmin />} />
        </React.Fragment>
      </Routes>
    </Router>
  );
}

export default App;
