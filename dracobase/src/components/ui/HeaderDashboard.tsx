import { HeaderDashboardProps } from "@/types/headerDashboard.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import LanguageModal from "../modal/LanguageModal";

const mockNotifications = [
  {
    id: 1,
    title: "Pembaruan Sistem",
    message: "Sistem telah diperbarui ke versi terbaru.",
    timestamp: "2023-10-01T10:00:00Z",
    read: false,
  },
  {
    id: 2,
    title: "Pesan Baru",
    message: "Anda memiliki pesan baru dari admin.",
    timestamp: "2023-10-01T09:30:00Z",
    read: true,
  },
];

export default function HeaderDashboard({
  user,
  handleLogout,
}: HeaderDashboardProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState(mockNotifications);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleNotification = () => {
    setIsNotificationOpen((prevState) => !prevState);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen((prevState) => !prevState);
    setIsNotificationOpen(false);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between py-3 px-5 h-14 items-center">
      <div className="inline-flex gap-x-2 items-center">
        <a
          href={user.level === "admin" ? "/master" : "/dashboard"}
          className="px-0.5 hover:bg-gray-100 rounded-sm"
        >
          <Image src={"/logo.svg"} alt="Logo" width={30} height={30} priority />
        </a>
        <p className="cursor-pointer px-1.5 hover:bg-gray-100 rounded-xs hidden md:block">
          {user.email ? user.email : user.githubUsername}
        </p>
      </div>

      <div className="inline-flex gap-x-3 items-center">
        <LanguageModal />

        <div className="relative inline-block" ref={notificationRef}>
          <button
            className="cursor-pointer hover:bg-gray-200 rounded-sm p-1.5 relative"
            onClick={() => {
              toggleNotification();
              markAllAsRead();
            }}
          >
            <IoMdNotificationsOutline className="text-xl" />
            {notifications.some((notif) => !notif.read) && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {notifications.filter((notif) => !notif.read).length}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">
                  Notifikasi
                </h3>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex items-start gap-x-3 p-3 ${
                        !notif.read ? "bg-gray-100" : ""
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ${
                            !notif.read ? "text-blue-500" : "text-gray-500"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800">
                          {notif.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          {new Date(notif.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Tidak ada notifikasi.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative inline-block" ref={profileRef}>
          <div
            className="cursor-pointer hover:bg-gray-100 px-1 rounded-xs"
            onClick={toggleProfile}
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

          {isProfileOpen && (
            <div className="absolute right-0 mt-5 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div
                className="flex items-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsProfileOpen(false);
                  window.location.href = "/setting";
                }}
              >
                <FaCog className="mr-2 text-lg" />
                Setting
              </div>

              <div
                className="flex items-center px-4 py-2 text-red-600 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsProfileOpen(false);
                  handleLogout();
                }}
              >
                <FaSignOutAlt className="mr-2 text-lg" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
