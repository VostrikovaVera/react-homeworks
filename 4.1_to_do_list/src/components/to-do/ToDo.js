import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { url as apiUrl } from '../../constants/Api';
import './ToDo.scss';
import Container from '../container/Container';
import ListItem from '../list-item/ListItem';
import Controls from '../controls/Controls';

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      list: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.addItem = this.addItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.get(apiUrl);
      this.setState({ list: response.data })
    } catch(err) {
      console.log(err);
    }
  }

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  clearInput = () => {
    this.setState({ inputValue: '' });
  };

  async addItem() {
    const { inputValue } = this.state;

    if (inputValue === '' || inputValue.length < 2) {
      alert('Please, enter at least 2 characters');
    } else {
      try {
        const response = await axios.post(`${apiUrl}`, {
          text: inputValue,
          isDone: false
        });
        this.setState({
          list: [
            ...this.state.list,
            {
              text: inputValue,
              isDone: false,
              id: response.data.id
            }
          ]
        })
      } catch(err) {
        console.log(err);
      }

      this.clearInput();
    }
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.addItem();
    }
  };

  async changeItem (paramName, paramNewValue, id) {
    try {
      await axios.put(`${apiUrl}/${id}`, {
        [paramName]: paramNewValue
      });
      this.setState({
        list: this.state.list.map(item => {
          return {
            ...item,
            [paramName]: item.id === id ? paramNewValue : item.paramName
          };
        })
      })
    } catch(err) {
      console.log(err);
    }
  };

  async deleteItem (e, id) {
    e.stopPropagation();

    try {
      await axios.delete(`${apiUrl}/${id}`);
      this.setState({
        list: this.state.list.filter((item) => {
          return item.id !== id;
        })
      })
    } catch(err) {
      console.log(err);
    }
  };

  render() {
    const { inputValue, list } = this.state;

    return (
      <Container>
        <div className="ToDo">
          <h1>Todo App</h1>
          <Controls inputValue={inputValue} onValueChange={this.handleChange} onKeyDown={this.onKeyDown} onAddItem={this.addItem}/>
          <ul className="ToDo-list">
            {list.map((item) => {
              return <ListItem key={item.id} item={item} onChangeStatus={this.changeItem} onEditText={this.changeItem} onDelete={this.deleteItem} />;
            })}
          </ul>
        </div>
      </Container>
    );
  }
}

ToDo.propTypes = {
  inputValue: PropTypes.string,
  list: PropTypes.array
};