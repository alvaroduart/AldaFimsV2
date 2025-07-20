import {api} from "../http/axios"
import type { IMovie } from "./movies";

export interface IFavorite {
    id?: string;
    userId: string;
    movieId: string;
    createdAt?: Date;
    movie: IMovie
}

class FavoriteData {
    get_user_favorites() {
        return api.get<IFavorite[]>(`/favorites/`);
    }

    add_to_favorite(movieId: string) {
        return api.post<IFavorite>(`/favorites/`, { movieId });
    }

    remove_favorites(movieId: string) {
        return api.delete(`/favorites/`, { data: { movieId } });
    }
}

export default new FavoriteData();