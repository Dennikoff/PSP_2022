import React from 'react';
import classes from './myInputContainer.module.css';
import MyInput from "../myInput/myInput";
import MyButton from "../myButton/myButton";
// import {startSearch} from "../../api/startSearch"

const MyInputContainer = ({query, setQuery, isLoading, setStartS}) => {
    function handleOkClick(isLoading) {
        if(isLoading) {
            alert("Поск уже запущен") // TODO: make alert more beautiful
        } else {
            setStartS(true)
        }
    }

    return (
        <div className={classes.query_container}>
            <div className={classes.query_input}>
                <MyInput type='text'
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         placeholder='Запрос'
                />
            </div>
            <div className={classes.query_button}>
                <MyButton children='Поиск'
                          onClick={() => handleOkClick(isLoading)}
                />
            </div>
        </div>
    )
        ;
};

export default MyInputContainer;