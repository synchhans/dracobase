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
  ];

  return (
    <div className="w-64 h-[calc(100vh - 56px)] bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
          General
        </p>
        <nav>
          {generalMenuItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <div
                className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 ${
                  pathname === item.path
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
          Trash
        </p>
        <nav>
          {trashMenuItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <div
                className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 ${
                  pathname === item.path
                    ? "bg-red-500 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {user.level === "admin" && (
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
            Admin Tools
          </p>
          <nav>
            {adminMenuItems.map((item, index) => (
              <Link href={item.path} key={index}>
                <div
                  className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 ${
                    pathname === item.path
                      ? "bg-green-500 text-white shadow-md"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
