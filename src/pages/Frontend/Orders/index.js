import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Orders() {
  const [currentOrder, setCurrentOrder] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder")) || [];
    setCurrentOrder(storedOrder);
  }, []);

  const removeItem = (i) => {
    const updatedOrder = [...currentOrder]
    updatedOrder.splice(i, 1)
    setCurrentOrder(updatedOrder)
    localStorage.setItem("currentOrder", JSON.stringify(updatedOrder))

  }
  const totalPrice = currentOrder.reduce((c, item) => c + Number(item.price), 0).toFixed(2);

  const handelConfirm = () => {
    toast.success("Order Placed Successfully", { position: "bottom-left" })
    localStorage.removeItem("currentOrder")
    navigate("/")
  }

  const generateTableRows = () => {
    return currentOrder.map((item, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{item.name}</td>
        <td>{item.category}</td>
        <td>{item.price}</td>
        <td>
          <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(i)}>Remove</button>
        </td>
      </tr>
    ));
  };

  return (
    <main>
      <div className="container table-responsive my-2">
        <table className="table table-striped-columns border border-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {generateTableRows()}
            <tr>
              <td colSpan="3" className="text-center"><strong>Total Price</strong></td>
              <td><strong>Rs. {totalPrice}</strong></td>
              <td>
                <button className='btn btn-success btn-sm' onClick={handelConfirm}>Confirm Order</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
