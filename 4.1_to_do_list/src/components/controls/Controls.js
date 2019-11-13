import React from 'react';
import './Controls.css';

export class Controls extends React.Component {
    render() {
        const {inputValue, onValueChange, onKeyDown, onAddItem} = this.props;

        return (
            <div className="ToDo-controls">
                <input
                    className="ToDo-input"
                    type="text"
                    value={inputValue}
                    onChange={e => {onValueChange(e)}}
                    onKeyDown={e => {onKeyDown(e)}}
                />
                <button
                    className="ToDo-btn"
                    onClick={() => {onAddItem()}}
                >
                    Add item
                </button>
            </div>
        );
    }
}

export default Controls;