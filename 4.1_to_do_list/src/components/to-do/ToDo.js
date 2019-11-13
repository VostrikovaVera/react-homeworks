import React from 'react';
import axios from 'axios';
import { url as apiUrl } from '../../constants/Api';
import './ToDo.css';
import ListItem from '../list-item/ListItem';
import Controls from '../controls/Controls';

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      inputValue: '',
      list: []
    };
  }

  componentDidMount() {
    axios.get(apiUrl)
      .then(response => {
        this.setState({ list: response.data });
      })
      .catch(e => console.log(e));
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
      axios.post(`${apiUrl}`, {
        text: inputValue,
        isDone: false
      })
        .then((response) => {
          this.setState({
            list: [
              ...this.state.list,
              {
                text: inputValue,
                isDone: false,
                id: response.data.id
              }
            ]
          });
        });

      this.clearInput();
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.addItem();
    }
  }

  changeStatus({ id, isDone }) {
    axios.put(`${apiUrl}/${id}`, {
      isDone: !isDone
    }).then(() => {
      this.setState({
        list: this.state.list.map(item => {
          return {
            ...item,
            isDone: item.id === id ? !isDone : item.isDone
          };
        })
      });
    });
  }

  deleteItem(e, id) {
    e.stopPropagation();
    
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        this.setState({
          list: this.state.list.filter((item) => {
            return item.id !== id;
          })
        });
      })
  }

  render() {
    const { inputValue, list } = this.state;

    return (
      <div className="ToDo">
        <h1>Todo App</h1>
        <Controls inputValue={inputValue} onValueChange={this.handleChange} onKeyDown={this.onKeyDown} onAddItem={this.addItem}/>
        <ul className="ToDo-list">
          {list.map((item) => {
              return <ListItem key={item.id} item={item} onChangeStatus={this.changeStatus} onDelete={this.deleteItem} />;
          })}
        </ul>
      </div>
    );
  }
}
