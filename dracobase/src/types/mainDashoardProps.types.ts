import { JSX } from "react";
import { User } from "./user.types";

interface ContentMap {
  [key: string]: JSX.Element;
}

export interface MainDashoardProps {
  user: User;
  contentMap: ContentMap;
}
