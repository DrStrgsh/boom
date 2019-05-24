import { combineReducers } from 'redux';
import { posts } from './posts';
import { post } from './singlePost';
import { users } from './users';
import { feeds } from './feeds';
import { comments } from './commentsToPost';
import { user } from './currentUser';
import { reposts } from './reposts';

export default combineReducers({
    posts,
    post,
    users,
    user,
    feeds,
    comments,
    reposts
});
