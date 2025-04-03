// LanguageContext.tsx
import { createContext, useState, ReactNode } from "react";
import { Language } from "@/types/language.types"; // Pastikan Anda sudah memiliki tipe Language

// Tipe untuk value yang akan disediakan oleh context
interface LanguageContextType {
  languages: Language[];
  setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}

// Buat context dengan nilai default
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Provider untuk context
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [languages, setLanguages] = useState<Language[]>([]); // State dengan tipe Language[]

  return (
    <LanguageContext.Provider value={{ languages, setLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};