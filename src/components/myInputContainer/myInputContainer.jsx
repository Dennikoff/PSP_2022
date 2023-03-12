import React from 'react';
import classes from './myInputContainer.module.css';
import MyInput from "../myInput/myInput";
import MyButton from "../myButton/myButton";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
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
                <span className="p-float-label" style={{"width": "100%"}}>
                    <InputText
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.code === 'Enter') {
                                handleOkClick(isLoading)
                            }
                        }}
                    />
                    <label htmlFor="query">Поисковой запрос</label>
                </span>
            </div>
                <Button label='Поиск'
                        onClick={() => handleOkClick(isLoading)}
                        className={classes.query_button}
                />
        </div>
    )
        ;
};

export default MyInputContainer;