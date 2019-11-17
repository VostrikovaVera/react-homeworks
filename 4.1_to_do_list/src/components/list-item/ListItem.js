import React from 'react';
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
            this.props.onEditText('text', this.state.value, this.props.id);
        }
    };

    render() {
        const { item, onChangeStatus, onEditText, onDelete } = this.props;
        const { id, isDone } = item;

        return (
        <li className={`ToDo-item ${isDone ? 'done' : ''}`}
            onClick={() => { onChangeStatus('isDone', !isDone, id) }}
        >
            <input
                type="text"
                value={this.state.value}
                onChange={e => {this.handleChange(e)}}
                onBlur={() => {onEditText('text', this.state.value, id)}}
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

export default ListItem;
