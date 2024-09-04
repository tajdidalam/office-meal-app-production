import React, { useState } from "react";
import { db } from "./firebase";

const Employee = ({ employeeId, name }) => {
  const [order, setOrder] = useState("");

  const placeOrder = () => {
    db.collection("orders").add({
      employeeId,
      name,
      order,
      timestamp: new Date(),
    });
    setOrder("");
  };

  return (
    <div>
      <h2>{name}</h2>
      <input
        type="text"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        placeholder="Enter your order"
      />
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Employee;
