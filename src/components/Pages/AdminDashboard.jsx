import React, { useContext } from "react";

import TopSellingChart from "../Sales/TopSellingChart";
import Orders from "../Sales/Orders";
// style
import styles from "./AdminDashboard.module.css";
// context
import { NavContext } from "../../context/nav-context";
import SalesProvider from "../../context/sales-context";

const AdminDashboard = () => {
  const { navHeight } = useContext(NavContext);

  return (
    <SalesProvider>
      <div
        className={`dashboard ${styles.main}`}
        style={{ minHeight: `calc(100vh - ${navHeight + "px"})` }}
      >
        <TopSellingChart />
        <Orders/>
      </div>
    </SalesProvider>
  );
};

export default AdminDashboard;
