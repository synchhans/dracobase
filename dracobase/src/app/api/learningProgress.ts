const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/progress`;

export const apiGetProgress = async (
  userId: string,
  workspaceId: string
): Promise<{
  activeMaterialIndex: number;
  completedMaterialIndexes: number[];
}> => {
  try {
    const response = await fetch(`${API_URL}/${userId}/${workspaceId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mengambil data progress.");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Respons bukan JSON valid.");
    }
  } catch (err: any) {
    throw new Error(
      err.message || "Terjadi kesalahan saat mengambil data progress."
    );
  }
};

export const apiUpdateProgress = async (
  userId: string,
  workspaceId: string,
  updates: { activeMaterialIndex: number; completedMaterialIndexes: number[] }
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${userId}/${workspaceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal memperbarui data progress.");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("Progress updated successfully:", data);
    } else {
      throw new Error("Respons bukan JSON valid.");
    }
  } catch (err: any) {
    throw new Error(
      err.message || "Terjadi kesalahan saat memperbarui data progress."
    );
  }
};
