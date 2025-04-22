import { useState, useEffect } from "react";
import { apiGetProgress, apiUpdateProgress } from "@/app/api/learningProgress";
import { Progress, UpdateProgressParams } from "@/types/learningProgress.type";

export const useLearningProgress = (userId: string, workspaceId: string) => {
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState<number>(0);
  const [completedMaterials, setCompletedMaterials] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // State isCompleted
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress: Progress = await apiGetProgress(userId, workspaceId);
        setCurrentMaterialIndex(progress.activeMaterialIndex);
        setCompletedMaterials(progress.completedMaterialIndexes);
        setIsCompleted(progress.isCompleted || false); // Simpan nilai isCompleted
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [userId, workspaceId]);

  const saveCurrentProgress = async (
    newMaterialIndex: number,
    newCompletedMaterials: number[],
    isCompletedParam: boolean = false
  ) => {
    // Jika sudah selesai, tidak perlu menyimpan lagi
    if (isCompleted) return;

    try {
      const params: UpdateProgressParams = {
        activeMaterialIndex: newMaterialIndex,
        completedMaterialIndexes: newCompletedMaterials.map(Number),
        isCompleted: isCompletedParam,
      };
      await apiUpdateProgress(userId, workspaceId, params);

      // Perbarui state isCompleted jika diperlukan
      if (isCompletedParam) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const updateMaterialIndex = (newMaterialIndex: number) => {
    // Jika sudah selesai, tidak perlu memperbarui index
    if (isCompleted) {
      setCurrentMaterialIndex(newMaterialIndex);
      return;
    }

    // Jika belum selesai, perbarui indeks dan simpan progress
    setCurrentMaterialIndex(newMaterialIndex);
    saveCurrentProgress(newMaterialIndex, completedMaterials);
  };

  const markMaterialAsCompleted = (materialIndex: number) => {
    // Jika sudah selesai, tidak perlu menandai materi sebagai selesai
    if (isCompleted) return;

    if (!completedMaterials.includes(materialIndex)) {
      const newCompletedMaterials = [...completedMaterials, materialIndex];
      setCompletedMaterials(newCompletedMaterials);
      saveCurrentProgress(currentMaterialIndex, newCompletedMaterials);
    }
  };

  const markAsCompleted = async () => {
    // Jika sudah selesai, tidak perlu menjalankan ini lagi
    if (isCompleted) return;

    try {
      await saveCurrentProgress(currentMaterialIndex, completedMaterials, true);

      alert("Selamat! Anda telah menyelesaikan semua materi.");
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      if (isCompleted) return;

      const isConfirmed = window.confirm(
        "Apakah Anda yakin ingin keluar? Progress materi Anda akan disimpan."
      );

      if (isConfirmed) {
        const params: UpdateProgressParams = {
          activeMaterialIndex: currentMaterialIndex,
          completedMaterialIndexes: completedMaterials,
        };
        await apiUpdateProgress(userId, workspaceId, params);

        return;
      }

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentMaterialIndex, completedMaterials, userId, workspaceId]);

  return {
    currentMaterialIndex,
    completedMaterials,
    isCompleted, // Tambahkan isCompleted ke return value
    loading,
    updateMaterialIndex,
    markMaterialAsCompleted,
    markAsCompleted,
  };
};
