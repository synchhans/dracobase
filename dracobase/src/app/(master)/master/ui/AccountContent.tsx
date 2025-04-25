import {
  FaEllipsisV,
  FaFilter,
  FaSortAmountDownAlt,
  FaSortAmountUp,
  FaTimes,
} from "react-icons/fa";
import useAccount from "@/hooks/useAccount";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Image from "next/image";
import EditAccountModal from "./EditAccountModal";
import { User } from "@/types/user.types";

export default function AccountContent({ user }: { user: User }) {
  const { accounts, loading, error, refetch, editAccount, deleteAccount } =
    useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");
  const [filterLoginVia, setFilterLoginVia] = useState("");
  const [filterProfileComplete, setFilterProfileComplete] = useState<
    "completed" | "incomplete" | ""
  >("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openEditModal = (user: any) => {
    setSelectedUser({ ...user });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const saveData = (newLevel: string, newStatus: string) => {
    if (!selectedUser) return;

    editAccount(selectedUser._id, newLevel, newStatus);
    setIsModalOpen(false);
  };

  const handleDelete = (user: any) => {
    if (
      window.confirm(`Are you sure you want to delete ${user.displayName}?`)
    ) {
      deleteAccount(user._id);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        <p>{error}</p>
        <button
          onClick={refetch}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600">
        <p>Tidak ada akun yang ditemukan.</p>
      </div>
    );
  }

  const sortedUsers = [...accounts].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const filteredUsers = sortedUsers.filter((user) => {
    const matchesSearch = user.displayName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLoginVia =
      !filterLoginVia ||
      (filterLoginVia === "Google" && user.googleId) ||
      (filterLoginVia === "GitHub" && user.githubId);
    const matchesProfileComplete =
      filterProfileComplete === "" ||
      user.isProfileComplete === (filterProfileComplete === "completed");

    return matchesSearch && matchesLoginVia && matchesProfileComplete;
  });

  const toggleDropdown = (_id: string) => {
    setActiveDropdown(activeDropdown === _id ? null : _id);
  };

  return (
    <div className="p-3">
      <div className="flex flex-col sm:flex-row justify-between h-full items-start sm:items-center mb-6 gap-4">
        <div className="relative">
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            <FaFilter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          {isFilterDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="border-b border-gray-200 p-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Urutkan
                </p>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => {
                        setSortBy("latest");
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2 ${
                        sortBy === "latest" ? "bg-gray-100" : ""
                      }`}
                    >
                      <FaSortAmountDownAlt className="w-4 h-4" />
                      Terbaru
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSortBy("oldest");
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2 ${
                        sortBy === "oldest" ? "bg-gray-100" : ""
                      }`}
                    >
                      <FaSortAmountUp className="w-4 h-4" />
                      Terlama
                    </button>
                  </li>
                </ul>
              </div>

              <div className="border-b border-gray-200 p-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Login Via
                </p>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setFilterLoginVia("")}
                      className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                        filterLoginVia === "" ? "bg-gray-100" : ""
                      }`}
                    >
                      Semua Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setFilterLoginVia("Google")}
                      className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                        filterLoginVia === "Google" ? "bg-gray-100" : ""
                      }`}
                    >
                      Google
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setFilterLoginVia("GitHub")}
                      className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                        filterLoginVia === "GitHub" ? "bg-gray-100" : ""
                      }`}
                    >
                      GitHub
                    </button>
                  </li>
                </ul>
              </div>

              <div className="p-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Profile Status
                </p>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setFilterProfileComplete("")}
                      className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                        filterProfileComplete === "" ? "bg-gray-100" : ""
                      }`}
                    >
                      Semua Profil
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setFilterProfileComplete("completed")}
                      className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                        filterProfileComplete === "completed"
                          ? "bg-gray-100"
                          : ""
                      }`}
                    >
                      Profil Lengkap
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setFilterProfileComplete("incomplete")}
                      className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                        filterProfileComplete === "incomplete"
                          ? "bg-gray-100"
                          : ""
                      }`}
                    >
                      Profil Belum Lengkap
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none">
            <FaTimes className="w-4 h-4" onClick={() => setSearchTerm("")} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between py-4 px-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer relative"
          >
            <div className="flex items-center gap-x-4 flex-grow">
              <div className="flex-shrink-0 relative w-10 h-10">
                <Image
                  src={user.picture || ""}
                  alt={`${user.displayName}'s profile`}
                  width={100}
                  height={100}
                  className="w-full h-full rounded-full object-cover"
                  priority
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
                  {user.displayName}
                </h3>
                <p
                  className={`inline text-xs sm:text-sm text-white px-1 rounded-md line-clamp-2 ${
                    user.level === "admin" ? "bg-green-500" : "bg-blue-800"
                  }`}
                >
                  {user.level}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Login via {user.googleId ? "Google" : "GitHub"}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Role: {user.role}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Plan: {user.plan}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Profile Complete: {user.isProfileComplete ? "Yes" : "No"}
                </p>
                <p
                  className={`inline text-xs text-white px-1 rounded-md line-clamp-2 ${
                    user.status === "active" ? "bg-cyan-500" : "bg-red-600"
                  }`}
                >
                  {user.status}
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => toggleDropdown(user._id)}
              >
                <FaEllipsisV className="w-5 h-5 cursor-pointer" />
              </button>
              {activeDropdown === user._id && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  ref={actionRef}
                >
                  <ul className="py-1">
                    <li>
                      <button
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                        onClick={() => handleDelete(user)}
                      >
                        Hapus
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <EditAccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={saveData}
        initialData={{
          level: selectedUser?.level || "user",
          status: selectedUser?.status || "active",
        }}
      />
    </div>
  );
}
