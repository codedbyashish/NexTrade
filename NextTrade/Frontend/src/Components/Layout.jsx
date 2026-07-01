import { Outlet } from "react-router-dom";
import Sidebar from "../pages2/SideBar/SideBar";
import DashboardHeader from "../pages2/DashboardHeader/DashboardHeader";
import Footer from "../pages2/Footer/Footer";

import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.mainContent}>
        <DashboardHeader />

        <main className={styles.pageContent}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}