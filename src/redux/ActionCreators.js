import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (blogId, author, comment) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    const newComment = {
        blog: blogId,
        author: author,
        comment: comment,
        createdAt: Date.now()
    }

    return firestore.collection('comments').add(newComment)
    .then(docRef => {
        firestore.collection('comments').doc(docRef.id).get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    const _id = doc.id;
                    let comment = {_id, ...data};
                    dispatch(addComment(comment))
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    })
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })

}

export const fetchComments = () => (dispatch) => {
    return firestore.collection('comments').get()
        .then(snapshot => {
            let comments = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                comments.push({_id, ...data });
            });
            return comments;
        })
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addBlog = (blog) => ({
    type: ActionTypes.ADD_BLOG,
    payload: blog
});

export const postBlog = (title, author, content) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    const newBlog = {
        title: title,
        author: author,
        content: content,
        createdAt: Date.now()
    }
    return firestore.collection('blogs').add(newBlog)
    .then(docRef => {
        firestore.collection('blogs').doc(docRef.id).get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    const _id = doc.id;
                    let blog = {_id, ...data};
                    dispatch(addBlog(blog))
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    })
    .catch(error => { console.log('Post blogs ', error.message);
        alert('Your blog could not be posted\nError: '+ error.message); })

}
export const editBlog = (blogId, title, author, content) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    const newBlog = {
        title: title,
        author: author,
        content: content
    }
    return firestore.collection('blogs').doc(blogId).update(newBlog)
            .catch(error => { console.log('Edit blog ', error.message);
            alert('Your blog could not be edited\nError: '+ error.message); })
}

export const deleteBlog = (blogId) => (dispatch) => {
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    return firestore.collection('blogs').doc(blogId).delete()
            .catch(error => { console.log('Delete blog ', error.message);
            alert('Your blog could not be deleted\nError: '+ error.message); })
}

export const fetchBlogs = () => (dispatch) => {
    return firestore.collection('blogs').get()
        .then(snapshot => {
            let blogs = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                blogs.push({_id, ...data });
            });
            return blogs;
        })
        .then(blogs => dispatch(addBlogs(blogs)))
        .catch(error => dispatch(blogsFailed(error.message)));
}

export const blogsFailed = (errmess) => ({
    type: ActionTypes.BLOGS_FAILED,
    payload: errmess
});

export const addBlogs = (blogs) => ({
    type: ActionTypes.ADD_BLOGS,
    payload: blogs
});



export const postFeedback = (feedback) => (dispatch) => {
        
    return firestore.collection('feedback').add(feedback)
    .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!'); })
    .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(() => {
        var user = auth.currentUser;
        localStorage.setItem('user', JSON.stringify(user));
        // Dispatch the success action
        dispatch(receiveLogin(user));
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    auth.signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    localStorage.removeItem('user');
    dispatch(receiveLogout())
}
