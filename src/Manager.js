import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { Container, Typography } from "@mui/material";

const Manager = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("orders").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Container>
        <Typography variant="h5">Manager components</Typography>
        <h2>Orders (need to look at it)</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.name} - {order.order} -{" "}
              {order.timestamp.toDate().toLocaleString()}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default Manager;
