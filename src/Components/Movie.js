import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./Movie.css";
import { Link } from "react-router-dom";

export default class Movie extends Component {
  render() {
    console.log(this.props.rating);
    return (
      <div>
        <Card className="card movie">
          <Card.Img className="img" variant="top" src={this.props.img} />
          <Card.Body className="body">
            <Card.Title className="title">{this.props.title}</Card.Title>
            <Card.Title className="title">
              Rating: {this.props.rating}
            </Card.Title>
          </Card.Body>
          <Link to={`/show/movie/${this.props.id}`}>
            <Button className="btn" variant="outline-secondary" size="sm">
              Details
            </Button>
          </Link>
        </Card>
      </div>
    );
  }
}
