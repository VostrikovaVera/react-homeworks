import React from 'react';

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: [
        {
          title: 'Make coffee',
          isDone: false
        },
        {
          title: 'Learn React',
          isDone: false
        }
      ]
    };
  }

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  clearInput() {
    this.setState({ inputValue: '' });
  }

  addItem() {
    const { inputValue } = this.state;

    if (inputValue === '' || inputValue.length < 2) {
      alert('Please, enter at least 2 characters');
    } else {
      this.setState({
        list: [
          ...this.state.list,
          {
            title: inputValue,
            isDone: false
          }
        ]
      });

      this.clearInput();
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.addItem();
    }
  }

  changeStatus(index) {
    this.setState({
      list: this.state.list.map((item, i) => {
        return {
          ...item,
          isDone: i === index ? (item.isDone = !item.isDone) : item.isDone
        };
      })
    });
  }

  deleteItem(e, index) {
    e.stopPropagation();

    this.setState({
      list: this.state.list.filter((item, i) => {
        return i !== index;
      })
    });
  }

  render() {
    const { inputValue, list } = this.state;

    return (
      <div className="ToDo">
        <h1>Todo App</h1>
        <div className="ToDo-input-wrap">
          <input
            className="ToDo-input"
            type="text"
            value={inputValue}
            onChange={this.handleChange}
            onKeyDown={e => {
              this.onKeyDown(e);
            }}
          />
          <button
            className="ToDo-btn"
            onClick={() => {
              this.addItem();
            }}
          >
            {' '}
            Add item
          </button>
        </div>
        <ul className="ToDo-list">
          {list.map((item, i) => (
            <li
              className={`ToDo-item ${item.isDone ? 'done' : ''}`}
              key={i}
              onClick={() => {
                this.changeStatus(i);
              }}
            >
              {item.title}
              <span
                className="ToDo-delete-item"
                onClick={e => {
                  this.deleteItem(e, i);
                }}
              ></span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
