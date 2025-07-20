import { createContext } from "react";
import { apiContact } from "../services";
import type { Contact } from "../types";

interface ContactContextType {
    addContact: (name: string, email: string, message: string) => Promise<Contact>;
}

export const ContactContext = createContext<ContactContextType | undefined>({
    addContact: async () => ({} as Contact),
});

interface ContactProviderProps {
    children: React.ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
    const addContact = async (name: string, email: string, message: string): Promise<Contact> => {
        const result = await apiContact.create_contact({ name, email, message })

        if (result.status !== 200) {
            throw new Error('Failed to add contact');
        }
        return result.data;
    };

    return (
        <ContactContext.Provider value={{ addContact }}>
            {children}
        </ContactContext.Provider>
    );
}