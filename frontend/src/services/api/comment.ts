import { api } from "../http/axios"

export interface Comment {
    id?: string;
    movieId: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: Date;
}

class CommentData {
    get_comments_by_movie(movieId: string) {
        return api.get<Comment[]>(`/comments/${movieId}`);
    }

    create_comment(movieId: string, content: string) {
        return api.post<Comment>(`/comments/${movieId}`, { content });
    }

    delete_comment(commentId: string) {
        return api.delete(`/comments/${commentId}`);
    }

    update_comment(commentId: string, content: string) {
        return api.put<Comment>(`/comments/${commentId}`, { content });
    }

}

export default new CommentData();