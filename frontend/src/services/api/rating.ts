import {api} from '../http/axios';

export interface IRating {
    userId?: string;
    movieId: string;
    rating?: number;
}

class RatingData {
    async addRating(rating: IRating) {
        return api.post<IRating>('/ratings', rating);
    }

    async updateRating(rating: IRating){
        return api.put<IRating>("/ratings", rating)
    }

    async getRatingByMovieAndUserId(rating: IRating) {
        return api.get<IRating>(`/ratings/${rating.movieId}`);
    }
}

export default new RatingData();
