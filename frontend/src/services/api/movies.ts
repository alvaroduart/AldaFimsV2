import {api} from "../http/axios"


export interface IMovie {
    id: string;
    title: string;
    image: string;
    rating: number;    
    description: string;
    genre: string;
    duration: string;
    director: string;
    createdAt?: Date;
    userRating?: number;
}

class MovieData {
    get_all_movies() {
        return api.get<IMovie[]>('/movies/');
    }

    get_movie_by_id(id: string) {
        return api.get<IMovie>(`/movies/${id}`);
    }

    seach_movies(query: string) {
        return api.get<IMovie[]>(`/movies/search/`, {
            params: { query }
        });
    }
}

export default new MovieData();