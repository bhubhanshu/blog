import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, Progress } from 'reactstrap';


function About() {
    return(
        <div className="container mb-5">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Me</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Me</h3>
                    <hr />
                    <p>Currently pursuing B.E. Computer Science, I am a 3rd year student at BITS Pilani, KK Birla Goa Campus
                        . <br></br>My Home Town is Bhopal, Madhya Pradesh.<br></br>
                        An average-skilled Competitive Programmer, I have started to gain interest in Web Developement.<br></br>
                        Keen interest in listening to instrumental music, also looking forward to produce some in future.<br></br>
                        To know more about me, visit my personal portfolio website <a href="https://bhubhanshu.github.io/">here</a>.
                    </p>
                </div>
            </div>
            <hr />
            <div className="row">
                <Card>
                    <CardHeader className="bg-success text-white">Skills</CardHeader>
                    <CardBody>
                        <dl className="row p-1">
                            <dt className="col-4 my-2">Web Development</dt>
                            <dd className="col-8 my-2"><Progress animated color="success" value="70" /></dd>
                            <dt className="col-4 my-2">Competitive Coding</dt>
                            <dd className="col-8 my-2"><Progress animated color="danger" value="50" /></dd>
                            <dt className="col-4 my-2">Machine Learning</dt>
                            <dd className="col-8 my-2"><Progress animated color="warning" value="10" /></dd>
                        </dl>
                    </CardBody>
                </Card>
            </div>
            <hr />
            <div className="row">
                <Card>
                    <CardHeader className="bg-info text-white">Languages</CardHeader>
                    <CardBody>
                        <dl className="row p-1">
                            <dt className="col-4 my-2">C++</dt>
                            <dd className="col-8 my-2"><Progress animated color="success" value="80" /></dd>
                            <dt className="col-4 my-2">Python3</dt>
                            <dd className="col-8 my-2"><Progress animated color="danger" value="50" /></dd>
                            <dt className="col-4 my-2">PhP</dt>
                            <dd className="col-8 my-2"><Progress animated color="primary" value="50" /></dd>
                            <dt className="col-4 my-2">JS</dt>
                            <dd className="col-8 my-2"><Progress animated color="info" value="70" /></dd>
                            <dt className="col-4 my-2">HTML, CSS</dt>
                            <dd className="col-8 my-2"><Progress animated color="warning" value="90" /></dd>
                            <dt className="col-4 my-2">SQL, NoSQL</dt>
                            <dd className="col-8 my-2"><Progress animated color="dark" value="80" /></dd>
                        </dl>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
export default About;    