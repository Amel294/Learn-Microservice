import React from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const App: React.FC = () => {
    return (
        <div>
            <hr />
            <PostList />
        </div>
    );
};

export default App;
