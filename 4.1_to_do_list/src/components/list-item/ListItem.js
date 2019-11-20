import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.scss';

export class ListItem extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: props.item.text
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onEditText({param: 'text', value: this.state.value, id: this.props.id});
        }
    };

    render() {
        const { item, onChange, onEditText, onDelete } = this.props;
        const { id, isDone } = item;

        return (
        <li className={`ToDo-item ${isDone ? 'done' : ''}`}
            onClick={() => { onChange('isDone', !isDone, id) }}
        >
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                onBlur={() => {onEditText({param: 'text', value: this.state.value, id})}}
                onKeyDown={this.handleKeyDown}
            />
          <span
              className="ToDo-delete-item"
              onClick={e => {onDelete(e, id)}}
          >
              {''}
          </span>
        </li>
        );
    }
}

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onEditText: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ListItem;
