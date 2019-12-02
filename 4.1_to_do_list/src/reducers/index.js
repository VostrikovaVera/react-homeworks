import { combineReducers } from "redux";
import { GET_TASKS, ADD_TASK, CHANGE_TASK, DELETE_TASK } from "../constants/action-types";

const initialState = {
    list: [],
    title: "Todo App"
};

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                list: action.payload
            };
        case ADD_TASK:
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
        case CHANGE_TASK:
            return {
                ...state,
                list: state.list.map(item => {
                    return {
                        ...item,
                        [action.payload.param]: item.id === action.payload.id ? action.payload.value : item.param
                    };
                })
            };
        case DELETE_TASK:
            return {
                ...state,
                list: state.list.filter((item) => {
                    return item.id !== action.payload;
                })
            };
        default:
            return state;
    }
}

export default combineReducers({ todo: todoReducer });