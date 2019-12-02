import React, {useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import './ToDo.scss';
import Container from '../container/Container';
import Controls from '../controls/Controls';
import ListItem from '../list-item/ListItem';
import { getTasks, addTask, changeTask, deleteTask } from '../../actions/todo.actions';
import {connect} from 'react-redux';

const initialStore = {
    list: [],
    inputValue: ""
};

function reducer(state, action) {
    switch (action.type) {
        case "HANDLE_INPUT_CHANGE":
            return {
                ...state,
                inputValue: action.payload
            };
        default:
            throw new Error();
    }
}

const ToDo = ({list, getTasks, addTask, changeTask, deleteTask}) => {
    const [store, dispatch] = useReducer(reducer, initialStore);

    const fetchData = () => {
       getTasks();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = e => {
        dispatch({
            type: 'HANDLE_INPUT_CHANGE',
            payload: e.target.value
        });
    };

    const addItem = () => {
        const {inputValue} = store;

        if (inputValue === '' || inputValue.length < 2) {
            alert('Please, enter at least 2 characters');
        } else {
            addTask(inputValue);
            dispatch({
                type: 'HANDLE_INPUT_CHANGE',
                payload: ''
            });
        }
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            addItem();
        }
    };

    const changeItem = (newTask) => {
        changeTask(newTask);
    };

    const deleteItem = (e, id) => {
        e.stopPropagation();
        deleteTask(id);
    };

    const {inputValue} = store;

    return (
        <Container>
            <div className="ToDo">
                <h1>Todo App</h1>
                <Controls inputValue={inputValue} onValueChange={handleChange} onKeyDown={onKeyDown}
                          onAddItem={addItem}></Controls>
                <ul className="ToDo-list">
                    {list.map((item) => {
                        return <ListItem key={item.id} item={item} onChange={changeItem} onEditText={changeItem}
                         onDelete={deleteItem}></ListItem>;
                    })}
                </ul>
            </div> </Container>
       
    );
};

ToDo.propTypes = {
    inputValue: PropTypes.string,
    list: PropTypes.array
};

const mapStateToProps = state => {
    return {
        list: state.todo.list
    };
};

const mapDispatchToProps = {
    getTasks,
    addTask,
    changeTask,
    deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);