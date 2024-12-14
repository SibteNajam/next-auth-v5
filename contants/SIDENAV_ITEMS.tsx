import { SideNavItem } from "../types/datatypes";
import { DashboardIcon } from "@/components/SVGIcons/DashBoardIcon";
import { Fullscreen } from "@/components/SVGIcons/FullScreen";
export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/Dashboard",
    icon: <DashboardIcon className="sidebar-icon" />,
  },
  {
    title: "Connect_Data-Base",
    path: "/Connect-Data-Base",
    icon: <Fullscreen className="sidebar-icon" />,
  },
];
