import { useState } from "react";
import CULanguageModal from "@/components/modal/CULanguageModal";

export default function ProgrammingContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pemrograman</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Tambah Bahasa Pemrograman
        </button>
      </div>

      <div>Programming Content</div>

      {isModalOpen && <CULanguageModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
