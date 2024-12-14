"use client";
import Link from "next/link";
import React, { FC } from "react";
import "./header.css";
import { Fullscreen } from "@/components/SVGIcons/FullScreen";
import { NightMode } from "@/components/SVGIcons/NightMode";
import { DashboardIcon } from "@/components/SVGIcons/DashBoardIcon";
import { ToggleIcon } from "@/components/SVGIcons/ToggleIcon";
interface HeaderProps {
  onToggleSidebar: () => void; // Receive the toggle function as a prop
}
const Header: FC<any> = ({ onToggleSidebar }: HeaderProps) => {
  const handleToggleFullscreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable fullscreen mode: ${err.message}`
        );
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to exit fullscreen mode: ${err.message}`
        );
      });
    }
  };

  return (
    <header>
      <div className="main-header-container">
        <ToggleIcon onClick={onToggleSidebar} className="header-icon" />
        <div className="header-right">
          <ul>
            <li>
              <NightMode className="header-icon" />
            </li>
            <li>
              <Fullscreen
                onClick={handleToggleFullscreen}
                className="header-icon"
              />
            </li>
            <li>
              <Link href="/Home">
                <DashboardIcon className="header-icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
