import React from 'react';

export class ButtonC extends React.Component {
    render() {
        return <a href={this.props.url} style={{ color: this.props.color }}> {this.props.name} </a>;
    }
}

export function ButtonF(props) {
    return <a href={props.url} style={{ color: props.color }}> {props.name} </a>;
}