import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Admin from './AdminComponent';
import Home from './HomeComponent';
import Blog from './BlogComponent';
import { postComment, postFeedback, fetchBlogs, fetchComments, postBlog, loginUser, logoutUser, editBlog, deleteBlog } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      blogs: state.blogs,
      comments: state.comments,
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (blogId, author, comment) => dispatch(postComment(blogId, author, comment)),
  postBlog: (title, author, content) => dispatch(postBlog(title, author, content)),
  editBlog: (blogId, title, author, content) => dispatch(editBlog(blogId, title, author, content)),
  deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
  fetchBlogs: () => {dispatch(fetchBlogs())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
});
class Main extends Component {
    componentDidMount() {
        this.props.fetchBlogs();
        this.props.fetchComments();
    }
    render() {

        const BlogWithId = ({match}) => {
            return(
                <Blog 
                auth={this.props.auth}
                blog={this.props.blogs.blogs.filter((blog) => blog._id === match.params.blogId)[0]}
                postComment={this.props.postComment}
                editBlog={this.props.editBlog}
                deleteBlog={this.props.deleteBlog}
                isLoading={this.props.blogs.isLoading}
                errMess={this.props.blogs.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.blog === match.params.blogId)}/>
            );
          }

        return(
            <div>
                <Header auth={this.props.auth} logoutUser={this.props.logoutUser}/> 
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={() => <Home blogs={this.props.blogs} auth={this.props.auth} postBlog={this.props.postBlog}/>} />
                            <Route path="/blog/:blogId" component={BlogWithId} />
                            <Route exact path='/aboutme' component={() => <About />} />
                            <Route exact path="/admin" component={() => <Admin auth={this.props.auth} loginUser={this.props.loginUser}/> } />
                            <Route exact path="/contactme" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
