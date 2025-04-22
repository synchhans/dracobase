"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaBars, FaLock, FaUnlock } from "react-icons/fa";
import { Workspace } from "@/types/workspace.types";
import { useLearningProgress } from "@/hooks/useLearningProgress";

export default function LearningPlatform({
  workspace,
}: {
  workspace: Workspace;
}) {
  if (!workspace) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Workspace tidak ditemukan.</p>
      </div>
    );
  }

  const {
    currentMaterialIndex,
    completedMaterials,
    isCompleted,
    loading,
    updateMaterialIndex,
    markMaterialAsCompleted,
    markAsCompleted,
  } = useLearningProgress(workspace.userId._id, workspace._id);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fungsi untuk pindah ke materi berikutnya
  const goToNextMaterial = () => {
    if (isCompleted) return;

    const currentMaterialIndexNumber = currentMaterialIndex;

    if (!completedMaterials.includes(currentMaterialIndexNumber)) {
      markMaterialAsCompleted(currentMaterialIndexNumber);
    }

    if (currentMaterialIndex < workspace.language.materials.length - 1) {
      updateMaterialIndex(currentMaterialIndex + 1);
    }
  };

  // Fungsi untuk pindah ke materi sebelumnya
  const goToPreviousMaterial = () => {
    if (isCompleted) return;

    if (currentMaterialIndex > 0) {
      updateMaterialIndex(currentMaterialIndex - 1);
    }
  };

  // Cek apakah materi sudah diselesaikan
  const isMaterialCompleted = (materialIndex: number): boolean => {
    return completedMaterials.includes(materialIndex);
  };

  // Fungsi untuk mengubah materi melalui sidebar
  const handleMaterialClick = (index: number) => {
    if (isCompleted) {
      updateMaterialIndex(index);
      return;
    }

    if (index <= currentMaterialIndex || completedMaterials.includes(index)) {
      updateMaterialIndex(index);
    }
  };

  // Materi saat ini
  const currentMaterial = workspace.language.materials[currentMaterialIndex];

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-64 bg-white border-r border-gray-200 p-6 space-y-4 fixed inset-y-0 left-0 z-50 lg:relative`}
      >
        <div className="flex items-center gap-3 mb-4">
          <a
            href="/dashboard"
            className="px-0.5 hover:bg-gray-100 rounded-sm cursor-pointer"
          >
            <Image
              src={"/logo.svg"}
              alt="Logo"
              width={30}
              height={30}
              priority
            />
          </a>
          <h2 className="text-lg font-semibold text-gray-800">Materi</h2>
          {isCompleted && (
            <span className="text-sm text-green-500 font-bold ml-auto">
              Selesai
            </span>
          )}
          <button
            className="lg:hidden ml-auto"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-2">
          {workspace.language.materials.map((material, index) => {
            const isActive = index === currentMaterialIndex;
            const isLocked =
              !isCompleted &&
              index > currentMaterialIndex &&
              !isMaterialCompleted(index);

            return (
              <li
                key={material._id}
                onClick={() => {
                  handleMaterialClick(index);
                  setIsSidebarOpen(false);
                }}
                className={`p-3 rounded-md flex items-center ${
                  isActive
                    ? "bg-blue-100 text-blue-700 cursor-default"
                    : isLocked
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {isLocked ? (
                  <>
                    <FaLock className="mr-2 text-red-500" />
                    {material.title}
                  </>
                ) : (
                  <>
                    <FaUnlock className="mr-2 text-green-500" />
                    {material.title}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <button
        className="lg:hidden p-4 bg-transparent shadow-md fixed top-0 left-0 z-50"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars className="text-sm" />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto lg:ml-10">
        {/* Judul Materi */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {currentMaterial.title}
        </h1>

        {/* Deskripsi Materi */}
        <p className="text-gray-700 mb-6">{currentMaterial.content}</p>

        {/* Contoh Kode */}
        {currentMaterial.codeExample && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Contoh Kode
            </h2>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
              <code>{currentMaterial.codeExample}</code>
            </pre>
          </div>
        )}

        {/* Perintah Terminal */}
        {currentMaterial.terminalCommands.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Perintah Terminal
            </h2>
            <ul className="list-disc pl-6">
              {currentMaterial.terminalCommands.map((command, index) => (
                <li key={index} className="text-gray-700">
                  {command}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Navigation Buttons */}
      {!isCompleted && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goToPreviousMaterial}
            disabled={currentMaterialIndex === 0}
          >
            Previous
          </button>
          {currentMaterialIndex === workspace.language.materials.length - 1 ? (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={markAsCompleted}
            >
              Selesai
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={goToNextMaterial}
              disabled={
                currentMaterialIndex === workspace.language.materials.length - 1
              }
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
