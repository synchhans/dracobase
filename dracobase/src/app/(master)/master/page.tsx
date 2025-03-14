"use client";
import ErrorHandler from "@/components/layout/ErrorHandler";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MasterDashboard() {
  const router = useRouter();
  const { user, isLoading, isAuthorized, handleLogout, error } = useAuth();

  useEffect(() => {
    if (user && user.level !== "admin") {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (isLoading || !isAuthorized || (user && user.level !== "admin")) {
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

      <h1>Master</h1>
      {user ? (
        <div className="flex flex-col items-center gap-y-2">
          <Image
            src={user.picture!}
            width={100}
            height={100}
            className="rounded-full"
            alt="User Image"
            priority
          />
          <p>Welcome Master, {user.displayName}</p>
          {user.email ? (
            <p>Email: {user.email}</p>
          ) : (
            <p>Username: {user.githubUsername}</p>
          )}
          <p>Account: {user.level}</p>
        </div>
      ) : (
        <p>No master data available.</p>
      )}
    </div>
  );
}
