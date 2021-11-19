import React, { Component } from "react";
import axios from "axios";
import Movie from "./Movie";
import { Button, Carousel, Container } from "react-bootstrap";
import "./MovieList.css";

import "./NavBar.css";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      movies: [],
    };
  }

  async componentDidMount() {
    const fetchmovies = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${this.state.page}`
    );
    console.log(fetchmovies.data.results);
    this.setState({ movies: fetchmovies.data.results });
  }

  pPageHandler = async () => {
    let newPage = this.state.page - 1;
    const fetchmovies = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${newPage}`
    );
    this.setState({ movies: fetchmovies.data.results });
    this.setState({ page: newPage });
  };

  nPageHandler = async () => {
    let newPage = this.state.page + 1;
    const fetchmovies = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${newPage}`
    );
    this.setState({ movies: fetchmovies.data.results });
    this.setState({ page: newPage });
  };

  render() {
    let movielist = this.state.movies.map((movie) => {
      return (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.original_title}
          rating={movie.vote_average}
          img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        />
      );
    });

    const page = this.state.page;

    return (
      <div>
        <Carousel className="movielist">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/original/${this?.state?.movies[0]?.backdrop_path}`}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{this?.state?.movies[0]?.original_title}</h3>
              {/* <p>{this?.state?.movies[0]?.overview}</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/original/${this?.state?.movies[1]?.backdrop_path}`}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>{this?.state?.movies[1]?.original_title}</h3>
              {/* <p>{this?.state?.movies[1]?.overview}</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/original/${this?.state?.movies[2]?.backdrop_path}`}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>{this?.state?.movies[2]?.original_title}</h3>
              {/* <p>{this?.state?.movies[2]?.overview}</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Container>
          <h1 className="d-flex flex-row justify-content-center align-items-center">
            Trending movies
          </h1>
        </Container>
        <div className="movielist">{movielist}</div>
        <div className="d-flex flex-row justify-content-center align-items-center">
          {page > 1 ? (
            <Button onClick={this.pPageHandler} variant="secondary">
              &#8636;
            </Button>
          ) : null}
          <strong>&nbsp;&nbsp;{this.state.page}&nbsp;&nbsp;</strong>
          <Button onClick={this.nPageHandler} variant="secondary">
            &#8641;
          </Button>
        </div>
      </div>
    );
  }
}
