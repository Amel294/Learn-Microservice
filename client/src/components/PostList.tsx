import React, { useEffect, useState } from 'react';
import CommentList from './CommentList';
import axiosPosts from '../axios/axiosPosts';
import axiosComments from '../axios/axiosComments';
import CommentForm from './CommentForm';
import PostForm from './PostForm';

interface Post {
    id: string;
    title: string;
}

interface Comment {
    id: string;
    content: string;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Record<string, Post>>({});
    const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosPosts.get<Record<string, Post>>('/posts');
                setPosts(response.data);

                for (const postId in response.data) {
                    await fetchComments(postId);
                }
            } catch (error) {
                console.error('Error fetching posts or comments:', error);
            }
        };

        fetchPosts();
    }, []);

    const fetchComments = async (postId: string) => {
        try {
            const response = await axiosComments.get<Comment[]>(`/posts/${postId}/comments`);
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: response.data,
            }));
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handlePostCreated = (newPost: Post) => {
        setPosts((prevPosts) => ({
            [newPost.id]: newPost,
            ...prevPosts,
        }));
        setComments((prevComments) => ({
            [newPost.id]: [],
            ...prevComments,
        }));
    };

    const handleCommentAdded = (postId: string) => {
        fetchComments(postId);
    };

    return (
        <div className="container mx-auto p-4">
            <PostForm onPostCreated={handlePostCreated} />
            <div
                className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                style={{ gridAutoRows: 'minmax(100px, auto)' }}
            >
                {Object.values(posts).map((post) => (
                    <div key={post.id} className="border border-gray-300 rounded-lg shadow-md p-4 break-inside-avoid">
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <CommentList postId={post.id} comments={comments[post.id] || []} />
                        <CommentForm postId={post.id} onCommentAdded={() => handleCommentAdded(post.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
