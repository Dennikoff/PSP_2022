import React, { useRef } from 'react';
import classes from './myInputContainer.module.css';
import MyInput from "../myInput/myInput";
import MyButton from "../myButton/myButton";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import {startSearch} from "../../api/startSearch"
import { Toast } from 'primereact/toast';
const MyInputContainer = ({query, setQuery, fetch, isLoading, setStartS, sites}) => {
    const toast = useRef(null);
    function handleOkClick(isLoading) {
        if(isLoading) {
            toast.current.show({ severity: 'error', summary: 'Ошибка', detail: 'Поиск уже запущен' });
        } else {
            setStartS(true)
            fetch(true)
        }
    }

    return (
        <div className={classes.query_container}>
            <div className={classes.query_input}>
                <Toast ref={toast} />
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
                {/*<Button label='Поиск'*/}
                {/*        onClick={() => handleOkClick(isLoading)}*/}
                {/*        className={classes.query_button}*/}
                {/*/>*/}
            <Button
                // children={<span>&nbsp;Вход</span>}
                label='Поиск'
                icon={sites.length ? "pi pi-check" : 'pi'}
                loading={isLoading}
                className={classes.query_button}
                // severity="success"
                onClick={() => handleOkClick(isLoading)}
            />
        </div>
    )
        ;
};

export default MyInputContainer;