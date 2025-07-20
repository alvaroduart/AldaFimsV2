import {api} from "../http/axios"

export interface IContact{
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

class ContactData {
    create_contact(contact: Omit<IContact, 'id' | 'createdAt'>) {
        return api.post<IContact>('/contact/', contact);
    }
}

export default new ContactData();