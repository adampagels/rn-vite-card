import type { ContactWithCard } from "@/types/contactWithCard";
import React, { createContext, ReactNode, useContext, useState } from "react";

type ContactsContextType = {
  selectedContact: ContactWithCard | null;
  setSelectedContact: React.Dispatch<
    React.SetStateAction<ContactWithCard | null>
  >;
};

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [selectedContact, setSelectedContact] =
    useState<ContactWithCard | null>(null);

  return (
    <ContactsContext.Provider value={{ selectedContact, setSelectedContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
}
