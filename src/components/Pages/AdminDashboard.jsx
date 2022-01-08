import React, { useContext, useEffect } from "react";

import TopSellingChart from "../Sales/TopSellingChart";
import Orders from "../Sales/Orders";
// style
import styles from "./AdminDashboard.module.css";
// context
import { SalesContext } from "../../context/sales-context";
import { NavContext } from "../../context/nav-context";
// utils
import { ordersCounter } from "../../utils";

const AdminDashboard = () => {
  const { navHeight } = useContext(NavContext);
  const { orders, getOrders, refresh } = useContext(SalesContext);

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, [refresh]);

  return (
    <React.Fragment>
      <div
        className={`dashboard ${styles.main}`}
        style={{ minHeight: `calc(100vh - ${navHeight + "px"})` }}
      >
        <div>
          <TopSellingChart />
        </div>
        <div className={styles.order__cards}>
          <TotalOrders orders={orders} />
          <PendingOrders orders={orders} />
          <DeliveredOrders orders={orders} />
        </div>
        <Orders navHeight={navHeight} />
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;

const TotalOrders = ({ orders }) => {
  return (
    <div className={styles.orders__card}>
      <h2>Total Orders</h2>
      <h3>{ordersCounter(orders, null)}</h3>
    </div>
  );
};

const PendingOrders = ({ orders }) => {
  return (
    <div className={`${styles.orders__card} ${styles.pending}`}>
      <h2>Pending Orders</h2>
      <h3>{ordersCounter(orders, "pending")}</h3>
    </div>
  );
};

const DeliveredOrders = ({ orders }) => {
  return (
    <div className={`${styles.orders__card} ${styles.delivered}`}>
      <h2>Delivered Orders</h2>
      <h3>{ordersCounter(orders, "delivered")}</h3>
    </div>
  );
};
