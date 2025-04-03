import { ReactNode } from "react";
import { User } from "./user.types";

interface ContentMap {
  [key: string]: React.ComponentType<{ user: User }>;
}

export interface MainDashoardProps {
  user: User;
  contentMap: ContentMap;
}
