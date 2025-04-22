"use client";
import { apiGetWorkspace } from "@/app/api/workspace";
import { Workspace } from "@/types/workspace.types";
import { useState, useEffect } from "react";

export default function useFetchWorkspace(id: string) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspace = async () => {
    try {
      console.log("Fetching workspace with ID:", id);
      const data = await apiGetWorkspace(id);
      console.log("API Response:", data);
      setWorkspace(data);
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        window.location.href = "/login";
        return;
      }
      console.error("Error fetching workspace:", err.message);
      setError(err.message || "Gagal mengambil data workspace.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchWorkspace();
    }
  }, [id]);

  return { workspace, loading, error };
}
