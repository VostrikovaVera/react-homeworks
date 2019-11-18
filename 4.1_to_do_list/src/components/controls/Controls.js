import React from 'react';
import PropTypes from 'prop-types';
import './Controls.scss';

const Controls = ({inputValue, onValueChange, onKeyDown, onAddItem}) => {
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
    )
};

Controls.propTypes = {
    inputValue: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired
};

export default Controls;