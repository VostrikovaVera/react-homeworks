import axios from "axios";
import { GET_TASKS, ADD_TASK, CHANGE_TASK, DELETE_TASK } from "../constants/action-types";
import {url as apiUrl} from '../constants/Api';

export const getTasks = () => {
    return async (dispatch) => {
        const {data} = await axios.get(apiUrl);
        dispatch({type: GET_TASKS, payload: data});
    };
};

export const addTask = inputValue => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${apiUrl}`, {
                text: inputValue,
                isDone: false
            });
            dispatch({
                type: ADD_TASK,
                payload: {
                    text: inputValue,
                    isDone: false,
                    id: response.data.id
                }
            })
        } catch (err) {
            console.log(err);
        }
    };
};

export const changeTask = ({param, value, id}) => {
    return async (dispatch) => {
        try {
            await axios.put(`${apiUrl}/${id}`, {
                [param]: value
            });
            dispatch({
                type: CHANGE_TASK,
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
};

export const deleteTask = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (err) {
            console.log(err);
        }
    };
};
