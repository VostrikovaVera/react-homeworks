import React from 'react';

export class Button extends React.Component {
    render() {
        return <a className="Button" href={this.props.buttonUrl}> {this.props.buttonText} </a>;
    }
}

export default Button;