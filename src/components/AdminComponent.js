import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'; 

class Admin extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(event) {
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }
    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        if(this.props.auth.isAuthenticated){
            return(<Redirect to='/home' />);
        }
        return(
            <div className="container my-5">
                { this.props.auth.errMess ? <div className="row justify-content-center text-danger">
                        Invalid Username or Password
                    </div> : null}
                <div className="row py-5 justify-content-center">
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                innerRef={(input) => this.username = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                                innerRef={(input) => this.password = input}  />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </div>
            </div>

        );
    }
}

export default Admin;