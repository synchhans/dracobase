import { Material, MaterialInputProps } from "@/types/language.types";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

export default function MaterialInput({
  materials,
  setFormData,
  formErrors,
  setFormErrors,
}: MaterialInputProps) {
  const [newMaterial, setNewMaterial] = useState<Material>({
    title: "",
    content: "",
    codeExample: "",
    terminalCommands: [],
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [isAddingMaterial, setIsAddingMaterial] = useState<boolean>(true);

  useEffect(() => {
    if (editingIndex !== null) {
      setIsAddingMaterial(false);
    } else {
      setIsAddingMaterial(true);
    }
  }, [editingIndex]);

  const handleMaterialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMaterial((prev) => ({ ...prev, [name]: value }));
  };

  const validateMaterials = (updatedMaterials: Material[]) => {
    const errors = { ...formErrors };
    errors.materials =
      updatedMaterials.length > 0 ? "" : "Minimal 1 materi harus ditambahkan.";
    setFormErrors(errors);
    return updatedMaterials.length > 0;
  };

  const addMaterial = () => {
    if (!newMaterial.title.trim() || !newMaterial.content.trim()) {
      alert("Judul dan isi materi wajib diisi.");
      return;
    }

    const updatedMaterials = [...materials, newMaterial];
    setFormData((prev: any) => ({ ...prev, materials: updatedMaterials }));
    setNewMaterial({
      title: "",
      content: "",
      codeExample: "",
      terminalCommands: [],
    });

    validateMaterials(updatedMaterials);
  };

  const removeMaterial = (index: number) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    setFormData((prev: any) => ({ ...prev, materials: updatedMaterials }));

    validateMaterials(updatedMaterials);
  };

  const handleUpdateMaterial = (index: number) => {
    if (!newMaterial.title.trim() || !newMaterial.content.trim()) {
      alert("Judul dan isi materi wajib diisi.");
      return;
    }

    const updatedMaterials = [...materials];
    updatedMaterials[index] = newMaterial;

    setFormData((prev: any) => ({ ...prev, materials: updatedMaterials }));
    setEditingIndex(null);
    setNewMaterial({
      title: "",
      content: "",
      codeExample: "",
      terminalCommands: [],
    });

    validateMaterials(updatedMaterials);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Materi Pembelajaran
      </label>

      <div className="space-y-2 mt-2">
        {isAddingMaterial && (
          <div className="space-y-2">
            <input
              type="text"
              name="title"
              placeholder="Judul Materi"
              value={newMaterial.title}
              onChange={handleMaterialChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
              name="content"
              placeholder="Isi Materi"
              value={newMaterial.content}
              onChange={handleMaterialChange}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <label className="block text-sm font-medium text-gray-700">
              Tambahan Materi (optional)
            </label>
            <input
              type="text"
              name="codeExample"
              placeholder="Contoh Kode (opsional)"
              value={newMaterial.codeExample}
              onChange={(e) =>
                setNewMaterial((prev) => ({
                  ...prev,
                  codeExample: e.target.value,
                }))
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <input
              type="text"
              name="terminalCommands"
              placeholder="Perintah Terminal (pisahkan dengan koma, opsional)"
              value={newMaterial.terminalCommands?.join(",")}
              onChange={(e) =>
                setNewMaterial((prev) => ({
                  ...prev,
                  terminalCommands: e.target.value
                    .split(",")
                    .map((cmd) => cmd.trim()),
                }))
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
              onClick={addMaterial}
            >
              Tambah Materi
            </button>
          </div>
        )}

        <div className="my-4 space-y-2">
          {materials.map((material, index) => (
            <div
              key={index}
              className="p-3 border border-gray-200 rounded-md flex justify-between items-center"
            >
              {editingIndex === index ? (
                <div className="space-y-2 w-full">
                  {/* Judul */}
                  <input
                    type="text"
                    placeholder="Judul Materi"
                    value={newMaterial.title}
                    onChange={(e) =>
                      setNewMaterial((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />

                  <textarea
                    placeholder="Isi Materi"
                    value={newMaterial.content}
                    onChange={(e) =>
                      setNewMaterial((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />

                  <input
                    type="text"
                    placeholder="Contoh Kode (opsional)"
                    value={newMaterial.codeExample}
                    onChange={(e) =>
                      setNewMaterial((prev) => ({
                        ...prev,
                        codeExample: e.target.value,
                      }))
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />

                  <input
                    type="text"
                    placeholder="Perintah Terminal (pisahkan dengan koma, opsional)"
                    value={newMaterial.terminalCommands?.join(",")}
                    onChange={(e) =>
                      setNewMaterial((prev) => ({
                        ...prev,
                        terminalCommands: e.target.value
                          .split(",")
                          .map((cmd) => cmd.trim()),
                      }))
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                    onClick={() => handleUpdateMaterial(index)}
                  >
                    Simpan Perubahan
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ml-2"
                    onClick={() => setEditingIndex(null)}
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold">{material.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {material.content}
                    </p>
                  </div>
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
                                setNewMaterial(material);
                                setEditingIndex(index);
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
                                removeMaterial(index);
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
                </>
              )}
            </div>
          ))}
        </div>

        {formErrors.materials && (
          <p className="text-sm text-red-500 mb-3">{formErrors.materials}</p>
        )}
      </div>
    </div>
  );
}
