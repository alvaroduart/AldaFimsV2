import React, { createContext } from "react";
import type { Comment } from "../types";
import { apiComment } from "../services";

interface CommentsContextType {
    addComment: (movieId:string, comment:string) => Promise<void>;
    deleteComment: (id: string) => Promise<void>;
    getCommentsByMovieId: (movieId: string) => Promise<Comment[]>;
    updateComment: (id: string, movieId:string, content:string) => Promise<Comment>;
}

export const CommentsContext = createContext<CommentsContextType | undefined>({
    addComment: async () => {},
    deleteComment: async () => {},
    getCommentsByMovieId: async () => [],
    updateComment: async () => {
        return {} as Comment;
    },
});

interface CommentsProviderProps {
    children: React.ReactNode;
}

export const CommentsProvider: React.FC<CommentsProviderProps> = ({ children }) => {
    
    const addComment = async (filmeId:string, comment: string): Promise<void> => {
        const result = await apiComment.create_comment(filmeId, comment);
        if (result.status !== 200) {
            throw new Error('Failed to add comment');
        }
    }

    const deleteComment = async (id: string): Promise<void> => {
        const result = await apiComment.delete_comment(id);
        if (result.status !== 204) {
            throw new Error('Failed to delete comment');
        }
    }

    const getCommentsByMovieId = async (movieId: string): Promise<Comment[]> => {
        const result = await apiComment.get_comments_by_movie(movieId);
        if (result.status !== 200) {
            throw new Error('Failed to fetch comments');
        }
        return result.data;
    }

    const updateComment = async (id: string, movieId:string, content:string): Promise<Comment> => {
        const result = await apiComment.update_comment(id, movieId, content);
        if (result.status !== 200) {
            throw new Error('Failed to update comment');
        }
        if (!result.data) {
            throw new Error('Comment not found');
        }
        return result.data;
    }

    return (
        <CommentsContext.Provider value={{ addComment, deleteComment, getCommentsByMovieId, updateComment }}>
            {children}
        </CommentsContext.Provider>
    );
};  
