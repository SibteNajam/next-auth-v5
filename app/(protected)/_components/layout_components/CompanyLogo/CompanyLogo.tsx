"use client";

import React from "react";
import Image from "next/image"; // Importing the Image component
import CompanyLogoImage from "../../../../../assets/images/AM.jpg";
import "@/app/(protected)/_components/layout_components/Sidebar/sidebar.scss";
interface CompanyLogoProps {
  isSidebarOpen: boolean;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ isSidebarOpen }) => {
  return (
    <div className={`logo ${!isSidebarOpen ? "collapsed" : ""}`}>
      <Image
        className="logo-image"
        src={CompanyLogoImage}
        alt="Company Logo"
        width={110} // Replace with your desired width
        height={110} // Replace with your desired height
        priority // Optimize for LCP (optional)
      />
    </div>
  );
};

export default CompanyLogo;
