import logo from "./logo.svg";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Addproduct from "./Components/Addproduct/Addproduct";
import Showproduct from "./Components/Showproduct/Showproduct";
import SearchProduct from "./Components/SearchProduct/SearchProduct";
import ManualCustomer from "./Components/ManualCustomer/ManualCustomer";
import SearchCustomer from "./Components/SearchCustomer/SearchCustomer";
import ManualOrder from "./Container/ManualOrder/ManualOrder";
import {  Routes, Route } from "react-router-dom";


function App() {


  return (
    // <div>
    //   {/* <Signup/> */}
    //   {/* <Login/> */}
    //   {/* <Addproduct/> */}
    //   {/* <Showproduct/> */}
    //   {/* <SearchProduct/> */}
    //   {/* <ManualCustomer/> */}
    //   {/* <SearchCustomer/> */}
    //   <ManualOrder/>
    // </div>
    <Routes>
      <Route path="/" element={<ManualOrder/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="addproduct" element={<Addproduct/>}/>
      <Route path="showproduct" element={<Showproduct/>}/>
      <Route path="searchProduct" element={<SearchProduct/>}/>
      <Route path="manualCustomer" element={<ManualCustomer/>}/>
      <Route path="searchCustomer" element={<SearchCustomer/>}/>
    </Routes>
  );
}

export default App;
