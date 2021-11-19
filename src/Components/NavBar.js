import React, { Component } from "react";
import { Redirect } from "react-router";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  logoutHandler = () => {
    localStorage.clear();
    this.props.setUser(null);
    return <Redirect to="/" />;
  };

  render() {
    let userLinks;
    if (this.props.user) {
      userLinks = (
        <Button
          style={{ color: "white" }}
          className="link"
          variant="outline-success"
          to="/"
          onClick={this.logoutHandler}
        >
          Logout
        </Button>
      );
    } else {
      userLinks = (
        <div className="d-flex flex-row align-items-center">
          <Link
            to="/user/signup"
            className="btn btn-primary"
            variant="outline-success"
          >
            Sign up
          </Link>

          <Link
            to="/user/login"
            className="btn btn-primary"
            variant="outline-success"
          >
            Login
          </Link>
        </div>
      );
    }

    return (
      <Navbar className="color-nav" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link style={{ color: "white" }} className="link" to="/">
                Capital Movies
              </Link>

              <Link className="link" to="/discover/popular">
                Popular
              </Link>
              <Link className="link" to="/discover/latest">
                Latest
              </Link>
              {this.props.user ? (
                <Link className="link" to="/discover/favourite">
                  Favourites
                </Link>
              ) : null}
            </Nav>
            <Form className="d-flex justify-content-center align-items-center">
              <FormControl
                type="search"
                name="search"
                placeholder="Search movie"
                className="mr-2"
                aria-label="Search"
                onChange={this.changeHandler}
              />
              <Link to={`/search/movie/${this.state.search}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Link>
            </Form>
            <Nav style={{ color: "white" }} className="ml-auto">
              {userLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
