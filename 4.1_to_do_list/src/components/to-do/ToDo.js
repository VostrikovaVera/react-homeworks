import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { url as apiUrl } from '../../constants/Api';
import './ToDo.scss';
import ListItem from '../list-item/ListItem';
import Controls from '../controls/Controls';

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      list: []
    };

    //this.changeItem = this.changeItem.bind(this);
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

  clearInput = () => {
    this.setState({ inputValue: '' });
  };

  addItem = () => {
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
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.addItem();
    }
  };

  changeItem = (paramName, paramNewValue, id) => {
    /*axios.put(`${apiUrl}/${id}`, {
      [paramName]: paramNewValue
    }).then(() => {
      this.setState({
        list: this.state.list.map(item => {
          return {
            ...item,
            [paramName]: item.id === id ? paramNewValue : item.paramName
          };
        })
      });
    });*/
  };

  /*async changeItem (paramName, paramNewValue, id) {
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
      });
    } catch(err) {
      console.log(err);
    }
  };*/

  deleteItem = (e, id) => {
    e.stopPropagation();
    
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        this.setState({
          list: this.state.list.filter((item) => {
            return item.id !== id;
          })
        });
      })
  };

  render() {
    const { inputValue, list } = this.state;

    return (
      <div className="ToDo">
        <h1>Todo App</h1>
        <Controls inputValue={inputValue} onValueChange={this.handleChange} onKeyDown={this.onKeyDown} onAddItem={this.addItem}/>
        <ul className="ToDo-list">
          {list.map((item) => {
              return <ListItem key={item.id} item={item} onChangeStatus={this.changeItem} onEditText={this.changeItem} onDelete={this.deleteItem} />;
          })}
        </ul>
      </div>
    );
  }
}

ToDo.propTypes = {
  inputValue: PropTypes.string,
  list: PropTypes.array,
  onValueChange: PropTypes.func
};