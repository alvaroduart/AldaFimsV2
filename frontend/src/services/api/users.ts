import {api} from "../http/axios"

export interface User {
    id?: string;
    username: string;
    email: string;
    password?: string; // Senha não deve ser retornada pela API
    favorites: string[];
    history: string[];

}

class UserData{
    register(data: User)
    {
        return api.post<User>('/users/register', data);
    }

    login(email: string, password: string) {
        return api.post<User>('/users/login', { email, password });
    }

    me() {
        return api.get<User>('/users/me');
    }

    logout() {
        return api.post('/users/logout');
    }
}

export default new UserData();