import { SidebarDasboardProps } from "@/types/sidebarDasboardProps.types";
import {
  FaCog,
  FaTrashAlt,
  FaHistory,
  FaUser,
  FaCode,
  FaFileAlt,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarDashboard({ user }: SidebarDasboardProps) {
  const pathname = usePathname();

  const generalMenuItems = [
    {
      name: "Recent",
      icon: <FaHistory />,
      path: user.level === "admin" ? "/master" : "/dashboard",
    },
    { name: "Get Started", icon: <FaFileAlt />, path: "/get-started" },
    { name: "Setting", icon: <FaCog />, path: "/setting" },
  ];

  const trashMenuItems = [
    {
      name: "Recently Deleted",
      icon: <FaTrashAlt />,
      path: "/deleted",
    },
  ];

  const adminMenuItems = [
    { name: "Account", icon: <FaUser />, path: "/account" },
    { name: "Programming", icon: <FaCode />, path: "/programming" },
  ];

  return (
    <div className="w-64 h-[calc(100vh - 56px)]">
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase mb-2">General</p>
        <nav>
          {generalMenuItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <div
                className={`flex items-center p-2 rounded-sm cursor-pointer my-0.5 ${
                  pathname === item.path ? "bg-gray-300" : "hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase mb-2">Trash</p>
        <nav>
          {trashMenuItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <div
                className={`flex items-center p-2 rounded-sm cursor-pointer my-0.5 ${
                  pathname === item.path ? "bg-gray-300" : "hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {user.level === "admin" && (
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase mb-2">Admin Tools</p>
          <nav>
            {adminMenuItems.map((item, index) => (
              <Link href={item.path} key={index}>
                <div
                  className={`flex items-center p-2 rounded-sm cursor-pointer my-0.5 ${
                    pathname === item.path ? "bg-gray-300" : "hover:bg-gray-200"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
