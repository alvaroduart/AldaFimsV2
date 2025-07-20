import { api } from "../http/axios"
import type { IUser } from "./users";

export interface IComment {
    id?: string;
    movieId: string;
    userId: string;
    user: IUser;
    userName: string;
    content: string;
    createdAt: Date;
}

class CommentData {
    get_comments_by_movie(movieId: string) {
        return api.get<IComment[]>(`/comments/movie/${movieId}`);
    }

    create_comment(movieId: string, content: string) {
        return api.post<IComment>(`/comments/`, { movieId, content });
    }

    delete_comment(commentId: string) {
        return api.delete(`/comments/`, { data: {id: commentId } });
    }

    update_comment(commentId: string, movieId: string, content: string) {
        return api.put(`/comments/`, {id:commentId, movieId, content });
    }

}

export default new CommentData();