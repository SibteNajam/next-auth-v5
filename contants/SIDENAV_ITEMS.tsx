import { SideNavItem } from "../types/datatypes";
import { DashboardIcon } from "@/components/SVGIcons/DashBoardIcon";
import { Fullscreen } from "@/components/SVGIcons/FullScreen";
import DBIcon from "@/components/SVGIcons/DBIcon";
export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/Dashboard",
    icon: <DashboardIcon className="sidebar-icon" />,
  },
  {
    title: "Connect-DB",
    path: "/Connect-Data-Base",
    icon: <DBIcon className="sidebar-icon" />,
  },
  {
    title: "Generate-SQL",
    path: "/Generate-SQL",
    icon: <Fullscreen className="sidebar-icon" />,
  },
];
