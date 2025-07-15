import {api} from "../http/axios"


export interface Movie {
    movieid: string;
    title: string;
    image: string;
    rating: number;    
    description: string;
    genre: string;
    duration: string;
    director: string;
    createdAt?: Date;
   
}

class MovieData {
    get_all_movies() {
        return api.get<Movie[]>('/movies');
    }

    get_movie_by_id(id: string) {
        return api.get<Movie>(`/movies/${id}`);
    }

    seach_movies(query: string) {
        return api.get<Movie[]>(`/movies/search`, {
            params: { query }
        });
    }
}

export default new MovieData();