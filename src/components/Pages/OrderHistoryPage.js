import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// utils
import { getOrderDate } from "../../utils";

const OrderHistoryPage = () => {
   document.title = "My orders | SafeKart";
  const { authUser } = useSelector((state) => state.users);
  const [orders, setOrders] = useState(null);

  const getOrders = useCallback(async () => {
    const token = authUser && authUser.token;
    try {
      const response = await axios.get("/orders/order_history/", {
        headers: { Authorization: `token ${token}` },
      });
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      const err = { ...error };
      console.log(err.response);
    }
  }, [authUser]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <section className={`section `}>
      <div className="section__wrapper">
        <h4>order history</h4>
        <div>
          {orders ? (
            <table className="order__list">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order number</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                    
                  return (
                    <tr key={order.id}>
                      <td style={{ padding: "1rem" }}>{orders.indexOf(order) + 1}</td>
                      <td style={{ padding: "1rem" }}>
                        <Link to={`/order_history/${order.order_number}`}>
                          {order.order_number}
                        </Link>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {getOrderDate(order.created)}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        $<span>{order.grand_total}</span>
                      </td>
                      <td>{order.is_ordered && "Ordered"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>You have no orders yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistoryPage;
