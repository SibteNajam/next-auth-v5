"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "@/css/Layout-css/layout.scss";
import Sidebar from "./_components/layout_components/Sidebar/SideBar";
import Header from "./_components/layout_components/header/Header";
import { SIDENAV_ITEMS } from "@/contants/SIDENAV_ITEMS";
import { usePathname } from "next/navigation"; // Import usePathname
interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("");
  const pathname = usePathname(); // Get current path

  const getActiveItem = (pathname: string) => {
    for (const item of SIDENAV_ITEMS) {
      if (item.path === pathname) return item.title;
      if (item.children) {
        for (const child of item.children) {
          if (child.path === pathname) return item.title;
        }
      }
    }
    return "";
  };
  const toggleSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSidebarOpen((prev) => !prev);
  };
  useEffect(() => {
    if (pathname) {
      console.log("Current Pathname:", pathname);
      setActiveItem(getActiveItem(pathname));
    }
  }, [pathname]); // Depend on pathname

  const handleItemClick = () => {
    return 1;
  };
  return (
    <Fragment>
      <div className="containerr">
        <Row className="custom-Row">
          <Col
            xs={12}
            md={2}
            lg={2}
            className={`sidebar-col ${!isSidebarOpen && "collapsed"}`}
          >
            {" "}
            <Sidebar
              items={SIDENAV_ITEMS}
              activeItem={activeItem}
              onItemClick={handleItemClick} // Pass the handler
              isSidebarOpen={isSidebarOpen}
            />
          </Col>

          <Col
            xs={12}
            md={10}
            lg={10}
            className={`main-content-col ${!isSidebarOpen && "collapsed"}`}
          >
            {" "}
            <Header onToggleSidebar={toggleSidebar} />
            <div className="main-content">{children}</div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default ProtectedLayout;
