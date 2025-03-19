import { Language } from "@/types/languageModal.types";
import { useEffect, useRef, useState } from "react";
import {
  FaCode,
  FaHtml5,
  FaJsSquare,
  FaPhp,
  FaPython,
  FaTimes,
} from "react-icons/fa";

const languages: Language[] = [
  {
    name: "HTML+CSS",
    icon: <FaHtml5 className="w-6 h-6 text-orange-500" />,
    description: "Bahasa markup dan styling dasar untuk web development.",
    categories: ["frontend", "browser", "popular"],
    link: "pemrograman/html-css",
  },
  {
    name: "JavaScript",
    icon: <FaJsSquare className="w-6 h-6 text-yellow-500" />,
    description: "Bahasa pemrograman utama untuk interaktivitas web.",
    categories: ["frontend", "backend", "browser", "popular"],
    link: "pemrograman/javascript",
  },
  {
    name: "PHP",
    icon: <FaPhp className="w-6 h-6 text-purple-700" />,
    description: "Bahasa server-side untuk pengembangan web dinamis.",
    categories: ["backend", "server"],
    link: "pemrograman/php",
  },
  {
    name: "Python",
    icon: <FaPython className="w-6 h-6 text-blue-500" />,
    description: "Bahasa pemrograman serbaguna untuk berbagai kebutuhan.",
    categories: ["backend", "server", "popular"],
    link: "pemrograman/python",
  },
];

export default function LanguageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter((cat) => cat !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
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

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div
                className="flex flex-wrap gap-2 overflow-x-auto hide-scrollbar"
                style={{ scrollbarWidth: "none" }}
              >
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language, index) => (
                  <a
                    key={index}
                    href={language.link}
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex-shrink-0">{language.icon}</div>

                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                        {language.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                        {language.description}
                      </p>
                    </div>
                  </a>
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
    </>
  );
}
