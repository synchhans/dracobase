import { ButtonLoginWithProps } from "@/types/buttonLoginWith.types";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";


export default function ButtonLoginWith({ openPopup }: ButtonLoginWithProps) {
  return (
    <div className="space-y-4">
      {/* Google */}
      <button
        onClick={() => openPopup("http://localhost:5000/api/auth/google")}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        Sign in with Google
      </button>

      {/* GitHub */}
      <button
        onClick={() => openPopup("http://localhost:5000/api/auth/github")}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer"
      >
        <BsGithub className="w-6 h-6 mr-2" />
        Sign in with GitHub
      </button>
    </div>
  );
}
