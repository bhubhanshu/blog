import React, { Component } from 'react';
import { Label, Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { Fade, Stagger } from 'react-animation-components';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'

class RenderBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMouseInside: false
        }
    }
    mouseEnter = () => {
        this.setState({ isMouseInside: true });
    }
    mouseLeave = () => {
    this.setState({ isMouseInside: false });
    }
    render(){
        return (
            <div>
                <div className="line"></div>
                <Link to={`/blog/${this.props.blog._id}`} >
                    <div className="container" id="box" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                        {this.state.isMouseInside ? <div id="button">
                            <i className="fa fa-arrow-right"></i>
                        </div> : null}
                        <div className="row mx-4 my-2" id="inbox1">
                            <blockquote className="blockquote">
                                <h1>{this.props.blog.title}</h1>
                                <footer className="blockquote-footer">{this.props.blog.author},
                                <cite title="Source Title">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(this.props.blog.createdAt))}</cite>
                                </footer>
                            </blockquote>
                        </div>
                        <div className="row mx-4 mb-5 pb-5" id="inbox2">
                            {this.props.blog.content}
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

class BlogForm extends Component {

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
        this.props.postBlog(values.title, values.author, values.content)
        .then(() => window.location.reload(false))
    }

    render() {

        return(
        <div>
            <Button outline onClick={this.toggleModal}> Post A Blog</Button>
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
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="title" md={2}>Title</Label>
                            <Col md={10}>
                                <Control.text model=".title" id="title" name="title"
                                    placeholder="Title"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="content" md={2}>Content</Label>
                            <Col md={10}>
                            <Control.textarea model=".content" id="content"
                                        rows="10" className="form-control" />
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

class BlogList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showScroll: false
        };
    }
    
    render() {
        const scrollTop = () =>{
            window.scrollTo({top: 0, behavior: 'smooth'});
        };
        const checkScrollTop = () => {
            if (!this.state.showScroll && window.pageYOffset > 400){
              this.setState({
                  showScroll: true
              });
            } else if (this.state.showScroll && window.pageYOffset <= 400){
                this.setState({
                    showScroll: false
                });
            }
          };
        window.addEventListener('scroll', checkScrollTop);
          
        const sorted = this.props.blogs.blogs.slice().sort((a, b) => b.createdAt - a.createdAt);
        console.log(sorted);
        const blogs = sorted.map((blog) => {
            return (
                <Fade in key={blog._id}>
                    <div className="col-12 mt-2">
                            <RenderBlog blog={blog} />
                    </div>
                </Fade>
            );
        });

        if (this.props.blogs.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.blogs.errMess) {
            return(
                <div className="col-12"> 
                    <h4>{this.props.blogs.errMess}</h4>
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <div className="row my-4">
                        <div className="col-7">
                            <h1>Recent Blogs</h1>
                        </div>
                        <div className="col-5">
                            { this.props.auth.isAuthenticated ?
                            <BlogForm postBlog={this.props.postBlog} /> : null}
                        </div>
                    </div>
                    <Stagger in>
                        {blogs}
                    </Stagger>
                    <i className="fa fa-arrow-up scrollTop" onClick={scrollTop} style={{height: 40, display: this.state.showScroll ? 'flex' : 'none'}}></i>
                </div>
            );
        }
    }
}

export default BlogList;