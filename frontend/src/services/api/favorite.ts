import {api} from "../http/axios"

export interface Favorite {
    id?: string;
    userId: string;
    movieId: string;
    createdAt?: Date;
}

class FavoriteData {
    get_user_favorites(userId: string) {
        return api.get<Favorite[]>(`/favorites/user/${userId}`);
    }

    add_to_favorite(userId: string, movieId: string) {
        return api.post<Favorite>(`/favorites`, { userId, movieId });
    }

    remove_favorites(id: string) {
        return api.delete(`/favorites/${id}`);
    }
}

export default new FavoriteData();