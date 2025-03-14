"use client";

import useGuest from "@/hooks/useGuest";
import ErrorHandler from "../../../components/layout/ErrorHandler";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";
import HeaderLogin from "@/app/(auth)/login/components/HeaderLogin";
import ButtonLoginWith from "@/components/common/ButtonLoginWith";
import FooterLogin from "@/app/(auth)/login/components/FooterLogin";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";

export default function Login() {
  const {
    user,
    isLoading,
    error,
    handleUpdateUser,
    refetchUser,
    isProfileComplete,
  } = useGuest();
  const [showEditProfile, setShowEditProfile] = useState(false);

  const openPopup = (url: string) => {
    window.open(url, "_blank", "width=600,height=800");
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data === "AUTH_SUCCESS") {
        await refetchUser();
        setShowEditProfile(true);
      } else if (event.data === "REDIRECT_DASHBOARD") {
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (error) {
    return (
      <ErrorHandler message={error} onRetry={() => window.location.reload()} />
    );
  }

  if (isProfileComplete && window.location.pathname === "/login") {
    window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`;
    return <LoadingSpinner />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {showEditProfile ? (
        <LoginForm user={user!} handleUpdateUser={handleUpdateUser} />
      ) : (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <HeaderLogin />
          <ButtonLoginWith openPopup={openPopup} />
          <FooterLogin />
        </div>
      )}
    </div>
  );
}
