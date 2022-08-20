import React from 'react'
import "../ManualOrder/ManualOrder.css"
import SearchProduct from "../../Components/SearchProduct/SearchProduct"
import SearchCustomer from "../../Components/SearchCustomer/SearchCustomer"
import ManualCustomer from "../../Components/ManualCustomer/ManualCustomer"

const ManualOrder = () => {
  return (
    <div>
        <div className='order-manual-container'>
            <div>
                <SearchProduct/>
            </div>
            <div>
                <SearchCustomer/>
            </div>
            <div>
            <ManualCustomer/>
            </div>
        </div>
    </div>
  )
}

export default ManualOrder