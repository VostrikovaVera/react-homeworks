import React from 'react';

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'x',
      list: [
        {
          title: 'One',
          isDone: false
        },
        {
          title: 'Two',
          isDone: false
        }
      ]
    };
  }

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  addItem() {
    // if (e.target.value === '') {
    //     this.setState({ inputValue: e.target.value });
    // }

    this.setState({
      list: [
        ...this.state.list,
        {
          title: this.state.inputValue,
          isDone: false
        }
      ]
    });
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

  render() {
    const { value, list } = this.state;

    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <button
          onClick={() => {
            this.addItem();
          }}
        >
          Add item
        </button>
        <ul>
          {list.map((item, i) => (
            <li
              className={item.isDone ? 'done' : null}
              key={i}
              onClick={() => {
                this.changeStatus(i);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
