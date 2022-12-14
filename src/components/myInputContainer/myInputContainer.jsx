import React from 'react';
import classes from './myInputContainer.module.css';
import MyInput from "../myInput/myInput";
import MyButton from "../myButton/myButton";
// import {startSearch} from "../../api/startSearch"

const MyInputContainer = ({query, setQuery, fetch, isLoading, setStartS}) => {
    function handleOkClick(isLoading) {
        if(isLoading) {
            alert("Поск уже запущен") // TODO: make alert more beautiful
        } else {
            setStartS(true)
            fetch(true)
        }
    }

    return (
        <div className={classes.query_container}>
            <div className={classes.query_input}>
                <MyInput type='text'
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         onKeyDown={(e) => {
                             if(e.keyCode === 13) {
                                 handleOkClick(isLoading)
                             }
                         }}
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