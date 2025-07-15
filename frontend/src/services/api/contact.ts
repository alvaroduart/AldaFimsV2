import {api} from "../http/axios"

export interface Contact{
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

class ContactData {
    create_contact(contact: Omit<Contact, 'id' | 'createdAt'>) {
        return api.post<Contact>('/contacts', contact);
    }
}

export default new ContactData();