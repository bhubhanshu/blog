import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return(
        <div className="footer mt-5">
            <div className="container">
                <div className="row justify-content-center">             
                    <div className="col-5 col-sm-3">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to='/home'>Home</Link></li>
                            <li><Link to='/aboutme'>About Me</Link></li>
                            <li><Link to='/contactme'>Contact Me</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Contact</h5>
                        <ul className="list-unstyled">
                            <li><a className="fa fa-phone" href="tel:9131040692">  9131040692</a></li>
                            <li><a className="fa fa-envelope" href="mailto:f20170951@goa.bits-pilani.ac.in">  f20170951@goa.bits-pilani.ac.in</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="text-center">
                            <h5>Socials</h5>
                            <a className="btn btn-social-icon btn-facebook" href="https://www.facebook.com/bhubhanshu.gurjar"><i className="fa fa-facebook"></i></a> &nbsp;
                            <a className="btn btn-social-icon btn-linkedin" href="https://www.linkedin.com/in/bhubhanshu/"><i className="fa fa-linkedin"></i></a> &nbsp;
                            <a className="btn btn-social-icon btn-github" href="https://www.github.com/bhubhanshu/"><i className="fa fa-github"></i></a> &nbsp;
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <h5>© Copyright 2020 Bhubhanshu Gurjar</h5>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <h5>Built using ReactJS</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;