import { createContext, useState, useContext, type ReactNode } from "react";

// Define the shape of the context data
interface CalDialogContextType {
  isOpen: boolean;
  toggleDialog: () => void;
}

const CalDialogContext = createContext<CalDialogContextType | undefined>(
  undefined
);

export function CalDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen((prev) => !prev);

  const value = { isOpen, toggleDialog };

  return (
    <CalDialogContext.Provider value={value}>
      {children}
    </CalDialogContext.Provider>
  );
}

export function useCalDialog() {
  const context = useContext(CalDialogContext);
  if (context === undefined) {
    throw new Error("useCalDialog must be used within a CalDialogProvider");
  }
  return context;
}
