import React, { useState, useContext, useEffect } from "react";

import { SalesContext } from "../../context/sales-context";
// utils
import { getOrderDateTime } from "../../utils";
// style
import styles from './Orders.module.css'

const Orders = ({ navHeight }) => {
  const { orders, refresh, getOrders, sendOrderUpdate } = useContext(SalesContext);

  const getUpdate = (orderUpdate) => {
    sendOrderUpdate(orderUpdate);
  };


  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, [refresh]);

  return (
    <div className={`${styles.orders} orders`}>
      <h2>Recent orders</h2>
      <table>
        <thead style={{top: navHeight}}>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Address</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.order.order_number}</td>
                  <td>
                    {order.order.first_name} {order.order.last_name}
                  </td>
                  <td>{order.product_name}</td>
                  <td>
                    {order.order.address_1}, {order.order.city}{" "}
                    {order.order.state} {order.order.country}
                  </td>
                  <td className={styles.quantity}>{order.quantity}</td>
                  <td>{`$${order.total_amount}`}</td>
                  <td>{getOrderDateTime(order.order.updated)}</td>
                  <td className={`${styles.status} ${order.status}`}>
                    {" "}
                    <span>{order.status}</span>{" "}
                  </td>
                  <td>
                    <OrderUpdate getUpdate={getUpdate} order={order} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

const OrderUpdate = ({ getUpdate, order }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [selected, setSelected] = useState(order.status);

  const submitHandler = (e) => {
    e.preventDefault();
    // 
    const orderUpdate = {...order, status: selected, order: order.order.id}
    getUpdate(orderUpdate);
    setIsUpdate(false);
  };

  return (
    <React.Fragment>
      {!isUpdate ? (
        <button
          className={styles.btn__update}
          onClick={() => setIsUpdate(true)}
        >
          update
        </button>
      ) : (
        <form onSubmit={submitHandler}>
          <select
            name=""
            id=""
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="out for delivery">Out for delivery</option>
            <option value="delivered">Delivered</option>
          </select>
          <br />
          <button className={styles.btn__update} type="submit">
            Save
          </button>
          <button
            className={`${styles.btn__update}`}
            type="submit"
            onClick={() => setIsUpdate(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </React.Fragment>
  );
};
