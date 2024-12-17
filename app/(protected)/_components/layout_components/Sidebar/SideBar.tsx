import Link from "next/link";
import { FC, useState } from "react";
import { usePathname } from "next/navigation"; // Import the hook for current path
import { SideNavItem } from "@/types/datatypes";
import CompanyLogo from "../CompanyLogo/CompanyLogo";
import "./sidebar.scss";
interface SidebarProps {
  items: SideNavItem[];
  activeItem: string;
  onItemClick: (item: string) => void;
  isSidebarOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({
  items,
  activeItem,
  onItemClick,
  isSidebarOpen,
}) => {
  // strokeLinecap="round"
  // strokeLinejoin="round"
  const [openItems, setOpenItems] = useState<string[]>([]);
  // Toggle open state of sub-modules
  const handleToggleSubmodule = (itemName: string) => {
    setOpenItems(
      (prevState) =>
        prevState.includes(itemName)
          ? prevState.filter((name) => name !== itemName) // Close
          : [...prevState, itemName] // Open
    );
  };

  return (
    <div className="side-col">
      <div className="logo-container">
        <CompanyLogo isSidebarOpen={isSidebarOpen} /> {/* Company Logo */}
      </div>
      <div className="sidebar">
        <div className={`menu ${!isSidebarOpen ? "collapsed" : ""}`}>
          MAIN MENU
        </div>
        <div className="sidebar-items">
          <ul className="">
            {items.map((item, index) => (
              <li
                key={index}
                className={`${!isSidebarOpen ? "collapsed" : ""}${
                  activeItem === item.title ? "active" : ""
                }`}
              >
                <Link href={item.path || "#"} className="nav-item">
                  {item.icon && <span>{item.icon}</span>}
                  {isSidebarOpen && <span>{item.title}</span>}
                </Link>
                {item.children && (
                  <button onClick={() => handleToggleSubmodule(item.title)}>
                    {openItems.includes(item.title) ? "▲" : "▼"}
                  </button>
                )}

                {item.children && openItems.includes(item.title) && (
                  <ul className="sub-menu">
                    {item.children.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link href={subItem.path || "#"}>
                          {subItem.icon && (
                            <span className="icon">{subItem.icon}</span>
                          )}
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
