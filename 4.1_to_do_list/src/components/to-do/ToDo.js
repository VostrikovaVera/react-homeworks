import React, {useEffect, useReducer} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {url as apiUrl} from '../../constants/Api';
import './ToDo.scss';
import Container from '../container/Container';
import ListItem from '../list-item/ListItem';
import Controls from '../controls/Controls';
import ScrollStatus from '../scroll-status/ScrollStatus';
import StickyNav from '../sticky-nav/StickyNav';

const initialStore = {
    list: [],
    inputValue: ""
};

function reducer(state, action) {
    switch (action.type) {
        case "GET_TASKS":
            return {
                ...state,
                list: action.payload
            };
        case "ADD_ITEM":
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        text: action.payload.text,
                        isDone: action.payload.isDone,
                        id: action.payload.id
                    }
                ]
            };
        case "SET_INPUT_VALUE":
            return {
                ...state,
                inputValue: action.payload
            };
        case "CHANGE_ITEM":
            return {
                ...state,
                list: state.list.map(item => {
                    return {
                        ...item,
                        [action.payload.param]: item.id === action.payload.id ? action.payload.value : item.param
                    };
                })
            };
        case "DELETE_ITEM":
            return {
                ...state,
                list: state.list.filter((item) => {
                    return item.id !== action.payload;
                })
            };

        default:
            throw new Error();
    }
}

const ToDo = () => {
    const [store, dispatch] = useReducer(reducer, initialStore);

    const fetchData = async() => {
        const {data} = await axios.get(apiUrl);

        dispatch({type: "GET_TASKS", payload: data});
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = e => {
        dispatch({
            type: 'SET_INPUT_VALUE',
            payload: e.target.value
        });
    };

    const clearInput = () => {
        dispatch({
            type: 'SET_INPUT_VALUE',
            payload: ''
        });
    };

    const addItem = async() => {
        const {inputValue} = store;

        if (inputValue === '' || inputValue.length < 2) {
            alert('Please, enter at least 2 characters');
        } else {
            try {
                const response = await axios.post(`${apiUrl}`, {
                    text: inputValue,
                    isDone: false
                });
                dispatch({
                    type: 'ADD_ITEM',
                    payload: {
                        text: inputValue,
                        isDone: false,
                        id: response.data.id
                    }
                })
            } catch (err) {
                console.log(err);
            }

            clearInput();
        }
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            addItem();
        }
    };

    const changeItem = async({param, value, id}) => {
        try {
            await axios.put(`${apiUrl}/${id}`, {
                [param]: value
            });
            dispatch({
                type: 'CHANGE_ITEM',
                payload: {
                    param: param,
                    value: value,
                    id: id
                }
            })
        } catch (err) {
            console.log(err);
        }
    };

    const deleteItem = async(e, id) => {
        e.stopPropagation();

        try {
            await axios.delete(`${apiUrl}/${id}`);
            dispatch({
                type: 'DELETE_ITEM',
                payload: id
            })
        } catch (err) {
            console.log(err);
        }
    };

    const {inputValue, list} = store;

    return (
        <Container>
            <ScrollStatus></ScrollStatus>
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
            </div>
            <StickyNav>
                <div className="navigation">
                    Sticky Navigation
                    <a href="#">Link</a>
                    <a href="#">Other Link</a>
                    <a href="#">One More Link</a>
                </div>
            </StickyNav>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                id est laborum.
            </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                id est laborum.
            </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                id est laborum.
            </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                id est laborum.
            </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                id est laborum.
            </div>
        </Container>
    );
};

ToDo.propTypes = {
    inputValue: PropTypes.string,
    list: PropTypes.array
};

export default ToDo;