import useLanguages from "@/hooks/useLanguages";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaEdit, FaEllipsisV, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import CULanguageModal from "./CULanguageModal";

export default function LanguageModal({ role }: { role: String }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [isCUDModalOpen, setIsCUDModalOpen] = useState(false);
  const [languageToUpdate, setLanguageToUpdate] = useState<any | null>(null);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { languages, deleteLanguage } = useLanguages();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleEditClick = (language: any) => {
    setLanguageToUpdate(language);
    setIsCUDModalOpen(true);
  };

  const handleDeleteClick = async (languageName: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus bahasa ini?")) {
      try {
        await deleteLanguage(languageName);
        toast.success("Bahasa berhasil dihapus.");
      } catch (err: any) {
        toast.error(`Gagal menghapus bahasa: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredLanguages = languages.filter((language) => {
    const matchesSearch = language.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategories.length === 0 ||
      activeCategories.some((cat) => language.categories.includes(cat));
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      <button
        className="inline-flex items-center gap-x-2 py-2 px-4 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
        onClick={openModal}
      >
        <FaCode className="w-5 h-5" />
        Pilih Bahasa Pemrograman
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Pilih Bahasa Pemrograman
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none text-xl cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex flex-wrap gap-2">
                {["popular", "frontend", "backend", "server", "browser"].map(
                  (category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                        activeCategories.includes(category)
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  )
                )}
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Cari bahasa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  ref={searchInputRef}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setSearchTerm("")}
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Language List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 px-1 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <a
                      href={`/pemrograman/${language.link}`}
                      rel="noopener noreferrer"
                      className="flex items-center gap-x-4 flex-grow"
                    >
                      <div className="flex-shrink-0 relative w-10 h-10">
                        <Image
                          src={language.icon}
                          alt={`Icon ${language.name}`}
                          fill
                          priority
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
                          {language.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                          {language.description}
                        </p>
                      </div>
                    </a>
                    {role === "admin" && (
                      <div className="relative">
                        <button
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownIndex(
                              dropdownIndex === index ? null : index
                            );
                          }}
                        >
                          <FaEllipsisV className="w-5 h-5 cursor-pointer" />
                        </button>
                        {dropdownIndex === index && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <ul className="py-1">
                              <li>
                                <button
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDropdownIndex(null);
                                    handleEditClick(language);
                                  }}
                                >
                                  <FaEdit className="w-4 h-4" />
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDropdownIndex(null);
                                    handleDeleteClick(language.name);
                                  }}
                                >
                                  <FaTrash className="w-4 h-4" />
                                  Hapus
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 text-sm sm:text-base">
                  Tidak ada hasil yang ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isCUDModalOpen && (
        <CULanguageModal
          onClose={() => setIsCUDModalOpen(false)}
          mode="update"
          languageToUpdate={languageToUpdate}
        />
      )}
    </>
  );
}
