import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.types";
import { verifyUser } from "@/app/api/auth";

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const userData = await verifyUser();

      if (!userData) {
        router.push("/login");
        return;
      }

      setIsAuthorized(true);
      setUser(userData);
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      setUser(null);
      setIsAuthorized(false);
      setError(null);

      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setError((err as Error).message || "Failed to logout. Please try again.");
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return { user, isLoading, isAuthorized, handleLogout, error };
};
