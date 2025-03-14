"use client";

import LoadingSpinner from "@/components/layout/LoadingSpinner";
import ErrorHandler from "@/components/layout/ErrorHandler";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading, isAuthorized, handleLogout, error } = useAuth();

  useEffect(() => {
    if (user && user?.level === "admin") {
      router.push("/master");
    }
  }, [user, router]);

  if (isLoading || !isAuthorized || (user && user?.level === "admin")) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorHandler
        message={error}
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-2 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 cursor-pointer"
      >
        Logout
      </button>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <Image
            src={user.picture!}
            width={100}
            height={100}
            alt="Image"
            priority
          />
          <p>Welcome, {user.displayName}</p>
          {user.email ? (
            <p>Email: {user.email}</p>
          ) : (
            <p>Username: {user.githubUsername}</p>
          )}
          <p>Account: {user.level}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}
