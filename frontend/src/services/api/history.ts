import {api} from "../http/axios"
import type { IMovie } from "./movies";

export interface IHistory {
    movie: IMovie;
    userId: string;
}

class HistoryData {
    get_user_history() {
        return api.get<IHistory[]>(`/history/`);
    }

    add_to_history( movieId: string) {
        return api.post<IHistory>(`/history/`, { movieId });
    }

    remove_from_history(movieId: string) {
        return api.delete(`/history/`, {data: { movieId }});
    }
}

export default new HistoryData();