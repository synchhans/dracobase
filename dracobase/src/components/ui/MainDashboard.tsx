import { MainDashoardProps } from "@/types/mainDashoardProps.types";
import SidebarDashboard from "./SidebarDashboard";
import { usePathname } from "next/navigation";

export default function MainDashboard({ user, contentMap }: MainDashoardProps) {
  const pathname = usePathname();

  const getContent = () => {
    return contentMap[pathname] || <div>Default Content</div>;
  };

  return (
    <div className="flex h-[calc(100vh-56px)]">
      <SidebarDashboard user={user} />
      <div className="flex-1 p-4">{getContent()}</div>
    </div>
  );
}
