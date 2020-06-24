import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';

import {  Fade, Stagger } from 'react-animation-components';

function RenderBlog({blog}) {
        return(
            <div>
                <div className="mt-1 mb-5">
                    {blog.content}
                </div>
            </div>
        );
}

function RenderComments({comments, postComment, blogId}) {
    if (comments != null)
        return(
            <div className="container">
                <div className="row">
                    <h4>Comments</h4>
                </div>
                <div className="row my-4">
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in key={comment._id}>
                                        <blockquote className="blockquote">
                                            <p>{comment.comment}</p>
                                            <footer className="blockquote-footer">{comment.author},
                                            <cite title="Source Title">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.createdAt)))}</cite>
                                            </footer>
                                        </blockquote>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>
                </div>
                <div className="row my-4">
                <CommentForm blogId={blogId} postComment={postComment} />
                </div>
            </div>
        );
    else
        return(
            <div></div>
        );
}
class EditForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.editBlog(this.props.blog._id, values.title, values.author, values.content);
    }

    render() {
        return(
        <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Edit</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal} className="bg-success">Blog Details</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="author" md={2}>Author</Label>
                            <Col md={10}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Author"
                                    className="form-control"
                                    defaultValue={this.props.blog.author}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="title" md={2}>Title</Label>
                            <Col md={10}>
                                <Control.text model=".title" id="title" name="title"
                                    placeholder="Title"
                                    className="form-control"
                                    defaultValue={this.props.blog.title}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="content" md={2}>Content</Label>
                            <Col md={10}>
                            <Control.textarea model=".content" id="content"
                                        rows="10" className="form-control"
                                        defaultValue={this.props.blog.content} />
                            </Col>
                        </Row>
                        <Col md={{offset: "2"}}>
                            <Button type="submit" className="bg-primary">
                                Submit
                            </Button>
                        </Col>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        );
    }

}
class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.blogId, values.name, values.comment);
    }

    render() {
        return(
        <div>
            <Button outline onClick={this.toggleModal}> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal} className="bg-info">Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="name" md={2}>Name</Label>
                            <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Name"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={10}>
                            <Control.textarea model=".comment" id="comment"
                                        rows="6" className="form-control" />
                            </Col>
                        </Row>
                        <Col md={{offset: "2"}}>
                            <Button type="submit" className="bg-primary">
                                Submit
                            </Button>
                        </Col>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        );
    }

}

class BlogDetail extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        
        this.state = {
            back: false
        };
    }

    handleDelete() {
        this.props.deleteBlog(this.props.blog._id)
        .then(() => this.setState({back: true}))
        .then(() => window.location.reload(false))
    }

    render() {
        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            ); 
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.blog != null){
            if(this.state.back){
                return(<Redirect to="/" />);
            }       
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.blog.title}</BreadcrumbItem>
                        </Breadcrumb>
                        </div>
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <blockquote className="blockquote">
                                <h1>{this.props.blog.title}</h1>
                                <footer className="blockquote-footer ml-5">{this.props.blog.author},
                                <cite title="Source Title">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(this.props.blog.createdAt)))}</cite>
                                </footer>
                            </blockquote>
                        </div>
                        { this.props.auth.isAuthenticated ?
                        <div className="col-6 col-md-2">
                            <Button outline onClick={this.handleDelete}><span className="fa fa-times fa-lg"></span> Delete</Button>
                        </div> : null}
                        { this.props.auth.isAuthenticated ?
                        <div className="col-6 col-md-2">
                            <EditForm editBlog={this.props.editBlog} blog={this.props.blog}/>
                        </div> : null}
                        
                        <hr />
                    </div>
                    <div className="row">
                        <RenderBlog blog={this.props.blog} />
                        <RenderComments comments={this.props.comments}
                            postComment={this.props.postComment}
                            blogId={this.props.blog._id} />
                    </div>
                </div>
            );
        }
        else
            return(
                <div></div>
            );
    }
}

export default BlogDetail;