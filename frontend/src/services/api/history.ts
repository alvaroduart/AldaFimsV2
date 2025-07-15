import {api} from "../http/axios"

export interface History {
    id?: string;
    userId: string;
    movieId: string;
    createdAt?: Date;
}

class HistoryData {
    get_user_history(userId: string) {
        return api.get<History[]>(`/history/user/${userId}`);
    }

    add_to_history(userId: string, movieId: string) {
        return api.post<History>(`/history`, { userId, movieId });
    }

    remove_from_history(id: string) {
        return api.delete(`/history/${id}`);
    }
}

export default new HistoryData();