import React from 'react';
import './ListItem.css';

export class ListItem extends React.Component {
    render() {
        const { item, onChangeStatus, onDelete } = this.props;

        return (
        <li className={`ToDo-item ${item.isDone ? 'done' : ''}`}
            onClick={() => {
                onChangeStatus(item);
              }}
        >
            {item.text}
              <span
                  className="ToDo-delete-item"
                  onClick={e => {onDelete(e, item.id)}}
              >{''}</span>
        </li>
        );
    }
}

export default ListItem;
