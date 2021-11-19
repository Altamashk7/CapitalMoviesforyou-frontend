import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import MovieList from "./Components/MovieList";
import PopMovieList from "./Components/PopMovieList";
import LatMovieList from "./Components/LatMovieList";
import FavMovieList from "./Components/FavMovieList";
import SearchMovieList from "./Components/SearchMovieList";
import ShowMovie from "./Components/ShowMovie";
import Error from "./Components/Error";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  setUser = (user) => {
    this.setState({
      user: localStorage.setItem("user", JSON.stringify(user)),
    });
  };
  // setUser = (user) => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // };

  render() {
    return (
      <BrowserRouter>
        <div className="div">
          <NavBar
            setUser={this.setUser}
            user={JSON.parse(localStorage.getItem("user"))}
          />
          <Switch>
            <Route exact path="/" component={MovieList} />
            <Route exact path="/discover/popular" component={PopMovieList} />
            <Route exact path="/discover/latest" component={LatMovieList} />
            <Route
              exact
              path="/discover/favourite"
              component={() => (
                <FavMovieList user={JSON.parse(localStorage.getItem("user"))} />
              )}
            />
            <Route exact path="/search/movie/:id" component={SearchMovieList} />
            <Route exact path="/show/movie/:id" component={ShowMovie} />
            <Route exact path="/user/signup" component={Signup} />
            <Route
              exact
              path="/user/login"
              component={() => <Login setUser={this.setUser} />}
            />
            <Route exact path="*" component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
