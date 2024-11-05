import React, { useState } from 'react';
import axiosComments from '../axios/axiosComments';

interface CommentFormProps {
    postId: string;
    onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosComments.post(`/posts/${postId}/comments`, { content });
            setContent('');
            onCommentAdded();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="text"
                className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                type="submit"
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none"
            >
                Submit
            </button>
        </form>
    );
};

export default CommentForm;
