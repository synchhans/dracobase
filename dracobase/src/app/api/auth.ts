import { User } from "@/types/user.types";

export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();

    return data.user || null;
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};

export const updateUser = async (userData: User): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};

export const verifyUser = async (): Promise<User | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
      {
        credentials: "include",
      }
    );

    if (response.status === 401 || response.status === 403) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to verify user status");
    }

    const data = await response.json();

    if (!data.user) {
      throw new Error("User data is missing in the response");
    }

    return data.user as User;
  } catch (err) {
    console.error((err as Error).message || "An unexpected error occurred.");
    throw err;
  }
};
