import React from 'react';
import Button from './Button';

export class Card extends React.Component {
  render() {
    return (
      <div className="Card">
        <img className="Card-img" src={this.props.imgSrc} alt="card-image" />
        <div className="Card-content">
          <h2 className="Card-title"> {this.props.title} </h2>
          <p className="Card-text"> {this.props.text} </p>
          <Button
            buttonUrl={this.props.buttonUrl}
            buttonText={this.props.buttonText}
          />
        </div>
      </div>
    );
  }
}

export default Card;
