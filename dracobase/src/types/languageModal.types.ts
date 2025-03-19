import { JSX } from "react";

export interface Language {
  name: string;
  icon: JSX.Element;
  description: string;
  categories: string[];
  link: string;
}
