import { MainDashoardProps } from "@/types/mainDashoardProps.types";
import SidebarDashboard from "./SidebarDashboard";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";

export default function MainDashboard({ user, contentMap }: MainDashoardProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getContent = () => {
    return contentMap[pathname] || <div>Content Not Allowed</div>;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-[calc(100vh-56px)]">
      <button
        ref={buttonRef}
        className="md:hidden p-4 bg-gray-100 text-gray-700 fixed top-0 left-0 z-49 cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars className="text-xl" />
      </button>

      <div
        ref={sidebarRef}
        className={`w-64 h-[calc(100vh-56px)] bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative fixed z-40`}
      >
        <SidebarDashboard user={user} />
      </div>

      <div
        className={`flex-1 p-4 ${
          isSidebarOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {getContent()}
      </div>
    </div>
  );
}
