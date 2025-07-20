import type { UserToken } from "../../types";
import {api} from "../http/axios"

export interface IUser {
    id?: string;
    username: string;
    email: string;
    password?: string; // Senha não deve ser retornada pela API
}

class UserData{
    register(data: IUser)
    {
        return api.post<IUser>('/users/register', data);
    }

    login(email: string, password: string) {
        return api.post<UserToken>('/users/login', { email, password });
    }

    me() {
        return api.get<IUser>('/users/me');
    }

    logout() {
        return api.post('/users/logout');
    }
}

export default new UserData();