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


function App() {


  return (
    <div>
      {/* <Signup/> */}
      {/* <Login/> */}
      {/* <Addproduct/> */}
      {/* <Showproduct/> */}
      {/* <SearchProduct/> */}
      {/* <ManualCustomer/> */}
      {/* <SearchCustomer/> */}
      <ManualOrder/>
    </div>
  );
}

export default App;
