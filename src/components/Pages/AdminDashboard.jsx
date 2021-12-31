import React, { useContext } from "react";

// style
import styles from "./AdminDashboard.module.css";
// context
import { NavContext } from "../../context/nav-context";

const AdminDashboard = () => {
  const { navHeight } = useContext(NavContext);

  return (
    <div
      className={styles.main}
      style={{ minHeight: `calc(100vh - ${navHeight + 'px'})` }}
    >
      admin dashboard
    </div>
  );
};

export default AdminDashboard;
