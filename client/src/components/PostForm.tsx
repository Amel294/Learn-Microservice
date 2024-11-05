import React, { useState } from 'react';
import axiosPosts from '../axios/axiosPosts';

interface PostFormProps {
    onPostCreated: (post: { id: string; title: string }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
    const [title, setTitle] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosPosts.post('/posts', { title });
            onPostCreated(response.data);
            setTitle('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Create Post</h2>
            <input
                type="text"
                className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
                Submit
            </button>
        </form>
    );
};

export default PostForm;
