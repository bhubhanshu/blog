import * as ActionTypes from './ActionTypes';

export const Blogs = (state = {
        errMess: null,
        blogs: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_BLOGS:
            return {...state, isLoading: false, errMess: null, blogs: action.payload};

        case ActionTypes.BLOGS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, blogs: []};

        case ActionTypes.ADD_BLOG:
            var blog = action.payload;
            return {...state, comments: state.blogs.concat(blog)};

        default:
            return state;
    }
}