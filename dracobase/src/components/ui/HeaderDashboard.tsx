import { HeaderDashboardProps } from "@/types/headerDashboard.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCog, FaSignOutAlt } from "react-icons/fa";

export default function HeaderDashboard({
  user,
  handleLogout,
}: HeaderDashboardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between py-3 px-5 h-14">
      <div className="inline-flex gap-x-2 items-center">
        <a
          href={user.level === "admin" ? "/master" : "/dashboard"}
          className="px-0.5 hover:bg-gray-100 rounded-sm"
        >
          <Image src={"/logo.svg"} alt="Logo" width={30} height={30} priority />
        </a>
        <p className="cursor-pointer px-1.5 hover:bg-gray-100 rounded-xs">
          {user.email ? user.email : user.githubUsername}
        </p>
      </div>
      <div className="inline-flex gap-x-3">
        <button className="inline-flex items-center gap-x-1 py-1 px-1.5 rounded-sm text-sm cursor-pointer bg-amber-300 hover:bg-amber-200">
          <FaPlus className="w-3 h-3" /> Buat
        </button>
        <button className="cursor-pointer hover:bg-gray-200 rounded-sm p-1.5">
          <IoMdNotificationsOutline />
        </button>
        <div className="relative inline-block" ref={dropdownRef}>
          <div
            className="cursor-pointer hover:bg-gray-100 px-1 rounded-xs"
            onClick={toggleDropdown}
          >
            <Image
              src={user.picture!}
              width={30}
              height={30}
              alt="User Profile"
              className="rounded-full"
              priority
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-5 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div
                className="flex items-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaCog className="mr-2" />
                Setting
              </div>

              <div
                className="flex items-center px-4 py-2 text-red-600 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleLogout();
                }}
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
