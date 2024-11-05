import React from 'react';

interface Comment {
    id: string;
    content: string;
}

interface CommentListProps {
    postId: string;
    comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div className="mt-4">
            <h4 className="text-lg font-semibold">Comments:</h4>
            <ul className="mt-2 space-y-1">
                {comments.length > 0 ? (
                    // Reverse the comments array to show the latest comment on top
                    [...comments].reverse().map((comment) => (
                        <li key={comment.id} className="border-b border-gray-200 py-2">
                            {comment.content}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No comments yet.</li>
                )}
            </ul>
        </div>
    );
};

export default CommentList;
